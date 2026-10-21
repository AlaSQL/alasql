/*
	The build of alasql with Bun (context/roadmap-phase-1.md, step 1).

	  bun build.js          # writes dist/

	The entry is src/index.js. It installs the modules converted to ES modules (none yet) and then
	the generated legacy module, src/generated/legacy.js, which holds every numbered file not yet
	converted, in the order of the file list in build.sh, with the UMD head and tail taken out.
	Converting a file means taking it off that list. build.sh stays as the fallback until the end
	of the phase; this script reads its file list so that both builds agree.

	Outputs, with the names they had:
	  dist/alasql.fs.js         CommonJS for Node: format cjs, target node, the externals kept as
	                            require() calls
	  dist/alasql.js            the browser file: the same module with the not-for-browser blocks
	                            commented out and the only-for-browser blocks revealed (an onLoad
	                            plugin does what the rexreplace passes of build.sh did), inside the
	                            UMD wrapper
	  dist/alasql.min.js        the same, minified by Bun before the wrapper is added
	  dist/alasql-worker.js     the worker, built the same way from the worker files
	  dist/precompile/index.js  src/precompile/index.js as CommonJS, the dist file left external
	  dist/alasql.d.ts, dist/alasql-echo.js, dist/alasql-prolog.js: copied

	What is added or undone around Bun's output, and why:
	- "use strict" at the top of the three library files. 10start.js has it and the concatenation
	  was strict as a whole; Bun drops the directive of a wrapped module.
	- The UMD wrapper for the browser files, by hand. Bun has no UMD format, and its iife of a
	  CommonJS module sets no global. The wrapper gives the body a module object and returns
	  module.exports.
	- __dirname. Bun inlines the directory of the source file. utils.findAlaSQLPath returns
	  __dirname under Node, which must stay the directory of the dist file at run time, so the
	  inlined line is removed from the Node build and __dirname is Node's own again. The browser
	  build declares its own __dirname (10start.js).
	- PACKAGE_VERSION and BUILD_VERSION are replaced in the text, as build.sh did.
	- The Bun version must be the one in .bun-version: the output depends on the bundler, and the
	  release is built on the maintainer's machine.
	- Bun inlines process.env.NODE_ENV; the source does not read it.
*/

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {execSync} from 'child_process';

const root = import.meta.dir;
const dist = path.join(root, 'dist');
const generatedDir = path.join(root, 'src', 'generated');

// Without these Bun bundles SheetJS into the Node build and fails on the Node and React Native
// modules. With them the require() calls stay in the output, lazy as before.
export const EXTERNALS = [
	'../modules/xlsx/xlsx',
	'fs',
	'path',
	'react-native',
	'react-native-fs',
	'react-native-fetch-blob',
	'cross-fetch',
];

const UMD_FIRST = '(function (root, factory) {';
const UMD_LAST = '}(this, function () {';
const TAIL = /\n\s*return alasql;\s*\n\}\)\);\s*$/;

function checkBunVersion() {
	const want = fs.readFileSync(path.join(root, '.bun-version'), 'utf8').trim();
	if (Bun.version !== want) {
		throw new Error(
			`This build needs Bun ${want} (.bun-version); this is Bun ${Bun.version}. ` +
				`Install it with: npm install -g bun@${want}`
		);
	}
}

function sh(cmd) {
	return execSync(cmd, {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
}

// The same build string as build.sh: branch with everything but [0-9a-z-] as a dot, then the
// short commit
export function buildString() {
	let branch = '';
	let commit = '';
	try {
		branch = sh('git rev-parse --abbrev-ref HEAD')
			.replace(/[^0-9a-z-]/gi, '.')
			.replace(/^[^0-9a-z]+|[^0-9a-z]+$/gi, '');
		commit = sh('git rev-parse --short HEAD');
	} catch (e) {
		// not a git checkout: no build string
	}
	return [branch, commit].filter(Boolean).join('-');
}

export function packageVersion() {
	return JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
}

// The files of dist/alasql.fs.js, from the cat list in build.sh
export function fileList() {
	const script = fs.readFileSync(path.join(root, 'build.sh'), 'utf8');
	const m = script.match(/\ncat \\\n([\s\S]*?)> \$outfile_fs/);
	if (!m) throw new Error('build.sh: the file list for alasql.fs.js was not found');
	return m[1]
		.split('\n')
		.map(l => l.replace(/\\\s*$/, '').trim())
		.filter(Boolean);
}

// The comment passes of build.sh, so that the legacy module is the body build.sh made
export function stripComments(text) {
	return text
		.replace(/\/\*\/\*[\S\s]+?\*\//gim, '')
		.replace(/^\/\/[ \t]{2,}.*/gim, '')
		.replace(/\/\/.*?console\.log\(.*/gim, '')
		.replace(/\n[\s]+\n/gim, '\n\n');
}

export function inject(text, version, build) {
	return text.split('PACKAGE_VERSION').join(version).split('BUILD_VERSION').join(build);
}

// Takes the UMD envelope out of a head file (10start.js, 99worker-start.js) and a tail file
// (98finish.js, 99worker-finish.js), and ends the module with module.exports
export function cutHead(text, file) {
	const a = text.indexOf(UMD_FIRST);
	const b = text.indexOf(UMD_LAST);
	if (a < 0 || b < a) throw new Error(file + ': the UMD head was not found');
	return text.slice(0, a) + text.slice(b + UMD_LAST.length);
}
export function cutTail(text, file) {
	if (!TAIL.test(text)) throw new Error(file + ': the UMD tail was not found');
	return text.replace(TAIL, '\n\nmodule.exports = alasql;\n');
}

// The legacy module: every file of the list but the copyright, concatenated as cat did
export function legacyModule(files, version, build) {
	let text = '';
	for (const f of files) {
		if (f.endsWith('05copyright.js')) continue;
		let part = fs.readFileSync(path.join(root, f), 'utf8');
		if (f.endsWith('10start.js') || f.endsWith('99worker-start.js')) part = cutHead(part, f);
		if (f.endsWith('98finish.js') || f.endsWith('99worker-finish.js')) part = cutTail(part, f);
		text += part;
	}
	return (
		'// Generated by build.js from the file list in build.sh. Not committed; do not edit.\n' +
		inject(stripComments(text), version, build)
	);
}

export function banner(version, build) {
	return inject(fs.readFileSync(path.join(root, 'src', '05copyright.js'), 'utf8'), version, build);
}

// What build.sh did to the browser copy with rexreplace
export function forBrowser(text) {
	return text
		.split('//*not-for-browser/*')
		.join('/*not-for-browser/*')
		.split('/*only-for-browser/*')
		.join('//*only-for-browser/*')
		.split('function locateNearestErrorRecoveryRule(state) {')
		.join('var locateNearestErrorRecoveryRule = function (state) {');
}

// A relative external is resolved by Bun before it is matched, and ../modules/xlsx/xlsx is
// relative to dist/, where the output runs; this keeps the specifier as it is
const relativeExternals = external => ({
	name: 'alasql-relative-externals',
	setup(build) {
		build.onResolve({filter: /^\.\.?\//}, args => {
			if (external.includes(args.path)) return {path: args.path, external: true};
			return undefined;
		});
	},
});

const browserPlugin = {
	name: 'alasql-browser-markers',
	setup(build) {
		build.onLoad({filter: /[\\/]src[\\/]generated[\\/][a-z]+\.js$/}, async args => ({
			contents: forBrowser(await Bun.file(args.path).text()),
			loader: 'js',
		}));
	},
};

export async function bundle(entry, {browser = false, minify = false, external = EXTERNALS} = {}) {
	const result = await Bun.build({
		entrypoints: [entry],
		format: 'cjs',
		target: browser ? 'browser' : 'node',
		external,
		minify,
		plugins: browser ? [relativeExternals(external), browserPlugin] : [relativeExternals(external)],
		throw: false,
	});
	if (!result.success) {
		for (const log of result.logs) console.error(log);
		throw new Error(`Bun.build failed for ${path.relative(root, entry)}`);
	}
	return result.outputs[0].text();
}

// Bun inlines __dirname with the source directory; the Node build wants Node's own
export function restoreDirname(code) {
	const matches = code.match(/^\s*var __dirname = "[^"\n]*";\n/gm) || [];
	if (matches.length !== 1)
		throw new Error(`expected one inlined __dirname in the Node build, found ${matches.length}`);
	return code.replace(matches[0], '');
}

export function umd(body, minified) {
	if (minified) {
		return (
			'(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory)}' +
			'else if(typeof exports==="object"){module.exports=factory()}else{root.alasql=factory()}})' +
			'(this,function(){var module={exports:{}},exports=module.exports;' +
			body +
			'\nreturn module.exports});\n'
		);
	}
	return (
		'(function (root, factory) {\n' +
		"\tif (typeof define === 'function' && define.amd) {\n" +
		'\t\tdefine([], factory);\n' +
		"\t} else if (typeof exports === 'object') {\n" +
		'\t\tmodule.exports = factory();\n' +
		'\t} else {\n' +
		'\t\troot.alasql = factory();\n' +
		'\t}\n' +
		'})(this, function () {\n' +
		'\tvar module = {exports: {}};\n' +
		'\tvar exports = module.exports;\n' +
		body +
		'\n\treturn module.exports;\n' +
		'});\n'
	);
}

function write(name, text) {
	const file = path.join(dist, name);
	fs.mkdirSync(path.dirname(file), {recursive: true});
	fs.writeFileSync(file, text);
	const sha = crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
	console.log(
		`  ${name.padEnd(24)} ${String(Buffer.byteLength(text)).padStart(9)} bytes  sha256 ${sha}`
	);
}

export async function build() {
	checkBunVersion();
	const version = packageVersion();
	const buildId = buildString();
	console.log(`alasql ${version} build ${buildId || '(no git)'} with Bun ${Bun.version}`);

	fs.rmSync(dist, {recursive: true, force: true});
	fs.mkdirSync(path.join(dist, 'precompile'), {recursive: true});
	fs.mkdirSync(generatedDir, {recursive: true});

	const head = banner(version, buildId) + '"use strict";\n';
	const files = fileList();
	const legacy = path.join(generatedDir, 'legacy.js');
	fs.writeFileSync(legacy, legacyModule(files, version, buildId));
	const entry = path.join(root, 'src', 'index.js');

	const node = restoreDirname(await bundle(entry));
	write('alasql.fs.js', head + node);
	write('alasql.js', head + umd(await bundle(entry, {browser: true}), false));
	write('alasql.min.js', head + umd(await bundle(entry, {browser: true, minify: true}), true));

	const worker = path.join(generatedDir, 'worker.js');
	fs.writeFileSync(
		worker,
		legacyModule(
			['src/99worker-start.js', 'src/99worker.js', 'src/99worker-finish.js'],
			version,
			buildId
		)
	);
	// The worker was never strict: 99worker-start.js has no directive and assigns an undeclared
	// isArray
	write(
		'alasql-worker.js',
		banner(version, buildId) + umd(await bundle(worker, {browser: true, minify: true}), true)
	);

	write(
		'precompile/index.js',
		await bundle(path.join(root, 'src', 'precompile', 'index.js'), {
			external: ['../../dist/alasql.fs.js'],
		})
	);

	for (const [from, to] of [
		['types/alasql.d.ts', 'alasql.d.ts'],
		['src/echo/alasql-echo.js', 'alasql-echo.js'],
		['src/prolog/alasql-prolog.js', 'alasql-prolog.js'],
	]) {
		write(to, fs.readFileSync(path.join(root, from), 'utf8'));
	}

	for (const f of fs.readdirSync(dist)) {
		const p = path.join(dist, f);
		if (fs.statSync(p).isFile() && fs.readFileSync(p, 'utf8').includes(root))
			throw new Error(`${f} contains the path of this checkout`);
	}
}

if (import.meta.main) {
	build().catch(e => {
		console.error(e && e.message ? e.message : e);
		process.exit(1);
	});
}
