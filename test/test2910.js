if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Comma joins with the conditions in WHERE: bare column names, FROM out of chain order,
// and a function on one side of a condition (#2910, after #2279)
describe('Test 2910 - comma joins with bare column names or tables out of chain order', function () {
	const test = '2910';
	const tables = 16;

	// t1 .. t16 with 10 rows each; a is the row number, b links to the next table's a, and
	// the chain is pinned to one row by a1 = 5
	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		for (let i = 1; i <= tables; i++) {
			alasql(`CREATE TABLE t${i} (a${i} INT PRIMARY KEY, b${i} INT, x${i} STRING)`);
			for (let r = 1; r <= 10; r++) {
				alasql(`INSERT INTO t${i} VALUES (${r}, ${((r * 3) % 10) + 1}, 't${i} row ${r}')`);
			}
		}
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	const bare = (c, i) => c + i;
	const qualified = (c, i) => `t${i}.${c}${i}`;
	const query = (order, col) => {
		const where = [`${col('a', 1)} = 5`];
		for (let i = 1; i < order.length; i++) where.push(`${col('b', i)} = ${col('a', i + 1)}`);
		return (
			`SELECT ${order.map(i => col('x', i)).join(', ')} FROM ${order.map(i => 't' + i).join(', ')}` +
			` WHERE ${where.join(' AND ')}`
		);
	};
	const inOrder = n => Array.from({length: n}, (_, i) => i + 1);
	const oddFirst = n =>
		inOrder(n)
			.filter(i => i % 2)
			.concat(inOrder(n).filter(i => i % 2 === 0));

	// The one row the chain pins: a1 = 5, b1 = 6 = a2, b2 = 9 = a3, ...
	const expected = n => {
		const row = {};
		let a = 5;
		for (let i = 1; i <= n; i++) {
			row['x' + i] = `t${i} row ${a}`;
			a = ((a * 3) % 10) + 1;
		}
		return [row];
	};

	// The old code built every combination of rows for these: 61 seconds for the 9 tables
	// with bare names, 7 seconds for the 16 tables with the odd ones first (#2910). A bound
	// well above what the fix needs (milliseconds) catches a fall back to that, not noise.
	const quick = (name, sql, rows) => {
		it(name, function () {
			const t = Date.now();
			const res = alasql(sql);
			const ms = Date.now() - t;
			assert.deepStrictEqual(res, rows);
			assert.ok(ms < 2000, name + ' took ' + ms + ' ms');
		});
	};

	quick(
		'A) 16 tables, qualified names, FROM in chain order',
		query(inOrder(16), qualified),
		expected(16)
	);
	quick(
		'B) 16 tables, qualified names, FROM with the odd tables first',
		query(oddFirst(16), qualified),
		expected(16)
	);
	quick('C) 9 tables, bare names, FROM in chain order', query(inOrder(9), bare), expected(9));
	quick(
		'D) 9 tables, bare names, FROM with the odd tables first',
		query(oddFirst(9), bare),
		expected(9)
	);

	it('E) the chosen order gives the same rows as FROM order, in ORDER BY order', function () {
		// Not pinned to one row: 10 rows, matched up by the chain
		const sql = order =>
			`SELECT x1, x2, x3, x4 FROM ${order.map(i => 't' + i).join(', ')}` +
			' WHERE b1 = a2 AND b2 = a3 AND b3 = a4 ORDER BY x1';
		const res = alasql(sql([1, 2, 3, 4]));
		assert.equal(res.length, 10);
		assert.deepStrictEqual(alasql(sql([4, 2, 1, 3])), res);
		assert.deepStrictEqual(alasql(sql([3, 1, 4, 2])), res);
	});

	it('F) matches the explicit JOIN', function () {
		const comma = alasql('SELECT x1, x2, x3 FROM t3, t1, t2 WHERE b1 = a2 AND b2 = a3 AND a1 = 5');
		const explicit = alasql(
			'SELECT x1, x2, x3 FROM t1 JOIN t2 ON b1 = a2 JOIN t3 ON b2 = a3 WHERE a1 = 5'
		);
		assert.deepStrictEqual(comma, explicit);
		assert.deepStrictEqual(comma, expected(3));
	});

	it('G) a table with no link is still cross joined', function () {
		// t3 is tied to nothing: every row of t3 for the one row of the t1, t2 chain
		const res = alasql('SELECT x1, x2, x3 FROM t1, t3, t2 WHERE b1 = a2 AND a1 = 5 ORDER BY x3');
		assert.equal(res.length, 10);
		assert.equal(res[0].x1, 't1 row 5');
		assert.equal(res[0].x2, 't2 row 6');
		assert.equal(res[0].x3, 't3 row 1');
	});

	it('H) an ambiguous bare column still fails as before', function () {
		alasql('CREATE TABLE u1 (k INT, v INT)');
		alasql('CREATE TABLE u2 (k INT, w INT)');
		alasql('INSERT INTO u1 VALUES (1, 10)');
		alasql('INSERT INTO u2 VALUES (1, 20)');
		assert.throws(
			() => alasql('SELECT v, w FROM u1, u2 WHERE k = k'),
			/Cannot resolve column "k" because it exists in two source tables/
		);
		// Qualified, the same join works
		assert.deepStrictEqual(alasql('SELECT v, w FROM u1, u2 WHERE u1.k = u2.k'), [{v: 10, w: 20}]);
	});

	it('I) a function on one side of a condition joins through the index', function () {
		alasql('CREATE TABLE p (id INT, name STRING)');
		alasql('CREATE TABLE q (id INT, uname STRING)');
		alasql('INSERT INTO p VALUES (1, "ann"), (2, "bob"), (3, "cy")');
		alasql('INSERT INTO q VALUES (1, "ANN"), (2, "BOB"), (4, "DEE")');
		// Before: "Cannot read properties of undefined (reading 'name')", because the function
		// hid the column and the condition was taken for a filter on q alone
		assert.deepStrictEqual(
			alasql('SELECT p.id, q.id AS qid FROM p, q WHERE UPPER(p.name) = q.uname ORDER BY p.id'),
			[
				{id: 1, qid: 1},
				{id: 2, qid: 2},
			]
		);
		assert.deepStrictEqual(
			alasql('SELECT p.id, q.id AS qid FROM p, q WHERE q.uname = UPPER(name) AND p.id = q.id'),
			[
				{id: 1, qid: 1},
				{id: 2, qid: 2},
			]
		);
	});

	it('J) a condition with a parameter pins the first table', function () {
		const res = alasql('SELECT x1, x2 FROM t2, t1 WHERE b1 = a2 AND a1 = ?', [7]);
		assert.deepStrictEqual(res, [{x1: 't1 row 7', x2: 't2 row 2'}]);
	});

	it('K) the optimization is set up with bare names and a chosen order', function () {
		const compiled = alasql.compile(
			'SELECT x1, x2, x3 FROM t3, t1, t2 WHERE b1 = a2 AND b2 = a3 AND a1 = 5'
		);
		const sources = compiled.query.sources;
		assert.deepStrictEqual(
			sources.map(s => s.alias),
			['t1', 't2', 't3']
		);
		assert.equal(sources[0].optimization, undefined);
		assert.equal(sources[1].optimization, 'ix');
		assert.equal(sources[2].optimization, 'ix');
		assert.ok(sources[0].srcwherefns, 'a1 = 5 filters t1 before the join');
	});
});
