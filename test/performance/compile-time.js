/*
	Compile time of a SELECT (#2723).

	bench.js measures how long queries run. This script measures how long Select.compile takes
	for a parsed statement, which is what a query pays once before it is cached. It compares
	two or more builds on the same machine in the same session.

	Usage:
	  bun test/performance/compile-time.js                              # ./dist/alasql.fs.js alone
	  bun test/performance/compile-time.js base/alasql.fs.js            # a base build against ./dist
	  bun test/performance/compile-time.js a.fs.js b.fs.js c.fs.js      # the first is the base
	  ... --runs=16         processes per build and runtime (default 16)
	  ... --warmup=300      compiles before the timed rounds (default 300; 2000 for a warmer JIT)
	  ... --runtime=node    node, bun or node,bun (default)
	  ... --json            the numbers as JSON

	With one build given it is the base, and ./dist/alasql.fs.js is compared with it.

	Every process compiles each query WARMUP times, then times 12 rounds of 300 compiles and
	keeps the best round, in microseconds per compile. The builds take turns, one process each,
	so a change of load on the machine meets every build. The table has the best and the median
	of the processes, and the change of each against the first build.

	How much to trust it: on a machine that does other work a line moves by a few percent
	between two runs of the same build. Run it on a quiet machine, look at the median too, and
	read a difference under about 3 percent as none.

	The queries:
	  grouped, one table      three bare columns and two aggregates, GROUP BY
	  grouped, three tables   four bare columns that three tables define between them, GROUP BY
	  plain, one table        bare columns, two built-in functions, WHERE, ORDER BY
	  plain, three tables     the same over a join of three tables
	  wide, plain             three tables of 60 columns, about 24 bare names
	  wide, grouped           the same with GROUP BY and aggregates
	The first four are the ones in the pull requests of #2723 (#3114 and later), and their
	numbers there are from this script's loop.
*/

const path = require('path');
const {spawnSync} = require('child_process');

const ROUNDS = 12;
const ITERS = 300;

function worker(build, warmup) {
	const alasql = require(path.resolve(build));
	alasql('CREATE DATABASE compiletime; USE compiletime');
	alasql('CREATE TABLE users (id INT, name STRING, age INT, city STRING, dept INT)');
	alasql('CREATE TABLE orders (oid INT, user_id INT, amount NUMBER, status STRING, created DATE)');
	alasql('CREATE TABLE depts (did INT, title STRING)');
	const cols = p => Array.from({length: 60}, (_, i) => p + i + ' INT').join(', ');
	alasql('CREATE TABLE wa (id INT, ' + cols('a') + ')');
	alasql('CREATE TABLE wb (bid INT, ' + cols('b') + ')');
	alasql('CREATE TABLE wc (cid INT, ' + cols('c') + ')');
	const J =
		' FROM users JOIN orders ON orders.user_id = users.id JOIN depts ON depts.did = users.dept';
	const W = ' FROM wa JOIN wb ON bid = id JOIN wc ON cid = id';
	const cases = {
		'grouped, one table':
			'SELECT city, dept, name, COUNT(*) AS n, SUM(age) AS s FROM users GROUP BY city, dept',
		'grouped, three tables':
			'SELECT title, city, status, name, COUNT(*) AS n, SUM(amount) AS s' +
			J +
			' GROUP BY title, city',
		'plain, one table':
			'SELECT id, name, UPPER(city) AS c, age + 1 AS a FROM users WHERE age > 30 AND LENGTH(name) > 2 ORDER BY name',
		'plain, three tables':
			'SELECT name, title, amount, UPPER(city) AS c, ABS(amount) AS a' +
			J +
			" WHERE status = 'paid' AND LENGTH(title) > 2 ORDER BY amount",
		'wide, plain':
			'SELECT a1, a2, a3, b1, b2, b3, c1, c2, c3, a4 + b4 AS s, ABS(c5) AS f' +
			W +
			' WHERE a10 > 0 AND b10 > 0 AND c10 > 0 ORDER BY a20, b20',
		'wide, grouped':
			'SELECT a1, b1, c1, COUNT(*) AS n, SUM(a2 + b2) AS s, MAX(c3) AS m' +
			W +
			' WHERE a10 > 0 AND c10 > 0 GROUP BY a1, b1, c1',
	};
	const out = {};
	for (const name of Object.keys(cases)) {
		const statement = alasql.parse(cases[name]).statements[0];
		for (let i = 0; i < warmup; i++) statement.compile('compiletime');
		let best = Infinity;
		for (let r = 0; r < ROUNDS; r++) {
			const t = process.hrtime.bigint();
			for (let i = 0; i < ITERS; i++) statement.compile('compiletime');
			best = Math.min(best, Number(process.hrtime.bigint() - t) / ITERS / 1000);
		}
		out[name] = best;
	}
	console.log(JSON.stringify(out));
}

function main(argv) {
	const opt = name => {
		const arg = argv.find(a => a.startsWith('--' + name + '='));
		return arg && arg.slice(name.length + 3);
	};
	const runs = Number(opt('runs') || 16);
	const warmup = Number(opt('warmup') || 300);
	const runtimes = (opt('runtime') || 'node,bun').split(',');
	const builds = argv.filter(a => !a.startsWith('--'));
	const own = path.join(__dirname, '..', '..', 'dist', 'alasql.fs.js');
	if (builds.length < 2) builds.push(own);

	// numbers[runtime][query][build] = one number per process
	const numbers = {};
	for (const runtime of runtimes) {
		numbers[runtime] = {};
		for (let run = 0; run < runs; run++) {
			builds.forEach((build, b) => {
				const r = spawnSync(runtime, [__filename, '--worker', build, String(warmup)], {
					encoding: 'utf8',
				});
				if (r.status !== 0) {
					throw new Error(`${runtime} ${build}: ${r.stderr || r.error || 'no output'}`);
				}
				const res = JSON.parse(r.stdout);
				for (const query of Object.keys(res)) {
					const perBuild = (numbers[runtime][query] = numbers[runtime][query] || []);
					(perBuild[b] = perBuild[b] || []).push(res[query]);
				}
			});
		}
	}

	const median = list => list.slice().sort((x, y) => x - y)[list.length >> 1];
	const rows = [];
	for (const runtime of runtimes) {
		for (const query of Object.keys(numbers[runtime])) {
			rows.push({
				query,
				runtime,
				best: numbers[runtime][query].map(list => Math.min.apply(null, list)),
				median: numbers[runtime][query].map(median),
			});
		}
	}
	if (argv.includes('--json')) {
		console.log(JSON.stringify({builds, runs, warmup, rows}, null, 1));
		return;
	}
	const change = (x, base) => {
		const pct = Math.round((x / base - 1) * 100);
		return ' (' + (pct > 0 ? '+' : '') + pct + '%)';
	};
	const cells = list =>
		list.map((x, b) => (x.toFixed(2) + (b ? change(x, list[0]) : '')).padStart(b ? 15 : 8));
	console.log(`microseconds per compile, ${runs} processes per build, warm-up ${warmup}`);
	builds.forEach((build, b) => console.log(`  build ${b + 1}${b ? '' : ' (base)'}: ${build}`));
	for (const kind of ['best', 'median']) {
		console.log(`\n${kind}`);
		for (const row of rows) {
			console.log(`  ${row.query.padEnd(22)} ${row.runtime.padEnd(5)}${cells(row[kind]).join('')}`);
		}
	}
}

if (process.argv[2] === '--worker') worker(process.argv[3], Number(process.argv[4]));
else main(process.argv.slice(2));
