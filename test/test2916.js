if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Comma joins where a table is filtered by IN, OR, LIKE, BETWEEN or NOT: the filter runs on
// that table before the join, not on every combination of rows (#2916, after #2279 and #2910)
describe('Test 2916 - comma joins with a table filtered by IN or OR', function () {
	const test = '2916';

	// t1 .. t6 with 100 rows each, columns a..e in 0..999 and x, seeded so the rows repeat
	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		let seed = 2916;
		const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
		const int = n => Math.floor(rnd() * n);
		for (let i = 1; i <= 6; i++) {
			alasql(
				`CREATE TABLE t${i} (r${i} INT, a${i} INT, b${i} INT, c${i} INT, d${i} INT, e${i} INT, x${i} STRING)`
			);
			const rows = [];
			for (let r = 0; r < 100; r++) {
				rows.push({
					[`r${i}`]: r,
					[`a${i}`]: int(1000),
					[`b${i}`]: int(1000),
					[`c${i}`]: int(1000),
					[`d${i}`]: int(1000),
					[`e${i}`]: int(1000),
					[`x${i}`]: `table t${i} row ${r}`,
				});
			}
			alasql(`INSERT INTO t${i} SELECT * FROM ?`, [rows]);
		}
		// Rows the filters below find: the first few of each table
		alasql('UPDATE t1 SET a1 = 553, e1 = 553 WHERE r1 < 3');
		alasql('UPDATE t2 SET a2 = 651, c2 = 100 WHERE r2 < 5');
		alasql('UPDATE t3 SET a3 = 553 WHERE r3 < 3');
		alasql('UPDATE t4 SET b4 = 802 WHERE r4 < 3');
		alasql('UPDATE t5 SET e5 = 548 WHERE r5 < 7');
		alasql('UPDATE t6 SET d6 = 729, e6 = 245 WHERE r6 < 5');
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	// The select4.test shape of the issue: six tables, no join condition, a filter on each.
	// Before, only a1 = 553 filtered its table and the other five tables of 100 rows were
	// combined in full (10^10 rows); the query did not end in 280 seconds.
	const commaJoin =
		'SELECT d1*631, a4+637+a1, a5, x6, c2, e3 FROM t6, t5, t2, t3, t4, t1' +
		' WHERE e5 in (548,632,981,646,63,487,859) AND a2 in (651,814,709,445,863)' +
		' AND d6 in (729,729,924,807,458,956) AND (a3=553 OR a3=697) AND (114=b4 OR b4=802) AND a1=553';
	const withSubqueries =
		'SELECT d1*631, a4+637+a1, a5, x6, c2, e3 FROM' +
		' (SELECT * FROM t6 WHERE d6 in (729,729,924,807,458,956)) AS t6,' +
		' (SELECT * FROM t5 WHERE e5 in (548,632,981,646,63,487,859)) AS t5,' +
		' (SELECT * FROM t2 WHERE a2 in (651,814,709,445,863)) AS t2,' +
		' (SELECT * FROM t3 WHERE (a3=553 OR a3=697)) AS t3,' +
		' (SELECT * FROM t4 WHERE (114=b4 OR b4=802)) AS t4,' +
		' (SELECT * FROM t1 WHERE a1=553) AS t1';

	it('A) IN and OR filters on each table, no join condition', function () {
		const rows = alasql(commaJoin);
		assert.ok(rows.length > 100, 'the filters leave rows to combine: ' + rows.length);
		assert.deepStrictEqual(rows, alasql(withSubqueries));
	});

	it('B) one link and filters on the other tables, in two FROM orders', function () {
		const where =
			'(e6=245 OR 35=e6 OR 799=e6) AND c2=100 AND a3=e1 AND b4 in (802,261,877,33)' +
			' AND e5 in (548,329,487,242,533,56,203,893) AND a1 in (553,992,32,189,338,358,161,538)';
		const sorted = rows => rows.sort((p, q) => JSON.stringify(p).localeCompare(JSON.stringify(q)));
		const first = sorted(
			alasql(`SELECT a3, a2, e1, a6+b6, e4*658+b1, x5 FROM t3, t1, t6, t2, t5, t4 WHERE ${where}`)
		);
		const second = sorted(
			alasql(`SELECT a3, a2, e1, a6+b6, e4*658+b1, x5 FROM t6, t3, t4, t1, t2, t5 WHERE ${where}`)
		);
		assert.ok(first.length > 0, 'rows: ' + first.length);
		assert.deepStrictEqual(first, second);
	});

	it('C) the filters are set up on their tables', function () {
		const compiled = alasql.compile(commaJoin);
		const sources = compiled.query.sources;
		assert.deepStrictEqual(
			sources.map(s => s.alias),
			['t6', 't5', 't2', 't3', 't4', 't1'],
			'no join condition, so FROM order stays'
		);
		for (const s of sources) assert.ok(s.srcwherefns, s.alias + ' has a filter: ' + s.srcwherefns);
	});

	it('D) BETWEEN across two tables is a join condition, not a filter', function () {
		// Before #2916 the walker did not read right1 and right2; a filter on t1 alone would
		// have read t2 and thrown
		const rows = alasql(
			'SELECT a1, a2 FROM t1, t2 WHERE a1 BETWEEN a2 AND a2 + 1 AND a1 = 553 ORDER BY a2'
		);
		const check = alasql(
			'SELECT a1, a2 FROM t1 JOIN t2 ON a1 >= a2 AND a1 <= a2 + 1 WHERE a1 = 553 ORDER BY a2'
		);
		assert.deepStrictEqual(rows, check);
	});

	it('E) LIKE, NOT, IS NULL and a function filter their table', function () {
		const rows = alasql(
			"SELECT x1, x2 FROM t1, t2 WHERE x1 LIKE 'table t1 row 1_' AND NOT (a2 < 500) AND b2 IS NOT NULL AND UPPER(t2.x2) LIKE '%ROW 9%' ORDER BY x1, x2"
		);
		const check = alasql(
			"SELECT x1, x2 FROM t1 CROSS JOIN t2 WHERE x1 LIKE 'table t1 row 1_' AND NOT (a2 < 500) AND b2 IS NOT NULL AND UPPER(t2.x2) LIKE '%ROW 9%' ORDER BY x1, x2"
		);
		assert.ok(rows.length > 0, 'rows: ' + rows.length);
		assert.deepStrictEqual(rows, check);
		const compiled = alasql.compile(
			"SELECT x1, x2 FROM t1, t2 WHERE x1 LIKE 'table t1 row 1_' AND NOT (a2 < 500) AND b2 IS NOT NULL"
		);
		assert.ok(compiled.query.sources[0].srcwherefns.includes('like'), 'LIKE filters t1');
		assert.ok(
			compiled.query.sources[1].srcwherefns.includes('&&'),
			'NOT and IS NOT NULL filter t2'
		);
		const withFunction = alasql.compile(
			"SELECT x1, x2 FROM t1, t2 WHERE UPPER(t2.x2) LIKE '%ROW 9%' AND x1 LIKE 'table t1 row 1_'"
		);
		// UPPER compiles to toUpperCase; the filter on t2 reads t2.x2 inside it
		assert.ok(
			withFunction.query.sources[1].srcwherefns.includes("p['t2']['x2']"),
			'the function filters t2: ' + withFunction.query.sources[1].srcwherefns
		);
	});

	it('F) a condition with a subquery stays in WHERE', function () {
		const rows = alasql(
			'SELECT a1, a2 FROM t1, t2 WHERE a1 = 553 AND a2 IN (SELECT a2 FROM t2 WHERE a2 = 651) ORDER BY a2'
		);
		assert.ok(rows.length > 0);
		assert.ok(rows.every(r => r.a1 === 553 && r.a2 === 651));
		const compiled = alasql.compile(
			'SELECT a1, a2 FROM t1, t2 WHERE a1 = 553 AND a2 IN (SELECT a2 FROM t2 WHERE a2 = 651)'
		);
		assert.equal(
			compiled.query.sources[1].srcwherefns,
			'',
			'the IN (subquery) is not a filter on t2'
		);
	});

	it('G) a parameter in a filter', function () {
		const rows = alasql(
			'SELECT a1, a2 FROM t1, t2 WHERE a1 = 553 AND a2 IN (?, ?) ORDER BY a2',
			[651, 1]
		);
		const check = alasql('SELECT a1, a2 FROM t1, t2 WHERE a1 = 553 AND a2 IN (651, 1) ORDER BY a2');
		assert.ok(rows.length >= 15, 'rows: ' + rows.length);
		assert.deepStrictEqual(rows, check);
		assert.ok(rows.every(r => r.a1 === 553 && (r.a2 === 651 || r.a2 === 1)));
	});

	it('H) the same query twice with other parameters, on tables loaded by assigning data', function () {
		// A join index built on filtered rows depends on the parameter values, so it must not be
		// reused by a run with other values
		alasql('CREATE TABLE u1 (a INT, b INT)');
		alasql('CREATE TABLE u2 (a INT, b INT)');
		alasql.tables.u1.data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		alasql.tables.u2.data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		const twice = (sql, p1, p2) => [alasql(sql, [p1]), alasql(sql, [p2])];
		assert.deepStrictEqual(
			twice('SELECT u1.a FROM u1, u2 WHERE u1.a = u2.a AND u2.b = ?', 10, 20),
			[[{a: 1}], [{a: 2}]]
		);
		assert.deepStrictEqual(
			twice('SELECT u1.a FROM u1, u2 WHERE u1.a = u2.a AND u2.b IN (?)', 10, 20),
			[[{a: 1}], [{a: 2}]]
		);
		assert.deepStrictEqual(
			twice('SELECT u1.a FROM u1, u2 WHERE u1.a = u2.a AND u2.b > ? ORDER BY u1.a', 15, 5),
			[[{a: 2}], [{a: 1}, {a: 2}]]
		);
		// The index of an unfiltered link is still cached and reused
		const plain = 'SELECT u1.a FROM u1, u2 WHERE u1.a = u2.a ORDER BY u1.a';
		assert.deepStrictEqual(alasql(plain), [{a: 1}, {a: 2}]);
		assert.ok(
			Object.keys(alasql.tables.u2.indices || {}).length > 0,
			'the unfiltered index is cached'
		);
	});

	it('I) a condition between two columns of one table is a filter on it', function () {
		const compiled = alasql.compile('SELECT a1 FROM t1, t2 WHERE t1.a1 = t1.b1 AND t1.a1 = t2.a2');
		assert.ok(
			compiled.query.sources[0].srcwherefns.includes("p['t1']['b1']"),
			't1.a1 = t1.b1 filters t1'
		);
		assert.equal(compiled.query.sources[1].optimization, 'ix', 't1.a1 = t2.a2 is the link');
	});
});
