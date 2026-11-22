/*
	Binding check (#2723): does bind.column() name the same source as today's lookup?

	Column.toJS decides the source of a column while it writes the code (lookupJS), and beside
	it asks bind.column() for the binding of the same reference. This preload, loaded by
	`bun test --preload` through run.js, sets Column.onBind on the builds the tests load and
	compares the two for every column reference a SELECT compiles.

	Today's answer is read from the code it wrote, for the context c it was given:
	  c['s']['a']                              the column a of source s
	  ('a' in Object(c['s']) ? c['s']['a'] : ...)  decided per row among the sources in the code
	  undefined                                no source can have it
	  an error "exists in two source tables"   ambiguous
	  c['a'], g['a'], c                        no source: the row is the context itself (a
	                                           SELECT without FROM, ORDER BY on the result) or
	                                           a group. There is nothing to compare, and the
	                                           reference is counted as "no source today".

	The same answer means the same source, or the same list of sources for a per-row decision.
	A per-row decision over one source and that source are the same answer.

	A difference is one of the six known cases (knownCase below, listed in README.md), or it
	is new. run.js fails on a new one, and on an error thrown by bind.column(), which
	Column.toJS hands over as {error}.

	Environment (set by run.js):
	  BIND_OUT   path of the recording, JSON lines: one line per kind of outcome with a count
	             is written by run.js from the lines here, one per reference.
*/

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const out = process.env.BIND_OUT;
if (!out) throw new Error('BIND_OUT is not set. Run through test/bind/run.js');
fs.mkdirSync(path.dirname(out), {recursive: true});
const fd = fs.openSync(out, 'w');

const builds = [path.join(root, 'dist', 'alasql.fs.js'), path.join(root, 'dist', 'alasql.js')];

// The SQL texts that are being run or compiled now, the innermost last
const running = [];
const seen = new Map();

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Today's answer, from the code
function today(js, err, context) {
	if (err) {
		return /exists in two source tables/.test(err.message)
			? {kind: 'ambiguous'}
			: {kind: 'error', text: err.message};
	}
	if (js === 'undefined') return {kind: 'none'};
	if (js === context) return {kind: 'no source', how: 'the row itself'};
	const c = escape(context);
	let m = js.match(new RegExp(`^${c}\\['((?:[^'\\\\]|\\\\.)*)'\\]\\['((?:[^'\\\\]|\\\\.)*)'\\]$`));
	if (m) return {kind: 'source', source: m[1]};
	if (/ in Object\(|\?\.\[/.test(js)) {
		const list = [];
		const re = new RegExp(`${c}\\['((?:[^'\\\\]|\\\\.)*)'\\]`, 'g');
		while ((m = re.exec(js))) if (!list.includes(m[1])) list.push(m[1]);
		return list.length === 1 ? {kind: 'source', source: list[0]} : {kind: 'any', any: list};
	}
	if (new RegExp(`^${c}\\['((?:[^'\\\\]|\\\\.)*)'\\]$`).test(js)) {
		return {
			kind: 'no source',
			how: context === 'g' ? 'a group' : 'a key of the context ' + context,
		};
	}
	return {kind: 'other', text: js};
}

function binding(ref) {
	if (ref.unresolved) return {kind: 'none'};
	if (ref.ambiguous) return {kind: 'ambiguous', ambiguous: ref.ambiguous, scope: ref.scope};
	if (ref.any) return {kind: 'any', any: ref.any, scope: ref.scope};
	return {kind: 'source', source: ref.source, scope: ref.scope};
}

function same(a, b) {
	if (a.kind !== b.kind) return false;
	// a source without a name (a FROM that is no table and has no alias) is 'undefined' in the code
	if (a.kind === 'source') return String(a.source) === String(b.source);
	if (a.kind === 'any') return a.any.join('\n') === b.any.join('\n');
	return true;
}

const show = x =>
	x.kind === 'source'
		? 'source ' + x.source
		: x.kind === 'any'
			? 'per row among ' + x.any.join(', ')
			: x.kind + (x.how ? ' (' + x.how + ')' : '') + (x.text ? ' ' + x.text : '');

// Which of the known cases a difference is, or undefined for a new one. The cases are the
// ones the pull request of the check lists, and README.md repeats them. The check sees the
// reference, the scope and the SQL text, so the alias of 1b and the function call of 2a are
// read from the text.
function knownCase(a, b, col, context, tableid, defcols, scope, sql) {
	if (col.tableid || a.kind !== 'source') return;
	const first = scope.sources[0];
	if (!first || String(a.source) !== String(first.alias)) return;
	const name = escape(col.columnid);
	const grouped = context.includes('groupSources');
	const text = String(sql || '');
	// 1. the only table does not define the name, and today's lookup takes the table anyway
	if (b.kind === 'none' && scope.sources.length === 1 && first.columns) {
		const alias = new RegExp(`\\bAS\\s+[\\[\`]?${name}[\\]\`]?(?!\\w)`, 'i').test(text);
		return alias && /\bHAVING\b/i.test(text) ? '1b' : '1a';
	}
	// 2. two tables define the name, and today's lookup takes the first of them
	if (b.kind === 'ambiguous' && String(b.ambiguous[0]) === String(a.source)) {
		if (grouped) return '2c';
		// the select list has a lookup of its own for a column that stands alone (bindBeside)
		if (context === 'p' && tableid === undefined && defcols === undefined) return '2b';
		if (new RegExp(`[A-Za-z_]\\w*\\s*\\(\\s*[\\[\`]?${name}[\\]\`]?\\s*\\)`).test(text))
			return '2a';
		return;
	}
	// 3. a grouped select list reads the name from the first table, which does not define it
	if (
		b.kind === 'source' &&
		!b.scope &&
		grouped &&
		first.columns &&
		!first.columns.some(c => c.columnid === col.columnid)
	) {
		return '3';
	}
}

const caseText = {
	'1a': 'a name the only table does not define',
	'1b': 'an alias of the select list inside an aggregate in HAVING (#2878)',
	'2a': 'a name two tables define, as the argument of a function',
	'2b': 'a name two tables define, alone in the select list',
	'2c': 'a name two tables define, in the select list of a GROUP BY query',
	3: 'a name only another source has, in the select list of a GROUP BY query',
};

function onBind(col, ref, js, err, context, tableid, defcols, scope) {
	// COUNT(*) and the like: the star is no column reference
	if (col.columnid === '*') return;
	const sql = running[running.length - 1];
	const a = today(js, err, context);
	const b = ref.error ? {kind: 'error', text: String(ref.error.stack || ref.error)} : binding(ref);
	let outcome;
	if (ref.error) outcome = 'bind.column threw';
	else if (a.kind === 'no source') outcome = 'no source today: ' + a.how;
	else if (same(a, b)) outcome = 'same';
	else {
		const known = knownCase(a, b, col, context, tableid, defcols, scope, sql);
		// One kind of difference: what each side says, without the names
		const kind = x =>
			x.kind === 'any' ? 'per row' : x.kind + (x.kind === 'source' && x.scope ? ', outer' : '');
		outcome =
			(known ? `known case ${known} (${caseText[known]})` : 'new difference') +
			`: today ${kind(a)}, binding ${kind(b)}` +
			(a.kind === 'source' && b.kind === 'source' ? ' (another source)' : '') +
			`; ${col.tableid ? 'source.column' : 'bare column'}; ${scope.sources.length} sources` +
			(scope.outer ? ', in a subquery' : '');
	}
	const n = seen.get(outcome) || 0;
	seen.set(outcome, n + 1);
	// every reference is counted; the first of a kind carries the example, and so does every difference
	const rec = {o: outcome};
	if (!n || /^(known|new|bind)/.test(outcome)) {
		rec.sql = sql;
		rec.column = col.toString();
		rec.today = show(a);
		rec.binding = show(b) + (b.scope ? ' (scope ' + b.scope + ')' : '');
		rec.context = context;
		rec.sources = scope.sources.map(
			s => s.alias + (s.columns ? '(' + s.columns.map(c => c.columnid) + ')' : '')
		);
		rec.f = typeof Bun !== 'undefined' && Bun.main ? path.basename(Bun.main) : '?';
	}
	fs.writeSync(fd, JSON.stringify(rec) + '\n');
}

function hook(alasql) {
	alasql.yy.Column.onBind = onBind;
	for (const name of ['dexec', 'compile']) {
		const fn = alasql[name];
		alasql[name] = function () {
			running.push(String(name === 'dexec' ? arguments[1] : arguments[0]));
			try {
				return fn.apply(this, arguments);
			} finally {
				running.pop();
			}
		};
	}
}

const hooked = new WeakSet();
function hookCurrent() {
	for (const file of builds) {
		const m = require.cache[file];
		const instance = m && m.exports;
		if (typeof instance === 'function' && !hooked.has(instance)) {
			hooked.add(instance);
			hook(instance);
		}
	}
}
require(builds[0]);
require(builds[1]);
hookCurrent();
require('bun:test').beforeEach(hookCurrent);
