/*
	Parity check (context/roadmap-phase-1.md, step 0): is the behaviour of a build the same as
	the published 4.21.0, or as the build before this change?

	  bun test/parity/run.js record <label>                # record a suite run of ./dist
	  bun test/parity/run.js record <label> --ref          # the published reference build
	  bun test/parity/run.js record <label> --dist <dir>   # another build's dist folder
	  bun test/parity/run.js compare <label-a> <label-b>   # compare two recordings

	A recording is one run of the whole suite plus the dialect cases, with every statement in
	order (record.js), the API surface (api.js) and the size of every dist file. It is written to
	test/parity/recordings/<label>.* and not committed.

	--ref downloads alasql@4.21.0 from npm once (into test/parity/.ref/), puts its dist in place
	of ./dist, records, and then rebuilds ./dist with build.sh. --dist does the same with the given
	folder. Add --no-rebuild to leave the other dist in place.

	Smokes for the browser, worker, CLI, ESM and tarball paths are in smoke.js (run with node).
*/

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const {spawnSync} = require('child_process');

const REF_VERSION = '4.21.0';
const root = path.join(__dirname, '..', '..');
const recordings = path.join(__dirname, 'recordings');
const refDir = path.join(__dirname, '.ref');

const args = process.argv.slice(2);
const cmd = args[0];
const flag = name => args.includes(name);
const opt = name => {
	const i = args.indexOf(name);
	return i >= 0 ? args[i + 1] : undefined;
};

function sh(cmdName, cmdArgs, env, input) {
	const r = spawnSync(cmdName, cmdArgs, {
		cwd: root,
		stdio: [input || 'ignore', 'inherit', 'inherit'],
		env: Object.assign({}, process.env, env || {}),
	});
	if (r.error) throw r.error;
	return r.status;
}

function testFiles() {
	return fs
		.readdirSync(path.join(root, 'test'))
		.filter(f => /^test[0-9].*\.js$/.test(f) || /^test-.*\.js$/.test(f))
		.sort()
		.map(f => './test/' + f);
}

function fetchRef() {
	const dist = path.join(refDir, 'package', 'dist');
	if (fs.existsSync(dist)) return dist;
	console.log(`fetching alasql@${REF_VERSION} from npm into ${path.relative(root, refDir)}`);
	fs.mkdirSync(refDir, {recursive: true});
	if (
		sh('npm', ['pack', `alasql@${REF_VERSION}`, '--pack-destination', refDir, '--loglevel=error'])
	)
		throw new Error('npm pack failed');
	if (sh('tar', ['xzf', path.join(refDir, `alasql-${REF_VERSION}.tgz`), '-C', refDir]))
		throw new Error('tar failed');
	return dist;
}

function swapDist(from) {
	const dist = path.join(root, 'dist');
	fs.rmSync(dist, {recursive: true, force: true});
	fs.cpSync(from, dist, {recursive: true});
	console.log(`dist/ is now a copy of ${path.relative(root, from) || from}`);
}

function rebuild() {
	console.log('rebuilding dist/ with build.sh');
	if (sh('sh', ['build.sh'], {}, 'ignore')) throw new Error('build.sh failed');
}

function sizes() {
	const dist = path.join(root, 'dist');
	const out = {};
	for (const f of fs.readdirSync(dist).sort()) {
		if (!f.endsWith('.js')) continue;
		const buf = fs.readFileSync(path.join(dist, f));
		out[f] = {bytes: buf.length, gzip: zlib.gzipSync(buf, {level: 9}).length};
	}
	const p = path.join(dist, 'precompile', 'index.js');
	if (fs.existsSync(p)) {
		const buf = fs.readFileSync(p);
		out['precompile/index.js'] = {bytes: buf.length, gzip: zlib.gzipSync(buf, {level: 9}).length};
	}
	return out;
}

function record(label) {
	if (!label || label.startsWith('--')) throw new Error('record needs a label');
	fs.mkdirSync(recordings, {recursive: true});
	const base = path.join(recordings, label);
	const out = base + '.jsonl';
	for (const ext of ['.jsonl', '.codes.jsonl', '.api.json', '.sizes.json'])
		fs.rmSync(base + ext, {force: true});

	let swapped = false;
	const other = flag('--ref') ? fetchRef() : opt('--dist');
	try {
		if (other) {
			swapDist(path.resolve(root, other));
			swapped = true;
		}
		const started = Date.now();
		const status = sh(
			'bun',
			[
				'test',
				'--dots',
				'--preload',
				'./test/bun-setup.js',
				'--preload',
				'./test/parity/record.js',
			].concat(testFiles()),
			{PARITY_OUT: out}
		);
		console.log(`suite exit code ${status} (a failing test is recorded, not fatal)`);
		if (
			sh('bun', ['test/parity/dialect-corpus.js'], {
				PARITY_OUT: out,
				PARITY_APPEND: '1',
				PARITY_TAG: 'dialect',
			})
		)
			throw new Error('dialect corpus failed');
		const api = spawnSync('bun', ['test/parity/api.js', 'snapshot'], {cwd: root, encoding: 'utf8'});
		if (api.status) throw new Error('api snapshot failed: ' + api.stderr);
		fs.writeFileSync(base + '.api.json', api.stdout);
		fs.writeFileSync(base + '.sizes.json', JSON.stringify(sizes(), null, 1));
		const n = fs.readFileSync(out, 'utf8').split('\n').filter(Boolean).length - 1;
		console.log(
			`recorded ${n} records, ${Object.keys(JSON.parse(api.stdout)).length} api paths in ${((Date.now() - started) / 1000).toFixed(1)} s -> ${path.relative(root, base)}.*`
		);
	} finally {
		if (swapped && !flag('--no-rebuild')) rebuild();
	}
}

function compare(a, b) {
	if (!a || !b) throw new Error('compare needs two labels');
	const c = require('./compare.js');
	const A = c.load(path.join(recordings, a));
	const B = c.load(path.join(recordings, b));
	const failures = c.report(A, B, a, b, {limit: +(opt('--limit') || 20), file: opt('--file')});
	process.exit(failures ? 1 : 0);
}

if (cmd === 'record') record(args[1]);
else if (cmd === 'compare') compare(args[1], args[2]);
else {
	console.error(
		'usage: run.js record <label> [--ref | --dist <dir>] [--no-rebuild] | compare <a> <b> [--limit N] [--file f]'
	);
	process.exit(2);
}
