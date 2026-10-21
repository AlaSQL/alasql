/*
	Which names does each legacy file reach by bare name, and where are they declared?
	(context/roadmap-phase-1.md, "Wrap with a codemod, not by hand".)

	  bun tools/free-variables.js [--json] [file ...]

	The files of src/legacy.list share one function scope in the build, so the tool concatenates
	them the way build.js does, wraps the text in a function, and lets eslint-scope resolve every
	reference. For each file it prints: the names it declares at that scope, the names it uses
	that another file declares (grouped by that file), and the names that resolve to nothing
	(globals of the environment, such as console or document). Given file names, only those are
	printed. This is the list the wrap of a converted file needs: its imports, its bindings from
	the alasql object, and what it must export.
*/

import fs from 'fs';
import path from 'path';
import * as espree from 'espree';
import * as eslintScope from 'eslint-scope';
import {legacyFiles, legacyBody} from '../build.js';

const root = path.join(import.meta.dir, '..');
const args = process.argv.slice(2);
const json = args.includes('--json');
const only = args.filter(a => !a.startsWith('--'));

// The concatenation with the start offset of every file
const files = legacyFiles();
const parts = [];
let text = '';
for (const f of files) {
	const start = text.length;
	text += legacyBody([f]);
	parts.push({file: f, start, end: text.length});
}
const wrapped = '(function () {\n' + text + '\n})();\n';
const shift = '(function () {\n'.length;

const ast = espree.parse(wrapped, {
	ecmaVersion: 'latest',
	sourceType: 'script',
	range: true,
	loc: true,
});
const manager = eslintScope.analyze(ast, {ecmaVersion: 2022, sourceType: 'script'});
const global = manager.globalScope;
const fn = global.childScopes[0]; // the wrapper function's scope

const fileAt = offset => {
	const o = offset - shift;
	const p = parts.find(x => o >= x.start && o < x.end);
	return p ? p.file : '?';
};

const report = {};
for (const f of files) report[f] = {declares: [], uses: {}, globals: {}};

for (const v of fn.variables) {
	if (v.name === 'arguments' || !v.defs.length) continue;
	const home = fileAt(v.defs[0].name.range[0]);
	if (report[home]) report[home].declares.push(v.name);
	for (const r of v.references) {
		const user = fileAt(r.identifier.range[0]);
		if (user === home || !report[user]) continue;
		const u = report[user].uses;
		if (!u[home]) u[home] = new Set();
		u[home].add(v.name);
	}
}
for (const r of fn.through) {
	const user = fileAt(r.identifier.range[0]);
	if (!report[user]) continue;
	const g = report[user].globals;
	g[r.identifier.name] = (g[r.identifier.name] || 0) + 1;
}

const short = f => path.basename(f);
const out = {};
for (const f of files) {
	if (only.length && !only.some(o => f.endsWith(o))) continue;
	const r = report[f];
	out[short(f)] = {
		declares: r.declares.sort(),
		uses: Object.fromEntries(
			Object.entries(r.uses)
				.sort()
				.map(([k, v]) => [short(k), Array.from(v).sort()])
		),
		globals: Object.keys(r.globals).sort(),
	};
}

if (json) {
	console.log(JSON.stringify(out, null, 1));
} else {
	for (const [f, r] of Object.entries(out)) {
		console.log(`\n${f}`);
		console.log(`  declares: ${r.declares.join(', ') || '-'}`);
		for (const [from, names] of Object.entries(r.uses))
			console.log(`  uses from ${from}: ${names.join(', ')}`);
		console.log(`  globals: ${r.globals.join(', ') || '-'}`);
	}
}
