if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2925'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - Subquery in HAVING refers to a grouped column of the outer query`, function () {
	var db;

	before(function () {
		db = new alasql.Database();
		db.exec('CREATE TABLE t1 (a INT, b INT)');
		db.exec('INSERT INTO t1 VALUES (1,1),(1,2),(2,5),(3,1)');
		db.exec('CREATE TABLE t2 (a INT, n INT)');
		db.exec('INSERT INTO t2 VALUES (1,2),(2,9),(3,1)');
	});

	it('A) IN and NOT IN (correlated subquery) in HAVING', function () {
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING COUNT(*) IN (SELECT n FROM t2 WHERE t2.a = t1.a)'
			),
			[
				{a: 1, c: 2},
				{a: 3, c: 1},
			]
		);
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING COUNT(*) NOT IN (SELECT n FROM t2 WHERE t2.a = t1.a)'
			),
			[{a: 2, c: 1}]
		);
	});

	it('B) ALL / ANY (correlated subquery) in HAVING', function () {
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING COUNT(*) < ALL (SELECT n FROM t2 WHERE t2.a = t1.a)'
			),
			[{a: 2, c: 1}]
		);
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING COUNT(*) = ANY (SELECT n FROM t2 WHERE t2.a = t1.a)'
			),
			[
				{a: 1, c: 2},
				{a: 3, c: 1},
			]
		);
	});

	it('C) EXISTS (correlated subquery) in HAVING', function () {
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING EXISTS (SELECT 1 FROM t2 WHERE t2.a = t1.a AND t2.n = 1)'
			),
			[{a: 3, c: 1}]
		);
	});

	it('D) Same reference in WHERE still works', function () {
		assert.deepStrictEqual(
			db.exec('SELECT a FROM t1 WHERE b IN (SELECT n FROM t2 WHERE t2.a = t1.a)'),
			[{a: 1}, {a: 3}]
		);
		assert.deepStrictEqual(
			db.exec('SELECT a, b FROM t1 WHERE b < ALL (SELECT n FROM t2 WHERE t2.a = t1.a)'),
			[
				{a: 1, b: 1},
				{a: 2, b: 5},
			]
		);
	});
});
