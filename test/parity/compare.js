/*
	Compares two parity recordings (record.js) and the api and size files run.js stores beside
	them. Used by run.js compare; can run alone:

	  bun test/parity/compare.js recordings/a recordings/b [--limit 20] [--file test123.js]

	A statement whose result differed between the two runs run.js makes of one build (its
	<label>.unstable.json) compares code only and is counted as unstable; the engine itself is
	not deterministic there (a mixed-type ORDER BY, for example).

	Records are grouped by test file and compared in order within the file: a statement depends
	on the ones before it, and the order of test files does not matter. Within a file the two
	streams are aligned by (kind, SQL); when they drift, the next matching pair within 200
	records is the resync point and the records between are reported as only in a or only in b.

	What is compared for an aligned pair: parameters, result or error, and the sequence of
	generated code. A statement whose SQL uses a volatile function (NOW, RANDOM, NEWID, ...) or
	whose parameters hold a Date compares code only; its result is counted as "volatile". Generated
	code with the same lines in another order (REQUIRE of several files) is counted as "reordered".
	Normalisation before comparing: the build string, ISO and SQL timestamps, epoch
	milliseconds, UUIDs and absolute paths become placeholders.

	A test file that ran tests and recorded no statement fails the compare, unless it is listed in
	silent-files.txt with the reason (a file that only parses, or runs the CLI in a child process).
	In the first calibration 379 of 532 files recorded nothing in both runs, and the compare passed.

	Exit code 1 when any difference remains.
*/

const fs = require('fs');
const path = require('path');

const WINDOW = 200;
const VOLATILE_SQL =
	/\b(NOW|GETDATE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME|CURDATE|CURTIME|SYSDATE|SYSDATETIME|SYSTIMESTAMP|TODAY|RANDOM|RAND|NEWID|UUID|GEN_RANDOM_UUID|UUIDV4|GETUTCDATE)\b/i;

const root = path.join(__dirname, '..', '..');
const rootRe = new RegExp(root.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

function normalize(s) {
	if (typeof s !== 'string') return s;
	return s
		.replace(/"[a-z0-9][a-z0-9.-]*-[0-9a-f]{7,10}"/g, '"<BUILD>"')
		.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})/g, '<ISO>')
		.replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?/g, '<DATETIME>')
		.replace(/(?<!\d)(?:1[5-9]|2[0-4])\d{11}(?!\d)/g, '<EPOCH>')
		.replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, '<UUID>')
		.replace(rootRe, '<ROOT>')
		.replace(/\/(?:private\/)?(?:tmp|var\/folders)\/[^\s"'",)]*/g, '<TMP>');
}

function load(base) {
	const lines = fs
		.readFileSync(base + '.jsonl', 'utf8')
		.split('\n')
		.filter(Boolean);
	let meta = {};
	const byFile = new Map();
	const tests = new Map();
	for (const line of lines) {
		const r = JSON.parse(line);
		if (r.k === 'meta') {
			meta = r;
			continue;
		}
		if (r.k === 'test') {
			tests.set(r.f, (tests.get(r.f) || 0) + 1);
			continue;
		}
		if (!byFile.has(r.f)) byFile.set(r.f, []);
		byFile.get(r.f).push(r);
	}
	const codes = {};
	if (fs.existsSync(base + '.codes.jsonl')) {
		for (const line of fs.readFileSync(base + '.codes.jsonl', 'utf8').split('\n')) {
			if (!line) continue;
			const c = JSON.parse(line);
			codes[c.h] = c.a;
		}
	}
	const api = fs.existsSync(base + '.api.json')
		? JSON.parse(fs.readFileSync(base + '.api.json', 'utf8'))
		: null;
	const sizes = fs.existsSync(base + '.sizes.json')
		? JSON.parse(fs.readFileSync(base + '.sizes.json', 'utf8'))
		: null;
	// Statements whose result differed between two runs of this same build (run.js records
	// twice): their results are not compared, only their code
	let unstable = [];
	if (fs.existsSync(base + '.unstable.json')) {
		unstable = JSON.parse(fs.readFileSync(base + '.unstable.json', 'utf8'));
	}
	const ids = new Set(unstable.map(u => u.i));
	const known = knownUnstable();
	for (const list of byFile.values())
		for (const r of list) if (ids.has(r.i) || known.has((r.sql || '').trim())) r.u = true;
	return {meta, byFile, tests, codes, api, sizes, unstable};
}

// Statements known to give one of several results run by run (unstable-statements.txt): two
// runs catch a statement that flips in 1 of 10 runs only in about one run in five, so the
// ones seen are written down
function knownUnstable() {
	const file = path.join(__dirname, 'unstable-statements.txt');
	const known = new Set();
	if (!fs.existsSync(file)) return known;
	for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
		const t = line.trim();
		if (t && !t.startsWith('#')) known.add(t);
	}
	return known;
}

// The statements whose result or error differs between two recordings of the same build:
// what run.js writes to <label>.unstable.json. Also says whether the two runs ran the same
// statements at all.
function unstable(A, B) {
	const {counts, diffs} = compareRecordings(A, B);
	const list = diffs
		.filter(d => d.what === 'result' || d.what === 'error')
		.map(d => ({i: d.ia, f: d.file, sql: d.sql}));
	return {list, onlyA: counts.onlyA, onlyB: counts.onlyB, diverged: counts.diverged};
}

// Files allowed to run tests without a statement reaching the recorder, with the reason
function silentAllowed() {
	const file = path.join(__dirname, 'silent-files.txt');
	const allowed = new Set();
	if (!fs.existsSync(file)) return allowed;
	for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
		const name = line.split('#')[0].trim();
		if (name) allowed.add(name);
	}
	return allowed;
}

// The files of a recording that ran at least one test and recorded nothing: either the hook
// was missing (the failure this guards against) or the file is listed in silent-files.txt
function silent(R) {
	const allowed = silentAllowed();
	const out = {files: 0, tests: 0, unexpected: [], listed: [], stale: []};
	for (const [file, n] of R.tests) {
		out.files++;
		out.tests += n;
		const recorded = R.byFile.has(file);
		if (!recorded) (allowed.has(file) ? out.listed : out.unexpected).push(file);
		else if (allowed.has(file)) out.stale.push(file);
	}
	out.unexpected.sort();
	out.listed.sort();
	out.stale.sort();
	return out;
}

// Prints the silent check of one recording and returns the number of failures
function reportSilent(R, label) {
	const s = silent(R);
	if (!s.files) {
		console.log(
			`  ${label}: no test records (recorded with an older record.js); silent files not checked`
		);
		return 0;
	}
	console.log(
		`  ${label}: ${s.files} files ran ${s.tests} tests, ${s.files - s.listed.length - s.unexpected.length} recorded statements, ${s.listed.length} listed as silent`
	);
	if (s.unexpected.length)
		console.log(
			`  ${label}: ${s.unexpected.length} files ran tests and recorded no statement: ${s.unexpected.join(', ')}`
		);
	if (s.stale.length)
		console.log(
			`  ${label}: listed in silent-files.txt but recorded statements: ${s.stale.join(', ')}`
		);
	return s.unexpected.length;
}

const key = r => r.k + '|' + normalize(r.sql || '');
const volatile = r =>
	VOLATILE_SQL.test(r.sql || '') || (typeof r.p === 'string' && r.p.includes('Date('));

// First index where two strings differ, for the message
function firstDiff(a, b) {
	let i = 0;
	while (i < a.length && i < b.length && a[i] === b[i]) i++;
	return i;
}

function excerpt(s, at) {
	const from = Math.max(0, at - 80);
	return (from ? '…' : '') + s.slice(from, at + 160) + (at + 160 < s.length ? '…' : '');
}

const sortedLines = s =>
	normalize(s)
		.split(/[;\n]+/)
		.map(x => x.trim())
		.filter(Boolean)
		.sort()
		.join('\n');

function comparePair(a, b, A, B, diffs, counts) {
	const na = normalize(a.p || '');
	const nb = normalize(b.p || '');
	if (na !== nb) {
		counts.params++;
		diffs.push({file: a.f, sql: a.sql, what: 'params', a: na, b: nb});
	}
	const ea = normalize(a.e);
	const eb = normalize(b.e);
	const ra = normalize(a.r);
	const rb = normalize(b.r);
	if (volatile(a)) {
		counts.volatile++;
	} else if (a.u || b.u) {
		counts.unstable++;
	} else if (ea !== eb) {
		counts.error++;
		diffs.push({
			file: a.f,
			sql: a.sql,
			what: 'error',
			a: ea || '(no error)',
			b: eb || '(no error)',
			ia: a.i,
			ib: b.i,
		});
	} else if (ra !== rb) {
		counts.result++;
		diffs.push({file: a.f, sql: a.sql, what: 'result', a: ra, b: rb, ia: a.i, ib: b.i});
	}
	const ca = a.c || [];
	const cb = b.c || [];
	if (ca.join() !== cb.join()) {
		let i = 0;
		while (i < ca.length && i < cb.length && ca[i] === cb[i]) i++;
		const sa = ca[i] ? (A.codes[ca[i]] || []).join('\n') : '(no code)';
		const sb = cb[i] ? (B.codes[cb[i]] || []).join('\n') : '(no code)';
		// The same lines in another order: REQUIRE of several files concatenates them in the
		// order the reads finish (src/88require.js). The functions are the same; noise, not a difference.
		if (ca.length === cb.length && sortedLines(sa) === sortedLines(sb)) {
			counts.reordered++;
			return;
		}
		counts.code++;
		diffs.push({
			file: a.f,
			sql: a.sql,
			what: `code (function ${i + 1} of ${ca.length} vs ${cb.length})`,
			a: sa,
			b: sb,
		});
	}
}

function compareFile(file, ra, rb, A, B, diffs, counts) {
	let i = 0;
	let j = 0;
	while (i < ra.length && j < rb.length) {
		if (key(ra[i]) === key(rb[j])) {
			counts.aligned++;
			comparePair(ra[i], rb[j], A, B, diffs, counts);
			i++;
			j++;
			continue;
		}
		let found = null;
		for (let d = 1; d <= WINDOW && !found; d++) {
			if (j + d < rb.length && key(ra[i]) === key(rb[j + d])) found = {di: 0, dj: d};
			else if (i + d < ra.length && key(ra[i + d]) === key(rb[j])) found = {di: d, dj: 0};
		}
		if (!found) {
			counts.diverged++;
			diffs.push({
				file,
				sql: ra[i].sql,
				what: 'diverged (no common statement within ' + WINDOW + ' records)',
				a: key(ra[i]),
				b: key(rb[j]),
			});
			return;
		}
		for (let d = 0; d < found.di; d++, i++) {
			counts.onlyA++;
			diffs.push({file, sql: ra[i].sql, what: 'only in a', a: key(ra[i]), b: ''});
		}
		for (let d = 0; d < found.dj; d++, j++) {
			counts.onlyB++;
			diffs.push({file, sql: rb[j].sql, what: 'only in b', a: '', b: key(rb[j])});
		}
	}
	for (; i < ra.length; i++) {
		counts.onlyA++;
		diffs.push({file, sql: ra[i].sql, what: 'only in a', a: key(ra[i]), b: ''});
	}
	for (; j < rb.length; j++) {
		counts.onlyB++;
		diffs.push({file, sql: rb[j].sql, what: 'only in b', a: '', b: key(rb[j])});
	}
}

function compareRecordings(A, B, onlyFile) {
	const counts = {
		files: 0,
		aligned: 0,
		params: 0,
		result: 0,
		error: 0,
		code: 0,
		volatile: 0,
		unstable: 0,
		reordered: 0,
		onlyA: 0,
		onlyB: 0,
		diverged: 0,
		filesOnlyA: [],
		filesOnlyB: [],
	};
	const diffs = [];
	const files = new Set([...A.byFile.keys(), ...B.byFile.keys()]);
	for (const file of Array.from(files).sort()) {
		if (onlyFile && file !== onlyFile) continue;
		const ra = A.byFile.get(file);
		const rb = B.byFile.get(file);
		if (!ra) {
			counts.filesOnlyB.push(file);
			continue;
		}
		if (!rb) {
			counts.filesOnlyA.push(file);
			continue;
		}
		counts.files++;
		compareFile(file, ra, rb, A, B, diffs, counts);
	}
	return {counts, diffs};
}

function fmtBytes(n) {
	return n.toLocaleString('en-US');
}

function report(A, B, labelA, labelB, opts) {
	const {counts, diffs} = compareRecordings(A, B, opts.file);
	let failures = 0;
	console.log(
		`parity: ${labelA} (${A.meta.version} ${A.meta.build}) vs ${labelB} (${B.meta.version} ${B.meta.build})`
	);
	console.log(
		`  files compared: ${counts.files}; statements aligned: ${counts.aligned}; volatile (code only): ${counts.volatile}; unstable in one build (code only): ${counts.unstable}; code reordered: ${counts.reordered}`
	);
	const bad =
		counts.params +
		counts.result +
		counts.error +
		counts.code +
		counts.onlyA +
		counts.onlyB +
		counts.diverged;
	console.log(
		`  differences: result ${counts.result}, error ${counts.error}, params ${counts.params}, code ${counts.code}, only in a ${counts.onlyA}, only in b ${counts.onlyB}, diverged ${counts.diverged}`
	);
	if (counts.filesOnlyA.length) console.log('  files only in a: ' + counts.filesOnlyA.join(', '));
	if (counts.filesOnlyB.length) console.log('  files only in b: ' + counts.filesOnlyB.join(', '));
	failures += bad + counts.filesOnlyA.length + counts.filesOnlyB.length;
	failures += reportSilent(A, 'a') + reportSilent(B, 'b');
	const limit = opts.limit;
	for (const d of diffs.slice(0, limit)) {
		console.log(
			`\n  ${d.file}: ${d.what}\n    sql: ${(d.sql || '(generated code outside a statement)').slice(0, 200)}`
		);
		const at = firstDiff(d.a, d.b);
		console.log(`    a: ${excerpt(d.a, at)}`);
		console.log(`    b: ${excerpt(d.b, at)}`);
	}
	if (diffs.length > limit) console.log(`\n  … ${diffs.length - limit} more; use --limit`);

	if (A.api && B.api) {
		const r = require('./api.js').compare(A.api, B.api);
		console.log(
			`\napi: ${r.total} paths; only in a: ${r.onlyA.length}; only in b: ${r.onlyB.length}; changed: ${r.changed.length}`
		);
		for (const k of r.onlyA.slice(0, limit)) console.log('  only in a: ' + k);
		for (const k of r.onlyB.slice(0, limit)) console.log('  only in b: ' + k);
		for (const [k, va, vb] of r.changed.slice(0, limit))
			console.log(`  changed: ${k}: ${va} -> ${vb}`);
		failures += r.onlyA.length + r.onlyB.length + r.changed.length;
	}

	if (A.sizes && B.sizes) {
		console.log('\nsizes (bytes, gzip):');
		for (const name of Object.keys(A.sizes)) {
			const a = A.sizes[name];
			const b = B.sizes[name] || {bytes: 0, gzip: 0};
			const pct = a.bytes ? (((b.bytes - a.bytes) / a.bytes) * 100).toFixed(2) : 'n/a';
			console.log(
				`  ${name.padEnd(22)} ${fmtBytes(a.bytes).padStart(9)} ${fmtBytes(a.gzip).padStart(9)}  ->  ${fmtBytes(b.bytes).padStart(9)} ${fmtBytes(b.gzip).padStart(9)}  (${pct}%)`
			);
		}
	}
	return failures;
}

module.exports = {load, compareRecordings, report, normalize, silent, reportSilent, unstable};

if (require.main === module) {
	const args = process.argv.slice(2);
	const opt = (name, def) => {
		const i = args.indexOf(name);
		return i >= 0 ? args[i + 1] : def;
	};
	const bases = args.filter(
		(a, i) => !a.startsWith('--') && (i === 0 || !args[i - 1].startsWith('--'))
	);
	if (bases.length !== 2) {
		console.error('usage: compare.js <recording-a> <recording-b> [--limit N] [--file test123.js]');
		process.exit(2);
	}
	const A = load(bases[0]);
	const B = load(bases[1]);
	const failures = report(A, B, path.basename(bases[0]), path.basename(bases[1]), {
		limit: +opt('--limit', 20),
		file: opt('--file'),
	});
	process.exit(failures ? 1 : 0);
}
