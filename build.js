/*
	The build of alasql (context/roadmap-phase-1.md): esbuild bundles src/index.js.

	  bun build.js          # writes dist/

	The entry is src/index.js, an ES module that creates the alasql object and installs every
	module. The generated parser is a module of its own, src/generated/parser.js: a function that
	makes the parser for one alasql object, because the grammar actions read alasql.options,
	alasql.fn and alasql.aggr and call the utility doubleq; the jison output stays what it is. The
	worker bundle is a concatenation still (src/generated/worker.js): src/worker/start.js, a call
	of the launcher module, src/worker/finish.js, because its head assigns undeclared names and
	was never strict. build.sh, the old concatenation, stays in the tree until the end of the
	phase; it no longer builds, and the parity check builds old commits with their own build.

	Outputs, with the names they had:
	  dist/alasql.fs.js         CommonJS for Node: format cjs, platform node, the externals kept as
	                            require() calls
	  dist/alasql.js            the browser file: the same module with the not-for-browser blocks
	                            commented out and the only-for-browser blocks revealed (an onLoad
	                            plugin does what the rexreplace passes of build.sh did), inside the
	                            UMD wrapper
	  dist/alasql.min.js        the same, minified by esbuild before the wrapper is added
	  dist/alasql-worker.js     the worker, built the same way from the worker files
	  dist/precompile/index.js  src/precompile/index.js as CommonJS, the dist file left external
	  dist/alasql.d.ts, dist/alasql-echo.js, dist/alasql-prolog.js: copied

	What is added around esbuild's output, and why:
	- "use strict" at the top of the three library files. 10start.js has it and the concatenation
	  was strict as a whole.
	- module.exports = module.exports.default at the end of the library files: esbuild's cjs
	  output of an ES module exports {default: alasql}, and require('alasql') must give the function.
	- The UMD wrapper for the browser files, by hand. esbuild has no UMD format. The wrapper gives
	  the body a module object and returns module.exports.
	- keepNames for the unminified files. When esbuild bundles, a name declared in a nested scope
	  that shadows one of an enclosing scope gets a suffix (the class Table assigned to yy.Table
	  beside var Table, the function extend inside var extend), which would change the .name of
	  four functions and classes; keepNames keeps them. The minified file had mangled names before.
	- __dirname is defined as '' in the browser build, which is what the only-for-browser shim in
	  10start.js gives the code that shares its scope.
	- PACKAGE_VERSION and BUILD_VERSION are replaced in the text of every source file, as build.sh
	  did on the concatenation.
	- esbuild is pinned in yarn.lock, so the output does not depend on a tool outside the lockfile.
	  Bun runs this script and the tests; it does not bundle.
*/

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {execSync} from 'child_process';
import {fileURLToPath} from 'url';
import esbuild from 'esbuild';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const generatedDir = path.join(root, 'src', 'generated');

// Without these esbuild bundles SheetJS into the Node build and fails on the Node and React
// Native modules. With them the require() calls stay in the output, lazy as before.
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

// The comment passes of build.sh, kept for the worker concatenation
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

// Takes the UMD envelope out of the head file (10start.js, src/worker/start.js) and the tail
// file (98finish.js, src/worker/finish.js), wherever they are in the list
export function hasHead(text) {
	return text.includes(UMD_FIRST) && text.includes(UMD_LAST);
}
export function cutHead(text, file) {
	const a = text.indexOf(UMD_FIRST);
	const b = text.indexOf(UMD_LAST);
	if (a < 0 || b < a) throw new Error(file + ': the UMD head was not found');
	return text.slice(0, a) + text.slice(b + UMD_LAST.length);
}
export function cutTail(text, file) {
	if (!TAIL.test(text)) throw new Error(file + ': the UMD tail was not found');
	return text.replace(TAIL, '\n');
}

// The worker files concatenated as cat did, with the UMD head and tail taken out and the
// comment passes applied
export function concatBody(files) {
	let text = '';
	for (const f of files) {
		let part = fs.readFileSync(path.join(root, f), 'utf8');
		if (hasHead(part)) part = cutHead(part, f);
		if (TAIL.test(part)) part = cutTail(part, f);
		text += part;
	}
	return {text: stripComments(text)};
}

// The utilities the grammar actions call by bare name (doubleq). The parser is made before the
// utilities exist, so each gets a forwarder that looks it up on alasql.utils when it is called.
export const PARSER_UTILS = {doubleq: 's'};

// The generated parser as a module: a function that makes the parser for one alasql object,
// because the grammar actions read alasql.options, alasql.fn and alasql.aggr by that name. The
// jison output stays what it is; this wraps it.
export function parserModule() {
	return (
		'// Generated by build.js from src/alasqlparser.js. Not committed; do not edit.\n' +
		'export default function makeParser(alasql) {\n' +
		Object.entries(PARSER_UTILS)
			.map(([u, p]) => `function ${u}(${p}) {\n\treturn alasql.utils.${u}(${p});\n}\n`)
			.join('') +
		fs.readFileSync(path.join(root, 'src', 'alasqlparser.js'), 'utf8') +
		'\nreturn alasqlparser;\n}\n'
	);
}

// The worker module stays CommonJS: its head and tail files around the launcher module, which
// the main bundle installs too
export function workerModule(version, build) {
	return (
		'// Generated by build.js. Not committed; do not edit.\n' +
		inject(concatBody(['src/worker/start.js']).text, version, build) +
		"\nrequire('../worker/launcher.js').default(alasql);\n" +
		inject(concatBody(['src/worker/finish.js']).text, version, build) +
		'\nmodule.exports = alasql;\n'
	);
}

export function banner(version, build) {
	return inject(fs.readFileSync(path.join(root, 'src', 'copyright.js'), 'utf8'), version, build);
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

// Every source file gets the version and the build string; the browser build also gets the
// marker passes
const sourcePlugin = (browser, version, build) => ({
	name: 'alasql-source',
	setup(bundler) {
		bundler.onLoad({filter: /[\\/]src[\\/].*\.js$/}, args => {
			let text = inject(fs.readFileSync(args.path, 'utf8'), version, build);
			if (browser) text = forBrowser(text);
			return {contents: text, loader: 'js'};
		});
	},
});

export async function bundle(
	entry,
	{browser = false, minify = false, external = EXTERNALS, version = '', build = ''} = {}
) {
	const result = await esbuild.build({
		entryPoints: [entry],
		bundle: true,
		write: false,
		format: 'cjs',
		platform: browser ? 'browser' : 'node',
		external,
		minify,
		keepNames: !minify,
		legalComments: 'inline',
		define: browser ? {__dirname: '""'} : undefined,
		plugins: [sourcePlugin(browser, version, build)],
		logLevel: 'silent',
	});
	if (result.errors.length) throw new Error(result.errors.map(e => e.text).join('\n'));
	// the output starts with its own "use strict" when the entry is an ES module; the head adds it
	return result.outputFiles[0].text.replace(/^"use strict";\n/, '');
}

// esbuild's cjs output of an ES module exports {default: alasql}; the package exports the function
export function defaultExport(code) {
	return code + '\nmodule.exports = module.exports.default;\n';
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
	const version = packageVersion();
	const buildId = buildString();
	console.log(`alasql ${version} build ${buildId || '(no git)'} with esbuild ${esbuild.version}`);

	fs.rmSync(dist, {recursive: true, force: true});
	fs.mkdirSync(path.join(dist, 'precompile'), {recursive: true});
	fs.mkdirSync(generatedDir, {recursive: true});

	const head = banner(version, buildId) + '"use strict";\n';
	const opts = {version, build: buildId};
	fs.writeFileSync(path.join(generatedDir, 'parser.js'), parserModule());
	const entry = path.join(root, 'src', 'index.js');

	write('alasql.fs.js', head + defaultExport(await bundle(entry, opts)));
	write(
		'alasql.js',
		head + umd(defaultExport(await bundle(entry, {...opts, browser: true})), false)
	);
	write(
		'alasql.min.js',
		head + umd(defaultExport(await bundle(entry, {...opts, browser: true, minify: true})), true)
	);

	// The worker was never strict: src/worker/start.js has no directive and assigns an undeclared
	// isArray
	const worker = path.join(generatedDir, 'worker.js');
	fs.writeFileSync(worker, workerModule(version, buildId));
	write(
		'alasql-worker.js',
		banner(version, buildId) +
			umd(await bundle(worker, {...opts, browser: true, minify: true}), true)
	);

	write(
		'precompile/index.js',
		await bundle(path.join(root, 'src', 'precompile', 'index.js'), {
			...opts,
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

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	build().catch(e => {
		console.error(e && e.message ? e.message : e);
		process.exit(1);
	});
}
