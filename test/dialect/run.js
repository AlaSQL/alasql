/*
	Dialect test: run every case in alasql and in SQLite and compare the answers (#2593).

	Usage:
	  bun test/dialect/run.js                        # check ./dist/alasql.fs.js
	  bun test/dialect/run.js path/to/alasql.fs.js   # check another build (e.g. a PR worktree)
	  bun test/dialect/run.js --update               # rewrite expected-differences from today's answers
	  bun test/dialect/run.js --list                 # also print every expected difference

	Cases come from cases.sql (one statement per line) and from the generators in matrices/.
	Both engines first load fixtures.sql. SQLite is bun:sqlite, so this needs Bun.

	A case passes when alasql gives SQLite's answer, or when it is listed in expected-differences
	with exactly the answer alasql gives today. It fails when a new difference appears, when a
	listed difference changes its alasql answer, or when a listed line now matches SQLite
	(remove it from the file, or run --update). Exit code 1 on any failure.
	An entry with "alasql: unstable" is not checked: alasql's answer for it varies between runs.

	Not picked up by `bun test` (the test glob is test/test[0-9]* and test/test-*).
*/

const fs = require('fs');
const path = require('path');
const {Database} = require('bun:sqlite');

const args = process.argv.slice(2);
const update = args.includes('--update');
const list = args.includes('--list');
const distPath =
	args.find(a => !a.startsWith('--')) || path.join(__dirname, '../../dist/alasql.fs.js');
const alasql = require(path.resolve(distPath));
const diffFile = path.join(__dirname, 'expected-differences');

// ---- cases ----

// A line in cases.sql is one statement. "-- sqlite: <sql>" after it gives SQLite's spelling,
// for functions SQLite names differently (GREATEST is max() there).
function readCases() {
	const cases = [];
	for (const line of fs.readFileSync(path.join(__dirname, 'cases.sql'), 'utf8').split('\n')) {
		const t = line.trim();
		if (!t || t.startsWith('--')) continue;
		const [sql, sqlite] = t.split(/\s+-- sqlite:\s+/);
		cases.push({area: 'cases', sql: sql.trim(), sqlite: sqlite && sqlite.trim()});
	}
	const dir = path.join(__dirname, 'matrices');
	for (const f of fs.readdirSync(dir).sort()) {
		if (!f.endsWith('.js')) continue;
		const area = f.replace(/\.js$/, '');
		for (const c of require(path.join(dir, f))()) cases.push({area, ...c});
	}
	const seen = new Set();
	for (const c of cases) {
		const k = key(c);
		if (seen.has(k)) throw new Error('Duplicate case: ' + k);
		seen.add(k);
	}
	return cases;
}

const key = c => c.sql + (c.params ? '  params: ' + JSON.stringify(c.params) : '');

// Split a SQL file into statements on ';' outside quotes
function statements(text) {
	return text
		.split('\n')
		.filter(l => !l.trim().startsWith('--'))
		.join('\n')
		.split(/;\s*$/m)
		.map(s => s.trim())
		.filter(Boolean);
}

// Rows keep their order only when the statement itself has ORDER BY (outside parentheses)
function ordered(sql) {
	let depth = 0;
	let quote = null;
	for (let i = 0; i < sql.length; i++) {
		const ch = sql[i];
		if (quote) {
			if (ch === quote) quote = null;
		} else if (ch === "'" || ch === '"') quote = ch;
		else if (ch === '(') depth++;
		else if (ch === ')') depth--;
		else if (depth === 0 && /^ORDER\s+BY\b/i.test(sql.slice(i, i + 9))) return true;
	}
	return false;
}

// ---- running ----

const db = new Database(':memory:');
const fixtures = statements(fs.readFileSync(path.join(__dirname, 'fixtures.sql'), 'utf8'));
alasql('CREATE DATABASE dialect; USE dialect');
for (const s of fixtures) {
	db.run(s);
	alasql(s);
}

function runAlasql(c) {
	try {
		const res = alasql(c.sql, c.params || []);
		const rows = Array.isArray(res) ? res : [res];
		return rows.map(r =>
			r && typeof r === 'object' && !Array.isArray(r) ? Object.values(r) : [r]
		);
	} catch (e) {
		return {error: String(e.message).split('\n')[0]};
	}
}

function runSqlite(c) {
	try {
		return db.query(c.sqlite || c.sql).values(...(c.params || []));
	} catch (e) {
		return {error: String(e.message).split('\n')[0]};
	}
}

// ---- comparing ----

// Text for one value as recorded in expected-differences. Keeps what JSON would lose.
function show(v) {
	if (v === undefined) return 'undefined';
	if (typeof v === 'number' && !Number.isFinite(v)) return String(v);
	if (v instanceof Date) return 'Date(' + (isNaN(v) ? 'invalid' : v.toISOString()) + ')';
	if (typeof v === 'bigint') return v + 'n';
	if (v && typeof v === 'object' && !Array.isArray(v)) return JSON.stringify(v);
	if (Array.isArray(v)) return '[' + v.map(show).join(', ') + ']';
	return JSON.stringify(v);
}
function showResult(r, isOrdered) {
	if (!Array.isArray(r)) return 'error: ' + r.error.slice(0, 120);
	const rows = r.map(show);
	if (!isOrdered) rows.sort();
	return '[' + rows.join(', ') + ']';
}

// The same answer: null and undefined match, true matches 1, numbers within rounding
function sameValue(a, b) {
	if (a === undefined) a = null;
	if (b === undefined) b = null;
	if (typeof a === 'boolean') a = +a;
	if (typeof b === 'boolean') b = +b;
	if (typeof a === 'number' && typeof b === 'number')
		return a === b || Math.abs(a - b) <= 1e-12 * Math.max(Math.abs(a), Math.abs(b));
	return show(a) === show(b);
}
function sameResult(x, y, isOrdered) {
	if (!Array.isArray(x) || !Array.isArray(y)) return !Array.isArray(x) && !Array.isArray(y);
	if (x.length !== y.length) return false;
	if (!isOrdered) {
		// match rows as a multiset
		const rest = y.slice();
		return x.every(row => {
			const i = rest.findIndex(other => sameRow(row, other));
			return i >= 0 && rest.splice(i, 1);
		});
	}
	return x.every((row, i) => sameRow(row, y[i]));
}
const sameRow = (a, b) => a.length === b.length && a.every((v, i) => sameValue(v, b[i]));

// ---- expected-differences ----

// Blocks separated by blank lines: the case, then "alasql:", "sqlite:" and "why:" lines
function readDiffs() {
	const map = new Map();
	if (!fs.existsSync(diffFile)) return map;
	for (const block of fs.readFileSync(diffFile, 'utf8').split(/\n\s*\n/)) {
		const lines = block.split('\n').filter(l => l.trim() && !l.startsWith('#'));
		if (!lines.length) continue;
		const e = {key: lines[0]};
		for (const l of lines.slice(1)) {
			const m = l.match(/^\s+(alasql|sqlite|why):\s?(.*)$/);
			if (m) e[m[1]] = m[2];
		}
		map.set(e.key, e);
	}
	return map;
}

function writeDiffs(entries, sqliteVersion) {
	const head = [
		'# Expected differences between alasql and SQLite in the dialect test (#2593).',
		'# Each entry: the case, the answer alasql gives today, SQLite ' +
			sqliteVersion +
			"'s answer, and why they differ.",
		'# The test fails when alasql gives another answer for a listed case. After an intended change,',
		'# run `bun test/dialect/run.js --update`: it rewrites the answers and keeps every "why".',
		'# Rows of a statement without ORDER BY are shown sorted.',
	];
	const body = entries.map(
		e => `${e.key}\n  alasql: ${e.alasql}\n  sqlite: ${e.sqlite}\n  why: ${e.why}`
	);
	fs.writeFileSync(diffFile, head.join('\n') + '\n\n' + body.join('\n\n') + '\n');
}

// ---- main ----

const sqliteVersion = db.query('SELECT sqlite_version()').values()[0][0];
const cases = readCases();
const expected = readDiffs();
const differences = [];
const failures = [];
const byArea = {};

for (const c of cases) {
	const k = key(c);
	const isOrdered = ordered(c.sql);
	const a = runAlasql(c);
	const s = runSqlite(c);
	const area = (byArea[c.area] ||= {cases: 0, same: 0, listed: 0});
	area.cases++;
	const exp = expected.get(k);
	expected.delete(k);
	// alasql's answer varies between runs (its comparator is not a consistent order): not checked
	if (exp && exp.alasql === 'unstable') {
		area.listed++;
		differences.push({key: k, alasql: 'unstable', sqlite: showResult(s, isOrdered), why: exp.why});
		continue;
	}
	if (sameResult(a, s, isOrdered)) {
		area.same++;
		if (exp)
			failures.push({
				k,
				what: "now gives SQLite's answer; remove it from expected-differences",
				a,
				s,
				isOrdered,
			});
		continue;
	}
	const entry = {key: k, alasql: showResult(a, isOrdered), sqlite: showResult(s, isOrdered)};
	entry.why = (exp && exp.why) || 'Not reviewed yet.';
	differences.push(entry);
	if (!exp) failures.push({k, what: 'new difference from SQLite', ...entry});
	else {
		area.listed++;
		if (exp.alasql !== entry.alasql)
			failures.push({k, what: 'alasql answer changed (was ' + exp.alasql + ')', ...entry});
		else if (exp.sqlite !== entry.sqlite && !update)
			console.log(
				`note: SQLite ${sqliteVersion} answers differently than recorded: ${k}\n  now: ${entry.sqlite}\n  recorded: ${exp.sqlite}`
			);
	}
}
for (const k of expected.keys())
	failures.push({k, what: 'listed in expected-differences but no longer a case'});

console.log(`dialect test | alasql ${alasql.version} | SQLite ${sqliteVersion} | ${distPath}`);
for (const [area, n] of Object.entries(byArea))
	console.log(
		`  ${area.padEnd(16)} ${String(n.cases).padStart(5)} cases ${String(n.same).padStart(5)} as SQLite ${String(n.cases - n.same).padStart(5)} differ`
	);
if (list)
	for (const d of differences)
		console.log(`\n${d.key}\n  alasql: ${d.alasql}\n  sqlite: ${d.sqlite}\n  why: ${d.why}`);

if (update) {
	writeDiffs(differences, sqliteVersion);
	console.log(`expected-differences rewritten: ${differences.length} entries`);
	process.exit(0);
}
for (const f of failures) {
	console.log(`\nFAIL ${f.what}\n  ${f.k}`);
	if (f.alasql) console.log(`  alasql: ${f.alasql}\n  sqlite: ${f.sqlite}`);
}
console.log(failures.length ? `\n${failures.length} failing` : '\nall cases as expected');
process.exit(failures.length ? 1 : 0);
