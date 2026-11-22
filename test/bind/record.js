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

	4.x does not read the binding as it is in every place. bind.read() applies the 4.x rule of
	the place (a plain expression, a function argument, the select list, a grouped select
	list), and Column.toJS hands over that reading too. Today's answer is compared with it:
	  same                       the binding itself is what today's lookup reads
	  same by the 4.x rule ...   the binding differs, and the rule gives what today's lookup reads
	  new difference             neither. run.js fails on it, and on an error thrown by
	                             bind.column() or a rule, which comes as {error}.
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

function onBind(col, ref, js, err, context, tableid, defcols, scope, read) {
	// COUNT(*) and the like: the star is no column reference
	if (col.columnid === '*') return;
	const sql = running[running.length - 1];
	const a = today(js, err, context);
	const failed = ref.error || (read && read.error);
	const b = failed ? {kind: 'error', text: String(failed.stack || failed)} : binding(ref);
	// what 4.x reads: the binding, or what a 4.x rule of bind.js makes of it in this place
	const r = failed ? b : binding(read);
	let outcome;
	if (failed) outcome = 'bind.column or a 4.x rule threw';
	else if (a.kind === 'no source') outcome = 'no source today: ' + a.how;
	else if (same(a, r)) {
		outcome = read.rule ? `same by the 4.x rule ${read.rule} (place ${read.place})` : 'same';
	} else {
		// One kind of difference: what each side says, without the names
		const kind = x =>
			x.kind === 'any' ? 'per row' : x.kind + (x.kind === 'source' && x.scope ? ', outer' : '');
		outcome =
			`new difference: today ${kind(a)}, binding ${kind(b)}` +
			(read.rule ? `, 4.x rule ${read.rule} gives ${kind(r)}` : ', no 4.x rule applies') +
			`; place ${read.place || scope.place || 'row'}` +
			`; ${col.tableid ? 'source.column' : 'bare column'}; ${scope.sources.length} sources` +
			(scope.outer ? ', in a subquery' : '');
	}
	const n = seen.get(outcome) || 0;
	seen.set(outcome, n + 1);
	// every reference is counted; the first of a kind carries the example, and so does every difference
	const rec = {o: outcome};
	if (!n || /^(new|bind)/.test(outcome)) {
		rec.sql = sql;
		rec.column = col.toString();
		rec.today = show(a);
		rec.binding =
			show(b) +
			(b.scope ? ' (scope ' + b.scope + ')' : '') +
			(read && read.rule ? ', 4.x reads ' + show(r) : '');
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
