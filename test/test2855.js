if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2855'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - ALL / ANY / SOME subquery in HAVING`, function () {
	var db;

	before(function () {
		db = new alasql.Database();
		db.exec('CREATE TABLE t1 (a INT)');
		db.exec('INSERT INTO t1 VALUES (1), (2), (3)');
		db.exec('CREATE TABLE t2 (a INT)');
		db.exec('INSERT INTO t2 VALUES (1), (2)');
	});

	it('A) > ALL (subquery) in HAVING', function () {
		assert.deepStrictEqual(
			db.exec(
				'SELECT a, COUNT(*) AS c FROM t1 GROUP BY a HAVING COUNT(*) > ALL (SELECT COUNT(*) FROM t2 WHERE t2.a > 5)'
			),
			[
				{a: 1, c: 1},
				{a: 2, c: 1},
				{a: 3, c: 1},
			]
		);
		assert.deepStrictEqual(
			db.exec('SELECT a FROM t1 GROUP BY a HAVING a > ALL (SELECT a FROM t2)'),
			[{a: 3}]
		);
	});

	it('B) > ANY and = SOME (subquery) in HAVING', function () {
		assert.deepStrictEqual(
			db.exec('SELECT a FROM t1 GROUP BY a HAVING a > ANY (SELECT a FROM t2)'),
			[{a: 2}, {a: 3}]
		);
		assert.deepStrictEqual(
			db.exec('SELECT a FROM t1 GROUP BY a HAVING a = SOME (SELECT a FROM t2)'),
			[{a: 1}, {a: 2}]
		);
	});

	it('C) Same in WHERE still works', function () {
		assert.deepStrictEqual(db.exec('SELECT a FROM t1 WHERE a > ALL (SELECT a FROM t2)'), [{a: 3}]);
		assert.deepStrictEqual(db.exec('SELECT a FROM t1 WHERE a > ANY (SELECT a FROM t2)'), [
			{a: 2},
			{a: 3},
		]);
	});
});
