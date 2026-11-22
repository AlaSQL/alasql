/*
	Run-state check (#2596): which code writes to a compiled query while a statement runs?

	  bun test/runstate/run.js             # run the suite on ./dist and print the list
	  bun test/runstate/run.js --json      # the list as JSON
	  bun test/runstate/run.js --compile   # also the writes a compile makes to a finished query

	record.js does the recording and says what it sees and what it does not. This file runs the
	suite with it and turns the places in dist/alasql.fs.js into places in src/: esbuild writes a
	"// src/<file>" line before each module, and the line is looked up in that file by its text.

	The recording is written to test/runstate/recordings/ and not committed.
*/

const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.join(__dirname, '..', '..');
const recording = path.join(__dirname, 'recordings', 'writes.jsonl');
const flag = name => process.argv.includes(name);

function testFiles() {
	return fs
		.readdirSync(path.join(root, 'test'))
		.filter(f => /^test[0-9].*\.js$/.test(f) || /^test-.*\.js$/.test(f))
		.sort()
		.map(f => './test/' + f);
}

function record() {
	const r = spawnSync(
		'bun',
		[
			'test',
			'--dots',
			'--preload',
			'./test/bun-setup.js',
			'--preload',
			'./test/runstate/record.js',
		].concat(testFiles()),
		{
			cwd: root,
			encoding: 'utf8',
			maxBuffer: 1 << 28,
			env: Object.assign({}, process.env, {RUNSTATE_OUT: recording}),
		}
	);
	if (r.error) throw r.error;
	// bun test ends with 0, or with 1 when a test failed. Anything else is a crash of the run.
	if (r.status !== 0 && r.status !== 1) throw new Error(`the suite run crashed (${r.status})`);
	const summary = (r.stderr + r.stdout).match(/\n\s*\d+ pass[\s\S]*$/);
	return {status: r.status, summary: summary ? summary[0].trim().split('\n').slice(0, 3) : []};
}

// The same text for a line of the bundle and its line in the source: esbuild changes the quotes,
// writes void 0 for undefined and adds a number to a name that is used twice in the bundle
const squeeze = s =>
	s
		.replace(/\/\* @__PURE__ \*\/|\s+/g, '')
		.replace(/'/g, '"')
		.replace(/\bundefined\b/g, 'void0')
		.replace(/([A-Za-z_$])\d+\b/g, '$1')
		.replace(/[(),;]/g, '');

// dist line -> {file, line, text}. Of several source lines with the same text the one nearest
// to the same relative place in the module is taken: esbuild keeps the order of a module.
function resolver() {
	const dist = fs.readFileSync(path.join(root, 'dist', 'alasql.fs.js'), 'utf8').split('\n');
	const isHead = l => /^\s*\/\/ (src\/\S+\.js)$/.exec(l);
	const sources = new Map();
	return function (n) {
		const text = (dist[n - 1] || '').trim();
		let file, start;
		for (start = n - 1; start >= 0 && !file; start--) {
			const c = isHead(dist[start]);
			if (c) file = c[1];
		}
		// the head of the bundle: the frame of a function made with new Function
		if (!file || n < 10) return null;
		let end = n;
		while (end < dist.length && !isHead(dist[end])) end++;
		if (!sources.has(file)) {
			const p = path.join(root, file);
			const lines = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').split('\n') : [];
			// without the comment at the end of a line, which the bundle does not keep there
			sources.set(
				file,
				lines.map(l => squeeze(l.replace(/\s\/\/ .*$/, '').replace(/^\s*\/\/.*$/, '')))
			);
		}
		const lines = sources.get(file);
		const want = squeeze(text);
		const hits = [];
		// the statement can be spread over lines in the source: join up to four of them
		for (let i = 0; i < lines.length; i++) {
			if (!lines[i]) continue;
			let joined = '';
			for (let j = i; j < Math.min(i + 4, lines.length); j++) {
				joined += lines[j];
				if (joined === want && !hits.includes(i + 1)) hits.push(i + 1);
			}
		}
		const guess = ((n - start) / (end - start)) * lines.length;
		hits.sort((x, y) => Math.abs(x - guess) - Math.abs(y - guess));
		return {file, line: hits[0], same: hits.slice(1).sort((x, y) => x - y), text};
	};
}

function report() {
	const resolve = resolver();
	const rows = fs
		.readFileSync(recording, 'utf8')
		.split('\n')
		.filter(Boolean)
		.map(l => JSON.parse(l));
	// the place in the Node build as a line number; the browser build is the same source, so
	// its writes are listed only when the Node build did not make them
	const distLine = r => {
		const m = r.at.match(/alasql\.fs\.js:(\d+):/);
		return m ? +m[1] : 0;
	};
	const places = new Map();
	for (const n of Array.from(new Set(rows.map(distLine))).sort((a, b) => a - b))
		places.set(n, n ? resolve(n) : null);
	const list = new Map();
	for (const r of rows) {
		const browser = /alasql\.js:/.test(r.at);
		const generated = r.at.startsWith('generated code');
		const n = distLine(r);
		const src = places.get(n);
		let place;
		if (src) {
			place = src.file + ':' + (src.line || '? (dist/alasql.fs.js:' + n + ')');
			if (src.same.length) place += ' (or ' + src.same.join(', ') + ')';
		} else if (browser) place = 'browser build';
		else place = 'generated code';
		if (generated && src) place = 'generated code, called from ' + place;
		const key = [r.phase, r.kind, r.prop, place].join('|');
		if (list.has(key)) continue;
		list.set(key, {
			phase: r.phase,
			on: r.kind,
			property: r.prop,
			place,
			text: src && !generated ? src.text : undefined,
			test: r.f,
		});
	}
	let all = Array.from(list.values());
	const seenInNode = new Set(
		all.filter(x => x.place !== 'browser build').map(x => x.phase + x.on + x.property)
	);
	all = all.filter(
		x => x.place !== 'browser build' || !seenInNode.has(x.phase + x.on + x.property)
	);
	all.sort(
		(a, b) =>
			a.phase.localeCompare(b.phase) ||
			a.on.localeCompare(b.on) ||
			a.property.localeCompare(b.property) ||
			a.place.localeCompare(b.place, undefined, {numeric: true})
	);
	return all;
}

const run = record();
const all = report();
const runs = all.filter(x => x.phase === 'run');
if (flag('--json')) {
	console.log(JSON.stringify(flag('--compile') ? all : runs, null, 1));
} else {
	console.log(`suite: ${run.summary.join(', ')} (exit code ${run.status})`);
	for (const on of ['query', 'source']) {
		const part = runs.filter(x => x.on === on);
		const props = new Set(part.map(x => x.property));
		console.log(
			`\nwrites to the ${on} object during a run: ${props.size} properties, ${part.length} places`
		);
		for (const x of part)
			console.log(
				`  ${x.property.padEnd(16)} ${x.place.padEnd(34)} ${x.test}${x.text ? '  | ' + x.text.slice(0, 90) : ''}`
			);
	}
	if (flag('--compile')) {
		const part = all.filter(x => x.phase === 'compile');
		console.log(`\nwrites to a finished query during a later compile: ${part.length} places`);
		for (const x of part)
			console.log(`  ${x.on}.${x.property.padEnd(16)} ${x.place.padEnd(34)} ${x.test}`);
	}
}
