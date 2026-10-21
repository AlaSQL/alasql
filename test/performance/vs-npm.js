/*
	One number for "did develop get slower?": the local build against the latest release on npm.

	Usage:
	  yarn perf                                      # builds dist/, then runs this
	  node test/performance/vs-npm.js [options]

	Options:
	  --runs=<n>          runs per build and runtime, interleaved (default 3)
	  --runtimes=bun,node (default: both when Bun is installed, else node)
	  --group=<name>      only some groups (repeatable; default every group)
	  --fail-above=<n>    exit with code 1 when the score is above n (for CI)
	  --json              print the numbers as JSON

	The score: npm latest is 100. For every timed case, local time divided by npm time; the score
	is 100 times the geometric mean of those ratios, as an integer. 104 means develop takes about
	4 percent longer overall; below 100 is faster. Per runtime and per dimension it prints the
	change in percent, so a spike in one dimension shows even when the score barely moves.
	Only time (ms) counts, not heap or call counts, and a case counts only when both builds give
	develop's answer. Differences under about 5 percent are noise.
*/

const fs = require('fs');
const os = require('os');
const path = require('path');
const {unpack, loads, measure, benchCases, median, sh} = require('./history');

const opt = {group: []};
for (const a of process.argv.slice(2)) {
	const m = a.match(/^--([^=]+)(?:=(.*))?$/);
	if (!m) throw new Error('Unknown argument ' + a);
	if (m[1] === 'group') opt.group.push(m[2]);
	else opt[m[1]] = m[2] === undefined ? true : m[2];
}
const RUNS = +(opt.runs || 3);
const hasBun = (() => {
	try {
		sh('bun', ['--version']);
		return true;
	} catch (e) {
		return false;
	}
})();
const runtimes = (opt.runtimes || (hasBun ? 'bun,node' : 'node')).split(',');
const log = s => process.stderr.write(s + '\n');

const cases = benchCases();
const groups = opt.group.length ? opt.group : [...new Set(cases.map(c => c.group))];
const timed = new Set(cases.filter(c => c.unit === 'ms').map(c => c.name));

const cache = path.join(os.homedir(), '.cache', 'alasql-history');
fs.mkdirSync(cache, {recursive: true});
const latest = sh('npm', ['view', 'alasql', 'version']).trim();
const local = path.resolve(__dirname, '../../dist/alasql.fs.js');
if (!fs.existsSync(local)) throw new Error('No build at ' + local + ': run yarn build-only first');
let commit = '';
try {
	commit = sh('git', ['rev-parse', '--short=8', 'HEAD'], {cwd: __dirname}).trim();
} catch (e) {}
const builds = [
	{label: 'npm', name: 'npm alasql@' + latest, entry: unpack(cache, latest)},
	{label: 'local', name: 'local build' + (commit ? ' at ' + commit : ''), entry: local},
];
for (const b of builds)
	for (const rt of runtimes)
		if (!loads(cache, rt, b.entry)) throw new Error(`${b.name} does not load on ${rt}`);

// interleaved runs: npm and local take turns, so drift on the machine hits both alike
const raw = {};
const total = RUNS * builds.length * groups.length * runtimes.length;
let n = 0;
for (let r = 0; r < RUNS; r++)
	for (const g of groups)
		for (const b of builds)
			for (const rt of runtimes) {
				n++;
				let res = null;
				try {
					res = measure(rt, b.entry, g);
				} catch (e) {
					log(`FAIL ${b.label} ${rt} ${g}: ${String(e.message).split('\n')[0]}`);
				}
				for (const [k, v] of Object.entries((res && res.results) || {})) {
					const ok = typeof v === 'number' && !/wrong|error/.test((res.status || {})[k] || '');
					((raw[b.label + '|' + rt] ||= {})[k] ||= []).push(ok ? v : null);
				}
				log(`${n}/${total} ${b.label} ${rt} ${g}`);
			}

// ratios per case: local / npm, from the medians of the runs
const value = (label, rt, k) => {
	const xs = ((raw[label + '|' + rt] || {})[k] || []).filter(x => x !== null);
	return xs.length === RUNS ? median(xs) : null;
};
const ratios = {}; // rt -> [{key, group, r}]
for (const rt of runtimes)
	for (const c of cases) {
		if (!timed.has(c.name) || !groups.includes(c.group)) continue;
		const a = value('npm', rt, c.name);
		const b = value('local', rt, c.name);
		if (a > 0 && b > 0) (ratios[rt] ||= []).push({key: c.name, group: c.group, r: b / a});
	}
const geo = xs =>
	xs.length ? Math.exp(xs.reduce((s, x) => s + Math.log(x), 0) / xs.length) : null;
const all = Object.values(ratios).flat();
const score = Math.round(100 * geo(all.map(x => x.r)));
const perRt = Object.fromEntries(
	runtimes.map(rt => [rt, Math.round(100 * geo((ratios[rt] || []).map(x => x.r)))])
);
const perGroup = groups.map(g => ({
	group: g,
	...Object.fromEntries(
		runtimes.map(rt => {
			const xs = (ratios[rt] || []).filter(x => x.group === g).map(x => x.r);
			return [rt, xs.length ? Math.round((geo(xs) - 1) * 100) : null];
		})
	),
}));
const biggest = all
	.map(x => ({...x, rt: runtimes.find(rt => ratios[rt].includes(x))}))
	.sort((a, b) => Math.abs(Math.log(b.r)) - Math.abs(Math.log(a.r)))
	.slice(0, 8);

const runtimeName = rt =>
	rt === 'bun' ? 'Bun ' + sh('bun', ['--version']).trim() : 'Node ' + process.version.slice(1);
if (opt.json) {
	console.log(
		JSON.stringify(
			{
				npm: latest,
				local: commit,
				runs: RUNS,
				score,
				runtimes: perRt,
				dimensions: perGroup,
				cases: ratios,
			},
			null,
			2
		)
	);
} else {
	const pct = p => (p === null ? '   n/a' : (p > 0 ? '+' : '') + p + '%');
	const flag = row =>
		runtimes.some(rt => row[rt] !== null && row[rt] >= 10)
			? '  << slower'
			: runtimes.some(rt => row[rt] !== null && row[rt] <= -10)
				? '  faster'
				: '';
	console.log(`\nalasql performance: ${builds[1].name} against npm alasql@${latest}`);
	console.log(
		`${RUNS} run${RUNS > 1 ? 's' : ''} per build on ${runtimes.map(runtimeName).join(' and ')}, ${all.length} timed cases\n`
	);
	console.log(`Score: ${score}   (npm ${latest} = 100; higher is slower)`);
	console.log(
		'  ' + runtimes.map(rt => `${runtimeName(rt).split(' ')[0]} ${perRt[rt]}`).join(', ') + '\n'
	);
	console.log('Change per dimension against npm ' + latest + ':');
	console.log(
		'  ' +
			'dimension'.padEnd(20) +
			runtimes.map(rt => runtimeName(rt).split(' ')[0].padStart(8)).join('')
	);
	for (const row of perGroup)
		console.log(
			'  ' +
				row.group.padEnd(20) +
				runtimes.map(rt => pct(row[rt]).padStart(8)).join('') +
				flag(row)
		);
	console.log('\nBiggest changes per case:');
	for (const x of biggest)
		console.log(
			`  ${pct(Math.round((x.r - 1) * 100)).padStart(7)}  ${runtimeName(x.rt).split(' ')[0].padEnd(5)} ${x.key}`
		);
	console.log(
		'\nDifferences under about 5 percent are noise; a dimension at 10 percent or more is marked.'
	);
}
if (opt['fail-above'] && score > +opt['fail-above']) process.exit(1);
