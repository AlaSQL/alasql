/*
	Benchmark history: run bench.js on npm releases and keep the numbers in historical/.

	Usage:
	  node test/performance/history.js run [options]   # measure and merge into historical/
	  node test/performance/history.js page            # rebuild the data block of results.html

	Options for run:
	  --group=<name>       group(s) from bench.js to measure (repeatable; default: every group)
	  --versions=<list>    all (default): every version in historical/
	                       new: every npm release that is not in historical/ yet
	                       4.17.0,4.17.1 or 4.0.0..4.2.0: those versions
	  --develop[=<path>]   also measure a develop build (default ../../dist/alasql.fs.js); the
	                       numbers go into the baseline file historical/develop-*.json
	  --runs=<n>           runs per build and runtime, interleaved across builds (default 5)
	  --runtimes=bun,node  (default both)
	  --cache=<dir>        where npm packages are unpacked (default ~/.cache/alasql-history)
	  --historical=<dir>   read and write another folder than historical/ (also for page)

	Examples:
	  node test/performance/history.js run --group=union --develop   # a new case on every release
	  node test/performance/history.js run --versions=new             # a new release, every group
	  node test/performance/history.js run --group=core --versions=4.17.0,4.17.1

	Each group runs in its own process (see "Groups" in bench.js), so a group can be added later
	and compared along its own versions. The other groups in a file stay as they are. Every file
	records how each group was measured in "measured"; a group without an entry there was
	measured as described in "meta".
	Raw runs are saved in the cache as they finish, so an interrupted run continues where it
	stopped when started again with the same options.
*/

const {execFileSync} = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const here = __dirname;
const bench = path.join(here, 'bench.js');
const [cmd, ...rest] = process.argv.slice(2);
const opt = {};
for (const a of rest) {
	const m = a.match(/^--([^=]+)(?:=(.*))?$/);
	if (!m) throw new Error('Unknown argument ' + a);
	if (m[1] === 'group') (opt.group ||= []).push(m[2]);
	else opt[m[1]] = m[2] === undefined ? true : m[2];
}
const histDir = path.resolve(opt.historical || path.join(here, 'historical'));

const sh = (bin, args, o = {}) =>
	execFileSync(bin, args, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...o});
const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, j) => fs.writeFileSync(f, JSON.stringify(j, null, '\t') + '\n');
const log = s => process.stderr.write(s + '\n');

function semver(v) {
	const [main, pre] = v.split('-');
	return {n: main.split('.').map(Number), pre};
}
function cmpVersion(a, b) {
	const x = semver(a);
	const y = semver(b);
	for (let i = 0; i < 3; i++) if (x.n[i] !== y.n[i]) return x.n[i] - y.n[i];
	return (x.pre ? 0 : 1) - (y.pre ? 0 : 1);
}

// Versions with files in historical/, oldest first
function knownVersions() {
	const vs = new Set();
	for (const f of fs.readdirSync(histDir)) {
		const m = f.match(/^(.+)\.(bun|node)\.json$/);
		if (m && !m[1].startsWith('develop')) vs.add(m[1]);
	}
	return [...vs].sort(cmpVersion);
}
const baselineFile = rt =>
	fs
		.readdirSync(histDir)
		.filter(f => f.startsWith('develop-') && f.endsWith(`.${rt}.json`))
		.map(f => path.join(histDir, f))[0];

function benchCases() {
	return sh('node', [bench, '--list', '--json']).trim().split('\n').map(JSON.parse);
}

// ---- npm packages ----

let npmTimes;
const releaseDate = v =>
	((npmTimes ||= JSON.parse(sh('npm', ['view', 'alasql', 'time', '--json'])))[v] || '').slice(
		0,
		10
	);

const smokeFile = cache => {
	const f = path.join(cache, 'smoke.js');
	fs.writeFileSync(
		f,
		"const a = require(process.argv[2]); a('SELECT COUNT(*) AS n FROM ? WHERE a > 1', [[{a: 1}, {a: 2}]]);\n"
	);
	return f;
};

// Unpack alasql@version and return the file to load, or null when the package has no build
function unpack(cache, v) {
	const dir = path.join(cache, 'pkgs', v);
	const pkg = path.join(dir, 'package');
	if (!fs.existsSync(pkg)) {
		fs.mkdirSync(dir, {recursive: true});
		const tgz = sh('npm', ['pack', 'alasql@' + v, '--silent'], {cwd: dir})
			.trim()
			.split('\n')
			.pop();
		sh('tar', ['xzf', tgz], {cwd: dir});
		fs.unlinkSync(path.join(dir, tgz));
	}
	// The Node build since 0.3; before that, dist/alasql.js or alasql.js at the root
	for (const f of ['dist/alasql.fs.js', 'dist/alasql.js', 'alasql.js'])
		if (fs.existsSync(path.join(pkg, f))) return path.join(pkg, f);
	return null;
}

// Can this runtime load the build? Installs missing dependencies one by one (some old releases
// declare dependencies that npm can no longer install as a whole).
function loads(cache, rt, entry) {
	const at = entry.indexOf(`${path.sep}package${path.sep}`);
	const pkg = at < 0 ? null : entry.slice(0, at + 9);
	for (let i = 0; i < 5; i++) {
		try {
			sh(rt, [smokeFile(cache), entry], {timeout: 30000});
			return true;
		} catch (e) {
			const m = String(e.stderr).match(/Cannot find (?:module|package) '([^'./][^']*)'/);
			if (!m || !pkg) return false;
			const name = m[1]
				.split('/')
				.slice(0, m[1].startsWith('@') ? 2 : 1)
				.join('/');
			const p = readJson(path.join(pkg, 'package.json'));
			const range = {...p.optionalDependencies, ...p.dependencies}[name] || 'latest';
			log(`  installing ${name}@${range} for ${path.basename(path.dirname(pkg))}`);
			// into the folder above the package: it has no package.json, so npm installs only this
			// module, and Node finds it there
			try {
				sh(
					'npm',
					['install', `${name}@${range}`, '--no-save', '--ignore-scripts', '--no-package-lock'],
					{
						cwd: path.dirname(pkg),
					}
				);
			} catch (e2) {
				return false;
			}
		}
	}
	return false;
}

// ---- run ----

function median(xs) {
	const s = [...xs].sort((a, b) => a - b);
	return s[Math.floor(s.length / 2)];
}

function machine() {
	const c = os.cpus();
	return `${c[0].model}, ${c.length} cores, ${Math.round(os.totalmem() / 2 ** 30)} GB, ${os.platform()} ${os.release()}`;
}

function selectVersions() {
	const spec = opt.versions || 'all';
	if (spec === 'all') return knownVersions();
	if (spec === 'new') {
		const known = new Set(knownVersions());
		return JSON.parse(sh('npm', ['view', 'alasql', 'versions', '--json']))
			.filter(v => !v.includes('-') && !known.has(v))
			.sort(cmpVersion);
	}
	if (spec.includes('..')) {
		const [a, b] = spec.split('..');
		return knownVersions().filter(v => cmpVersion(v, a) >= 0 && cmpVersion(v, b) <= 0);
	}
	return spec.split(',');
}

function run() {
	const cache = path.resolve(opt.cache || path.join(os.homedir(), '.cache', 'alasql-history'));
	fs.mkdirSync(cache, {recursive: true});
	const RUNS = +(opt.runs || 5);
	const runtimes = (opt.runtimes || 'bun,node').split(',');
	const cases = benchCases();
	const allGroups = [...new Set(cases.map(c => c.group))];
	const groups = opt.group || allGroups;
	for (const g of groups) if (!allGroups.includes(g)) throw new Error(`No group ${g} in bench.js`);

	// builds: {label, entry, version} where label is the file name without runtime
	const builds = [];
	for (const v of selectVersions()) {
		const entry = unpack(cache, v);
		if (!entry) log(`skip ${v}: the package has no build`);
		else builds.push({label: v, version: v, entry});
	}
	if (opt.develop) {
		const entry = path.resolve(
			opt.develop === true ? path.join(here, '../../dist/alasql.fs.js') : opt.develop
		);
		let commit = '';
		try {
			commit = sh('git', ['rev-parse', '--short=8', 'HEAD'], {cwd: path.dirname(entry)}).trim();
		} catch (e) {}
		const base = baselineFile('node');
		const label = base ? path.basename(base).replace(/\.node\.json$/, '') : 'develop-' + commit;
		builds.push({label, entry, develop: true, commit});
	}
	if (!builds.length) throw new Error('No builds to run');

	// which runtimes can load each build
	for (const b of builds) {
		b.ok = {};
		for (const rt of runtimes) b.ok[rt] = loads(cache, rt, b.entry);
		if (!runtimes.some(rt => b.ok[rt]))
			log(`skip ${b.label}: does not load on ${runtimes.join(' or ')}`);
	}
	const todo = builds.filter(b => runtimes.some(rt => b.ok[rt]));

	// raw runs, saved after every process so an interrupted run can continue
	const id = crypto
		.createHash('sha1')
		.update(JSON.stringify([opt, RUNS]))
		.digest('hex');
	const rawFile = path.join(cache, `raw-${id.slice(0, 12)}.json`);
	const raw = fs.existsSync(rawFile) ? readJson(rawFile) : {};
	if (Object.keys(raw).length) log(`continuing from ${rawFile}`);
	const total = RUNS * todo.length * groups.length * runtimes.length;
	let n = 0;
	for (let r = 0; r < RUNS; r++)
		for (const b of todo)
			for (const g of groups)
				for (const rt of runtimes) {
					n++;
					const k = [b.label, rt, g, r].join('|');
					if (k in raw || !b.ok[rt]) continue;
					let res = null;
					try {
						const out = sh(rt, [bench, b.entry, '--json', '--group=' + g], {timeout: 600000});
						res = JSON.parse(out.slice(out.indexOf('{'))).results;
					} catch (e) {
						log(`FAIL ${k}: ${String(e.message).split('\n')[0]}`);
					}
					raw[k] = res;
					writeJson(rawFile, raw);
					log(`${n}/${total} ${k}`);
				}

	// merge medians into historical/
	const date = new Date().toISOString().slice(0, 10);
	const runtimeName = {
		bun: 'bun ' + sh('bun', ['--version']).trim(),
		node: 'node ' + sh('node', ['--version']).trim(),
	};
	for (const b of todo)
		for (const rt of runtimes) {
			const file = path.join(histDir, `${b.label}.${rt}.json`);
			const isNew = !fs.existsSync(file);
			const j = isNew ? {meta: {}, results: {}, spread: {}} : readJson(file);
			j.spread ||= {};
			const runtime = runtimeName[rt];
			for (const g of groups) {
				const groupCases = cases.filter(c => c.group === g).map(c => c.name);
				const rounds = [...Array(RUNS).keys()].map(r => raw[[b.label, rt, g, r].join('|')]);
				for (const name of groupCases) {
					const xs = rounds.map(x => (x ? x[name] : null));
					const ok = b.ok[rt] && xs.every(x => typeof x === 'number');
					j.results[name] = ok ? median(xs) : null;
					j.spread[name] = ok
						? +((Math.max(...xs) - Math.min(...xs)) / median(xs)).toFixed(3)
						: null;
				}
				(j.measured ||= {})[g] = {date, runtime, machine: machine(), runs: RUNS};
				if (b.develop && b.commit) j.measured[g].commit = b.commit;
			}
			if (isNew) {
				let reported = null;
				try {
					reported = sh('node', ['-p', `require(${JSON.stringify(b.entry)}).version`]).trim();
				} catch (e) {}
				j.meta = {
					dist: b.develop ? 'develop build ' + b.commit : 'npm alasql@' + b.version,
					version: b.develop ? reported : b.version,
					runtime,
					date,
					reportedVersion: reported,
					runs: RUNS,
					machine: machine(),
				};
				if (!b.develop) j.meta.released = releaseDate(b.version);
			}
			writeJson(file, j);
		}
	fs.unlinkSync(rawFile);
	log(`wrote ${todo.length * runtimes.length} files in ${histDir}`);
	prettier(path.join(histDir, '*.json'));
}

// ---- page ----

function prettier(target) {
	try {
		sh('npx', ['prettier', '--write', target], {cwd: path.join(here, '../..')});
	} catch (e) {
		log('prettier failed; run yarn format');
	}
}

// Rebuilds "cases" and "builds" in the bench-data block of results.html. Everything else in the
// block (titles, stories, method, case labels) is kept, so edit those in results.html.
function page() {
	const html = path.join(here, 'results.html');
	const src = fs.readFileSync(html, 'utf8');
	const re = /(<script type="application\/json" id="bench-data">)([\s\S]*?)(<\/script>)/;
	const D = JSON.parse(src.match(re)[2]);
	const benchList = benchCases();
	const builds = {};
	for (const f of fs.readdirSync(histDir)) {
		const m = f.match(/^(.+)\.(bun|node)\.json$/);
		if (!m) continue;
		const [, label, rt] = m;
		const j = readJson(path.join(histDir, f));
		const b = (builds[label] ||= {version: label, results: {}, spread: {}});
		if (label.startsWith('develop')) {
			Object.assign(b, {
				version: 'develop',
				baseline: true,
				commit: label.slice(8),
				released: j.meta.date,
			});
		} else {
			b.released = j.meta.released;
			if (j.meta.reportedVersion !== label) b.reportedVersion = j.meta.reportedVersion;
		}
		b.results[rt] = {};
		b.spread[rt] = {};
		for (const [k, v] of Object.entries(j.results))
			b.results[rt][k] = v === null ? null : +v.toPrecision(4);
		for (const [k, v] of Object.entries(j.spread || {})) b.spread[rt][k] = v;
		for (const [g, m2] of Object.entries(j.measured || {})) (b.measured ||= {})[g] ||= m2.date;
	}
	const list = Object.values(builds).sort((a, b) =>
		a.baseline ? 1 : b.baseline ? -1 : cmpVersion(a.version, b.version)
	);

	// cases: the ones in the block keep their label and position; new ones come from bench.js
	const has = key => list.some(b => Object.values(b.results).some(r => typeof r[key] === 'number'));
	const known = new Map((D.cases || []).map(c => [c.key, c]));
	const cases = [];
	for (const c of benchList) {
		const prev = known.get(c.name) || {key: c.name, label: c.name, sql: c.sql || ''};
		known.delete(c.name);
		if (has(c.name)) cases.push({...prev, group: c.group});
	}
	for (const c of known.values()) if (has(c.key)) cases.push(c); // removed from bench.js, still in data
	const groupDates = {};
	for (const b of list)
		for (const [g, d] of Object.entries(b.measured || {})) (groupDates[g] ||= new Set()).add(d);
	for (const c of cases)
		if (c.group !== 'core') {
			const ds = [...(groupDates[c.group] || [])].sort();
			c.note = `Measured ${ds.length ? ds[0] + (ds.length > 1 ? ' to ' + ds[ds.length - 1] : '') : ''} in its own process (group "${c.group}"), so compare it only along this chart.`;
		}
	for (const b of list) delete b.measured;

	D.cases = cases;
	D.index ||= cases.filter(c => c.group === 'core').map(c => c.key);
	D.builds = list;
	const json = JSON.stringify(D).replace(/</g, '\\u003c');
	fs.writeFileSync(html, src.replace(re, `$1\n${json}\n\t\t$3`));
	prettier(html);
	log(`${list.length} builds, ${cases.length} cases`);
}

if (cmd === 'run') run();
else if (cmd === 'page') page();
else {
	console.error(
		'usage: node test/performance/history.js run|page [options] (see the top of this file)'
	);
	process.exit(1);
}
