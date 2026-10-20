/*
	AlaSQL performance benchmark.

	Usage:
	  bun test/performance/bench.js                       # benchmark ./dist/alasql.fs.js
	  bun test/performance/bench.js path/to/alasql.fs.js  # benchmark another build (e.g. a PR worktree)
	  bun test/performance/bench.js --json > out.json     # machine-readable output
	  node test/performance/bench.js                      # works on Node too
	  bun test/performance/bench.js --group=core          # only the cases of one group
	  bun test/performance/bench.js --case=like           # only cases whose name contains the text
	  bun test/performance/bench.js --list [--json]       # print the cases and their groups

	Compare two builds:
	  bun test/performance/compare.js base.json other.json

	Every case reports the median of ROUNDS rounds; each round runs the query ITERS times
	and reports ms per query. Cases that cannot parse on the given build (feature not present)
	are reported as "n/a" so the same script runs on any branch.
	Not picked up by `bun test` (the test glob is test/test[0-9]* and test/test-*).

	Groups: a case is faster when it runs alone in a process than after other cases (the JIT has
	seen fewer kinds of query), up to 4 times for LIKE on Bun. So numbers only compare when they
	were measured in the same group. history.js runs each group in its own process. The cases of
	"core" are the ones in test/performance/historical since 2026-10-20: keep their order, and
	give a new case its own group (the default is the case name, so it runs alone).
*/

const args = process.argv.slice(2);
const json = args.includes('--json');
const onlyCases = args.filter(a => a.startsWith('--case=')).map(a => a.slice(7).toLowerCase());
const onlyGroups = args.filter(a => a.startsWith('--group=')).map(a => a.slice(8));
const distPath =
	args.find(a => !a.startsWith('--')) || require('path').join(__dirname, '../../dist/alasql.fs.js');

const ROUNDS = 5;
const ROWS = 100000;

const rows = [];
for (let i = 0; i < ROWS; i++)
	rows.push({id: i, a: i % 97, b: 'k' + (i % 50), c: i * 1.5, s: 'str' + (i % 1000)});
const small = [];
for (let i = 0; i < 50; i++) small.push({b: 'k' + i, name: 'name' + i});

// [name, sql, params, iterations, group]; the group defaults to the case name
const cases = [
	['where filter 100k', 'SELECT * FROM ? WHERE a > 50', [rows], 10, 'core'],
	['group by 100k', 'SELECT b, SUM(c) AS s, COUNT(*) AS n FROM ? GROUP BY b', [rows], 10, 'core'],
	[
		'join 100k x 50',
		'SELECT r.id, s.name FROM ? r JOIN ? s ON r.b = s.b WHERE r.a < 10',
		[rows, small],
		5,
		'core',
	],
	['order by limit 100k', 'SELECT id, c FROM ? ORDER BY c DESC LIMIT 100', [rows], 5, 'core'],
	['scalar functions 100k', 'SELECT UPPER(b) || a AS x FROM ?', [rows], 5, 'core'],
	['like 100k', "SELECT id FROM ? WHERE s LIKE 'str1%'", [rows], 5, 'core'],
	['insert 10k rows', null, null, 3, 'core'], // special-cased below
	['parse mid-size select', null, null, 500, 'core'],
	['tiny query, cache miss', null, null, 500, 'core'],
	['tiny query, cache hit', 'SELECT 1 AS v FROM ? WHERE a > 100', [small], 2000, 'core'],
	// feature cases: n/a on builds without the feature
	[
		'LET clause 100k (PR 2535)',
		'SELECT id FROM ? LET $x = a * 2 WHERE $x > 100',
		[rows],
		5,
		'core',
	],
	[
		'LAG() OVER 100k (window PRs)',
		'SELECT id, b, LAG(c) OVER (PARTITION BY b ORDER BY id) AS prev FROM ? ORDER BY id',
		[rows],
		3,
		'core',
	],
];
for (const c of cases) c[4] = c[4] || c[0];

if (args.includes('--list')) {
	for (const [name, sql, , , group] of cases)
		console.log(json ? JSON.stringify({name, group, sql}) : `${group.padEnd(12)} ${name}`);
	process.exit(0);
}
const selected = cases.filter(
	([name, , , , group]) =>
		(!onlyCases.length || onlyCases.some(o => name.toLowerCase().includes(o))) &&
		(!onlyGroups.length || onlyGroups.includes(group))
);
if (!selected.length) {
	console.error('No case matches. Cases:\n' + cases.map(c => `${c[4]}: ${c[0]}`).join('\n'));
	process.exit(1);
}
const alasql = require(require('path').resolve(distPath));

let k = 0;
function runOnce(name, sql, params) {
	if (name === 'insert 10k rows') {
		alasql('CREATE TABLE IF NOT EXISTS bench_t (id INT, a INT, b STRING)');
		alasql('DELETE FROM bench_t');
		for (let i = 0; i < 10000; i++)
			alasql('INSERT INTO bench_t VALUES (?, ?, ?)', [i, i % 7, 'x' + i]);
		return;
	}
	if (name === 'parse mid-size select') {
		alasql.parse(
			`SELECT a, b, SUM(c) AS s FROM t${k++} WHERE a > 1 AND b <> 'x' GROUP BY a, b HAVING SUM(c) > 10 ORDER BY s DESC LIMIT 10`
		);
		return;
	}
	if (name === 'tiny query, cache miss') {
		alasql(`SELECT ${k++} AS v FROM ? WHERE a > 100`, [small]);
		return;
	}
	alasql(sql, params);
}

function median(xs) {
	const s = [...xs].sort((a, b) => a - b);
	return s[Math.floor(s.length / 2)];
}

const results = {};
for (const [name, sql, params, iters] of selected) {
	let supported = true;
	try {
		runOnce(name, sql, params); // warm-up and feature check
	} catch (e) {
		supported = false;
	}
	if (!supported) {
		results[name] = null;
		continue;
	}
	const rounds = [];
	for (let r = 0; r < ROUNDS; r++) {
		const t = performance.now();
		for (let i = 0; i < iters; i++) runOnce(name, sql, params);
		rounds.push((performance.now() - t) / iters);
	}
	results[name] = median(rounds);
}

const meta = {
	dist: distPath,
	version: alasql.version,
	runtime: typeof Bun !== 'undefined' ? 'bun ' + Bun.version : 'node ' + process.version,
	rows: ROWS,
	rounds: ROUNDS,
	date: new Date().toISOString().slice(0, 10),
};

if (json) {
	console.log(JSON.stringify({meta, results}, null, 2));
} else {
	console.log(
		`alasql ${meta.version} | ${meta.runtime} | ${meta.rows} rows | median of ${meta.rounds} rounds | ${meta.dist}`
	);
	for (const [name, ms] of Object.entries(results)) {
		console.log(
			name.padEnd(34),
			ms === null
				? '     n/a'
				: ms >= 1
					? ms.toFixed(2).padStart(8) + ' ms/op'
					: (ms * 1000).toFixed(1).padStart(8) + ' us/op'
		);
	}
}
