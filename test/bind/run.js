/*
	Binding check (#2723): does bind.column() name the same source as today's lookup?

	  bun test/bind/run.js            # run the suite on ./dist and print the outcomes
	  bun test/bind/run.js --json     # the same as JSON

	record.js does the comparing and says how. This file runs the suite with it and counts the
	outcomes. Every kind of outcome is printed once, with the first reference that gave it.

	Where 4.x reads something else than the binding, a 4.x rule in src/engine/bind.js says
	what, and the check compares with the rule applied (README.md). The exit code is 1 when
	bind.column() or a rule threw, when today's lookup and that reading differ, when no
	reference was compared, or when the suite run crashed.

	The recording is written to test/bind/recordings/ and not committed.
*/

const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.join(__dirname, '..', '..');
const recording = path.join(__dirname, 'recordings', 'bindings.jsonl');

const files = fs
	.readdirSync(path.join(root, 'test'))
	.filter(f => /^test[0-9].*\.js$/.test(f) || /^test-.*\.js$/.test(f))
	.sort()
	.map(f => './test/' + f);

const r = spawnSync(
	'bun',
	[
		'test',
		'--dots',
		'--preload',
		'./test/bun-setup.js',
		'--preload',
		'./test/bind/record.js',
	].concat(files),
	{
		cwd: root,
		encoding: 'utf8',
		maxBuffer: 1 << 28,
		env: Object.assign({}, process.env, {BIND_OUT: recording}),
	}
);
if (r.error) throw r.error;
// bun test ends with 0, or with 1 when a test failed. Anything else is a crash of the run.
if (r.status !== 0 && r.status !== 1) throw new Error(`the suite run crashed (${r.status})`);
const summary = (r.stderr + r.stdout).match(/\n\s*\d+ pass[\s\S]*$/);

const outcomes = new Map();
let total = 0;
for (const line of fs.readFileSync(recording, 'utf8').split('\n')) {
	if (!line) continue;
	const rec = JSON.parse(line);
	total++;
	const o = outcomes.get(rec.o) || {outcome: rec.o, count: 0};
	o.count++;
	if (rec.sql !== undefined || rec.column) Object.assign(o, rec, {o: undefined});
	outcomes.set(rec.o, o);
}
const rank = o =>
	o.outcome === 'same'
		? 0
		: o.outcome.startsWith('same')
			? 1
			: o.outcome.startsWith('no source')
				? 2
				: 3;
const list = Array.from(outcomes.values()).sort((a, b) => rank(a) - rank(b) || b.count - a.count);

if (process.argv.includes('--json')) {
	console.log(JSON.stringify(list, null, 1));
} else {
	console.log(
		`suite: ${summary ? summary[0].trim().split('\n').slice(0, 3).join(', ') : '?'} (exit code ${r.status})`
	);
	console.log(`column references compared: ${total}`);
	for (const o of list) {
		console.log(`\n${String(o.count).padStart(6)}  ${o.outcome}`);
		if (o.outcome === 'same') continue;
		console.log(`        ${o.f}: ${o.column}   today: ${o.today}   binding: ${o.binding}`);
		console.log(`        sources: ${o.sources.join(' | ') || '(none)'}   context: ${o.context}`);
		console.log(`        ${String(o.sql).replace(/\s+/g, ' ').slice(0, 300)}`);
	}
}

const failing = list.filter(o => rank(o) === 3);
const failed = failing.reduce((n, o) => n + o.count, 0);
if (!total) {
	console.error('\nFAIL: no column reference was compared. Is Column.onBind still called?');
	process.exit(1);
}
if (failed) {
	console.error(
		`\nFAIL: ${failed} reference(s) where bind.column or a 4.x rule threw, or where today's lookup reads something else:`
	);
	for (const o of failing) console.error(`  ${o.count}  ${o.outcome}  (${o.f}: ${o.column})`);
	process.exit(1);
}
console.error(
	"\nOK: nothing threw, and today's lookup reads the binding or what a 4.x rule makes of it."
);
