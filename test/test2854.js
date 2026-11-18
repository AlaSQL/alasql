if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2854'; // JOIN ... ON of views

describe(`Test ${testId} - JOIN ... ON of views`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1), (2), (3)');
		alasql('CREATE TABLE t2 (a INT)');
		alasql('INSERT INTO t2 VALUES (1), (2)');
		alasql('CREATE VIEW v3 AS SELECT a AS f1 FROM t1');
		alasql('CREATE VIEW v4 AS SELECT a AS f2 FROM t2');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Two views', function () {
		var expected = [
			{f1: 1, f2: 1},
			{f1: 2, f2: 2},
		];
		// The JOIN runs first, before anything has compiled the views
		assert.deepStrictEqual(alasql('SELECT * FROM v3 JOIN v4 ON f1 = f2'), expected);
		assert.deepStrictEqual(alasql('SELECT * FROM v3, v4 WHERE f1 = f2'), expected);
	});

	it('B) A table and a view in a LEFT JOIN', function () {
		alasql('CREATE VIEW v5 AS SELECT a AS f2 FROM t2');
		assert.deepStrictEqual(alasql('SELECT t1.a, v5.f2 FROM t1 LEFT JOIN v5 ON t1.a = v5.f2'), [
			{a: 1, f2: 1},
			{a: 2, f2: 2},
			{a: 3, f2: undefined},
		]);
	});

	it('C) The joined view reads rows inserted later', function () {
		alasql('INSERT INTO t2 VALUES (3)');
		assert.deepStrictEqual(alasql('SELECT COUNT(*) AS n FROM v3 JOIN v4 ON f1 = f2'), [{n: 3}]);
	});
});
