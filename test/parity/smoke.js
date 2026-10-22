/*
	Smokes for the paths the suite does not cover. Run with
	node, because the sandbox is node:vm:

	  node test/parity/smoke.js [--node=/path/to/node ...] [--pack] [--json]

	1 browser  dist/alasql.js in a vm sandbox without exports, module, define or require sets
	           the global alasql and runs a query. The Bun iife of the UMD file failed this.
	2 worker   dist/alasql-worker.js in the same sandbox with a Worker stub starts the worker
	           with the right script path.
	3 cli      node bin/alasql-cli.js "SELECT VALUE 42" prints 42.
	4 esm      import() of dist/alasql.fs.js gives the function as default export.
	5 min      dist/alasql.min.js loads under node (the exports branch) and runs a query.
	6 node     --node: dist/alasql.fs.js loads and runs on each given node binary (Node 16 is
	           the floor to check).
	7 pack     --pack: npm pack, install in a temporary folder, then require, import and the CLI
	           from there. Slow and needs the network.
*/

const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const {execFileSync} = require('child_process');
const {pathToFileURL} = require('url');

const root = path.join(__dirname, '..', '..');
const dist = f => path.join(root, 'dist', f);
const args = process.argv.slice(2);
const results = [];

function check(name, fn) {
	try {
		const detail = fn();
		results.push({name, ok: true, detail: String(detail || '')});
	} catch (e) {
		results.push({name, ok: false, detail: String(e && e.message ? e.message : e).split('\n')[0]});
	}
}

function sandbox() {
	const s = {
		console,
		setTimeout,
		clearTimeout,
		setInterval,
		clearInterval,
		Promise,
		Date,
		Math,
		JSON,
		RegExp,
		Error,
		TypeError,
		RangeError,
		Object,
		Array,
		String,
		Number,
		Boolean,
		Symbol,
		Map,
		Set,
		WeakMap,
		Proxy,
		Reflect,
		parseInt,
		parseFloat,
		isNaN,
		isFinite,
		encodeURIComponent,
		decodeURIComponent,
		Uint8Array,
		ArrayBuffer,
	};
	s.window = s;
	s.self = s;
	s.globalThis = s;
	return s;
}

function run(file, s) {
	vm.runInNewContext(fs.readFileSync(file, 'utf8'), s, {filename: file});
	return s;
}

const query = alasql => {
	const r = alasql('SELECT 1+1 AS v');
	if (JSON.stringify(r) !== '[{"v":2}]') throw new Error('query gave ' + JSON.stringify(r));
};

check('browser global', () => {
	const s = run(dist('alasql.js'), sandbox());
	if (typeof s.alasql !== 'function') throw new Error('window.alasql is ' + typeof s.alasql);
	query(s.alasql);
	return 'alasql ' + s.alasql.version;
});

check('worker file', () => {
	const s = sandbox();
	const made = [];
	s.document = {getElementsByTagName: () => [{src: 'http://x/js/alasql-worker.js'}]};
	s.Blob = class {
		constructor(parts) {
			this.text = parts.join('');
		}
	};
	s.URL = {createObjectURL: b => 'blob:' + b.text};
	s.Worker = class {
		constructor(url) {
			this.url = url;
			made.push(url);
		}
		postMessage() {}
	};
	run(dist('alasql-worker.js'), s);
	if (typeof s.alasql !== 'function') throw new Error('no alasql global');
	if (!made.length) throw new Error('no Worker started');
	if (!made[0].includes("importScripts('http://x/js/alasql.js')"))
		throw new Error('worker script does not import alasql.js: ' + made[0].slice(0, 80));
	return 'worker started with ' + made[0].match(/importScripts\('([^']*)'\)/)[1];
});

check('cli', () => {
	const out = execFileSync('node', [path.join(root, 'bin', 'alasql-cli.js'), 'SELECT VALUE 42'], {
		encoding: 'utf8',
	}).trim();
	if (out !== '42') throw new Error('printed ' + JSON.stringify(out));
	return 'prints 42';
});

check('min.js under node', () => {
	const a = require(dist('alasql.min.js'));
	query(a);
	return 'alasql ' + a.version;
});

for (const a of args.filter(x => x.startsWith('--node='))) {
	const bin = a.slice('--node='.length);
	check('node ' + bin, () => {
		const out = execFileSync(
			bin,
			[
				'-e',
				"const a=require(process.argv[1]);console.log(process.version+' '+JSON.stringify(a('SELECT 1+1 AS v')))",
				dist('alasql.fs.js'),
			],
			{
				encoding: 'utf8',
				env: Object.assign({}, process.env, {NODE_PATH: path.join(root, 'node_modules')}),
			}
		).trim();
		if (!out.endsWith('[{"v":2}]')) throw new Error(out);
		return out;
	});
}

async function checkAsync(name, fn) {
	try {
		const detail = await fn();
		results.push({name, ok: true, detail: String(detail || '')});
	} catch (e) {
		results.push({name, ok: false, detail: String(e && e.message ? e.message : e).split('\n')[0]});
	}
}

async function main() {
	await checkAsync('esm import', async () => {
		const m = await import(pathToFileURL(dist('alasql.fs.js')).href);
		if (typeof m.default !== 'function') throw new Error('default export is ' + typeof m.default);
		query(m.default);
		return 'default export is the function';
	});

	if (args.includes('--pack')) {
		const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'alasql-parity-'));
		check('npm pack + install', () => {
			const packed = execFileSync(
				'npm',
				['pack', '--pack-destination', tmp, '--loglevel=error', '--json'],
				{cwd: root, encoding: 'utf8'}
			);
			const tgz = JSON.parse(packed.slice(packed.indexOf('[')))[0].filename;
			fs.writeFileSync(path.join(tmp, 'package.json'), '{"name":"parity-user","private":true}');
			execFileSync(
				'npm',
				['install', '--no-audit', '--no-fund', '--loglevel=error', path.join(tmp, tgz)],
				{cwd: tmp, encoding: 'utf8'}
			);
			const cjs = execFileSync(
				'node',
				['-e', "console.log(JSON.stringify(require('alasql')('SELECT 1+1 AS v')))"],
				{cwd: tmp, encoding: 'utf8'}
			).trim();
			if (cjs !== '[{"v":2}]') throw new Error('require gave ' + cjs);
			const esm = execFileSync(
				'node',
				[
					'--input-type=module',
					'-e',
					"import alasql from 'alasql'; console.log(JSON.stringify(alasql('SELECT 1+1 AS v')))",
				],
				{cwd: tmp, encoding: 'utf8'}
			).trim();
			if (esm !== '[{"v":2}]') throw new Error('import gave ' + esm);
			const cli = execFileSync(
				path.join(tmp, 'node_modules', '.bin', 'alasql'),
				['SELECT VALUE 42'],
				{
					cwd: tmp,
					encoding: 'utf8',
				}
			).trim();
			if (cli !== '42') throw new Error('cli printed ' + cli);
			const size = fs.statSync(path.join(tmp, tgz)).size;
			return `${tgz} ${size.toLocaleString('en-US')} bytes; require, import and cli ok`;
		});
		fs.rmSync(tmp, {recursive: true, force: true});
	}

	const failed = results.filter(r => !r.ok).length;
	if (args.includes('--json')) console.log(JSON.stringify(results, null, 1));
	else
		for (const r of results)
			console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name.padEnd(28)} ${r.detail}`);
	process.exit(failed ? 1 : 0);
}

main();
