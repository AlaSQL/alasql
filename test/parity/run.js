/*
	Parity check (context/roadmap-phase-1.md, step 0): is the behaviour of a build the same as
	the reference build, or as the build before this change?

	  bun test/parity/run.js record <label>                   # record a suite run of ./dist
	  bun test/parity/run.js record <label> --ref             # the published 4.21.0
	  bun test/parity/run.js record <label> --ref 4.20.1      # another published version
	  bun test/parity/run.js record <label> --ref develop     # a commit, built with its build.sh
	  bun test/parity/run.js record <label> --dist <dir>      # another build's dist folder
	  bun test/parity/run.js record ref --ref --if-missing    # only when ref is not recorded yet
	  bun test/parity/run.js compare <label-a> <label-b>      # compare two recordings

	A recording is one run of the whole suite plus the dialect cases, with every statement in
	order (record.js), the API surface (api.js) and the size of every dist file. It is written to
	test/parity/recordings/<label>.* and not committed. The suite is run a second time and the
	statements whose result differs between the two runs are written to <label>.unstable.json;
	compare.js compares only their code. --once skips the second run.

	The reference is the published 4.21.0 tarball until a merge of develop brings a behaviour fix
	into the branch; from then on it is develop at the commit last merged forward, built with
	build.sh (roadmap-phase-1.md, step 0). --ref <version> downloads that version from npm once;
	--ref <commit> (a sha, a branch or a tag) extracts the commit with git archive and runs its own
	build.sh once; both are kept under test/parity/.ref/. The reference dist is put in place of
	./dist for the recording, and ./dist is rebuilt afterwards with the project's build-only
	script. --dist does the same with the given folder. Add --no-rebuild to leave the other dist
	in place.

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
	return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : undefined;
};

function sh(cmdName, cmdArgs, options) {
	options = options || {};
	const r = spawnSync(cmdName, cmdArgs, {
		cwd: options.cwd || root,
		stdio: ['ignore', 'inherit', 'inherit'],
		env: Object.assign({}, process.env, options.env || {}),
	});
	if (r.error) throw r.error;
	return r.status;
}

function out(cmdName, cmdArgs, cwd) {
	const r = spawnSync(cmdName, cmdArgs, {cwd: cwd || root, encoding: 'utf8'});
	if (r.status) throw new Error(`${cmdName} ${cmdArgs.join(' ')} failed: ${r.stderr}`);
	return r.stdout.trim();
}

function testFiles() {
	return fs
		.readdirSync(path.join(root, 'test'))
		.filter(f => /^test[0-9].*\.js$/.test(f) || /^test-.*\.js$/.test(f))
		.sort()
		.map(f => './test/' + f);
}

// The dist of a published version, downloaded once
function fetchVersion(version) {
	const dir = path.join(refDir, version);
	const dist = path.join(dir, 'package', 'dist');
	if (fs.existsSync(dist)) return dist;
	console.log(`fetching alasql@${version} from npm into ${path.relative(root, dir)}`);
	fs.rmSync(dir, {recursive: true, force: true});
	fs.mkdirSync(dir, {recursive: true});
	if (sh('npm', ['pack', `alasql@${version}`, '--pack-destination', dir, '--loglevel=error']))
		throw new Error('npm pack failed');
	if (sh('tar', ['xzf', path.join(dir, `alasql-${version}.tgz`), '-C', dir]))
		throw new Error('tar failed');
	return dist;
}

// The dist of a commit, built once with the build.sh of that commit. The tree is extracted
// with git archive (no checkout changes), node_modules is linked from the repository.
function buildCommit(spec) {
	const sha = out('git', ['rev-parse', '--verify', spec + '^{commit}']);
	const dir = path.join(refDir, sha.slice(0, 12));
	const dist = path.join(dir, 'dist');
	if (fs.existsSync(path.join(dist, 'alasql.fs.js'))) return dist;
	console.log(
		`building ${spec} (${sha.slice(0, 12)}) with its build.sh into ${path.relative(root, dir)}`
	);
	fs.rmSync(dir, {recursive: true, force: true});
	fs.mkdirSync(dir, {recursive: true});
	const archive = spawnSync('git', ['archive', sha], {cwd: root, maxBuffer: 1 << 30});
	if (archive.status) throw new Error('git archive failed: ' + archive.stderr);
	const tar = spawnSync('tar', ['x', '-C', dir], {input: archive.stdout});
	if (tar.status) throw new Error('tar failed: ' + tar.stderr);
	fs.symlinkSync(path.join(root, 'node_modules'), path.join(dir, 'node_modules'));
	if (sh('sh', ['build.sh'], {cwd: dir})) throw new Error('build.sh of ' + spec + ' failed');
	fs.writeFileSync(path.join(dir, 'PARITY_REF'), `${spec} ${sha}\n`);
	return dist;
}

function reference(spec) {
	return /^\d+\.\d+\.\d+(-.+)?$/.test(spec) ? fetchVersion(spec) : buildCommit(spec);
}

function swapDist(from) {
	const dist = path.join(root, 'dist');
	fs.rmSync(dist, {recursive: true, force: true});
	fs.cpSync(from, dist, {recursive: true});
	console.log(`dist/ is now a copy of ${path.relative(root, from) || from}`);
}

// The project's own build script (package.json build-only), so that a new build script is
// used as soon as it exists
function rebuild() {
	console.log('rebuilding dist/ with the build-only script');
	if (sh('bun', ['run', 'build-only'])) throw new Error('build-only failed');
}

function sizes() {
	const dist = path.join(root, 'dist');
	const result = {};
	for (const f of fs.readdirSync(dist).sort()) {
		if (!f.endsWith('.js')) continue;
		const buf = fs.readFileSync(path.join(dist, f));
		result[f] = {bytes: buf.length, gzip: zlib.gzipSync(buf, {level: 9}).length};
	}
	const p = path.join(dist, 'precompile', 'index.js');
	if (fs.existsSync(p)) {
		const buf = fs.readFileSync(p);
		result['precompile/index.js'] = {
			bytes: buf.length,
			gzip: zlib.gzipSync(buf, {level: 9}).length,
		};
	}
	return result;
}

function record(label) {
	if (!label || label.startsWith('--')) throw new Error('record needs a label');
	fs.mkdirSync(recordings, {recursive: true});
	const base = path.join(recordings, label);
	const file = base + '.jsonl';
	// --if-missing: a reference is recorded once and reused (roadmap-phase-1.md, "How much to
	// verify, and when"); the recording's meta line says which build it holds
	if (flag('--if-missing') && fs.existsSync(file)) {
		const meta = JSON.parse(fs.readFileSync(file, 'utf8').split('\n')[0]);
		console.log(
			`${label} is recorded already (${meta.version} ${meta.build}); not recording again`
		);
		return;
	}
	for (const ext of ['.jsonl', '.codes.jsonl', '.api.json', '.sizes.json', '.unstable.json'])
		fs.rmSync(base + ext, {force: true});

	let swapped = false;
	const other = flag('--ref') ? reference(opt('--ref') || REF_VERSION) : opt('--dist');
	try {
		if (other) {
			swapDist(path.resolve(root, other));
			swapped = true;
		}
		const started = Date.now();
		suite(file);
		const c = require('./compare.js');
		const R = c.load(base);
		// A second run of the same build tells which statements the engine itself does not
		// answer the same way twice (a mixed-type ORDER BY): their results are not compared
		if (!flag('--once')) {
			const second = base + '.pass2';
			suite(second + '.jsonl');
			const u = c.unstable(R, c.load(second));
			fs.writeFileSync(base + '.unstable.json', JSON.stringify(u.list, null, 1));
			fs.rmSync(second + '.jsonl', {force: true});
			fs.rmSync(second + '.codes.jsonl', {force: true});
			console.log(
				`  two runs of this build: ${u.list.length} statements with another result or error (not compared later)` +
					(u.onlyA + u.onlyB + u.diverged
						? `; the runs did not run the same statements (only in the first ${u.onlyA}, only in the second ${u.onlyB}, diverged ${u.diverged})`
						: '')
			);
			for (const x of u.list.slice(0, 5)) console.log(`    ${x.f}: ${x.sql.slice(0, 120)}`);
		}
		const api = spawnSync('bun', ['test/parity/api.js', 'snapshot'], {cwd: root, encoding: 'utf8'});
		if (api.status) throw new Error('api snapshot failed: ' + api.stderr);
		fs.writeFileSync(base + '.api.json', api.stdout);
		fs.writeFileSync(base + '.sizes.json', JSON.stringify(sizes(), null, 1));
		let statements = 0;
		for (const list of R.byFile.values()) statements += list.length;
		console.log(
			`recorded ${statements} records in ${R.byFile.size} files, ${Object.keys(JSON.parse(api.stdout)).length} api paths in ${((Date.now() - started) / 1000).toFixed(1)} s -> ${path.relative(root, base)}.*`
		);
		if (c.reportSilent(R, label))
			console.log('  the hook was missing for these files: not a usable recording');
	} finally {
		if (swapped && !flag('--no-rebuild')) rebuild();
	}
}

// One run of the suite and the dialect corpus into one recording
function suite(file) {
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
		{env: {PARITY_OUT: file}}
	);
	console.log(`suite exit code ${status} (a failing test is recorded, not fatal)`);
	if (
		sh('bun', ['test/parity/dialect-corpus.js'], {
			env: {PARITY_OUT: file, PARITY_APPEND: '1', PARITY_TAG: 'dialect'},
		})
	)
		throw new Error('dialect corpus failed');
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
		'usage: run.js record <label> [--ref [<version>|<commit>] | --dist <dir>] [--no-rebuild] [--once] [--if-missing] | compare <a> <b> [--limit N] [--file f]'
	);
	process.exit(2);
}
