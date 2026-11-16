if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2758'; // COUNT(DISTINCT *) counts the distinct rows

describe(`Test ${testId} - COUNT(DISTINCT *)`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (x INTEGER, y STRING)');
		alasql(
			"INSERT INTO t1 VALUES (1, 'true'), (0, 'false'), (NULL, 'NULL'), (1, 'true'), (1, 'x')"
		);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Distinct rows of a table', function () {
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n, COUNT(*) AS m FROM t1'), [
			{n: 4, m: 5},
		]);
	});

	it('B) Per group', function () {
		assert.deepStrictEqual(alasql('SELECT x, COUNT(DISTINCT *) AS n FROM t1 GROUP BY x'), [
			{x: 1, n: 2},
			{x: 0, n: 1},
			{x: undefined, n: 1},
		]);
	});

	it('C) Parameter data and COUNT(DISTINCT x) as before', function () {
		var data = [{a: 1}, {a: 2}, {a: 1}];
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM ?', [data]), [{n: 2}]);
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT x) AS n FROM t1'), [{n: 2}]);
	});

	it('D) Rows inserted with the columns in another order', function () {
		alasql('CREATE TABLE t2 (x INT, y INT)');
		alasql('INSERT INTO t2 (x, y) VALUES (1, 2)');
		alasql('INSERT INTO t2 (y, x) VALUES (2, 1)');
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM t2'), [{n: 1}]);
	});

	it('E) An explicit NULL and an omitted column', function () {
		alasql('CREATE TABLE t3 (x INT, y INT)');
		alasql('INSERT INTO t3 VALUES (1, NULL)');
		alasql('INSERT INTO t3 (x) VALUES (1)');
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM t3'), [{n: 1}]);
		var data = [{a: 1, b: null}, {a: 1}, {a: 1, b: undefined}];
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM ?', [data]), [{n: 1}]);
	});

	it('F) The row of the named table in a JOIN', function () {
		alasql('CREATE TABLE t4 (id INT, v INT)');
		alasql('CREATE TABLE t5 (id INT, w STRING)');
		alasql('INSERT INTO t4 VALUES (1, 10)');
		alasql("INSERT INTO t5 VALUES (1, 'a'), (1, 'b')");
		assert.deepStrictEqual(
			alasql(
				'SELECT COUNT(DISTINCT t4.*) AS a, COUNT(DISTINCT t5.*) AS b, COUNT(DISTINCT *) AS c FROM t4 JOIN t5 ON t4.id = t5.id'
			),
			[{a: 1, b: 2, c: 2}]
		);
	});

	it('G) BigInt and Date values', function () {
		var big = [{a: 1n}, {a: 1n}, {a: 2n}];
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM ?', [big]), [{n: 2}]);
		var dates = [{d: new Date(0)}, {d: new Date(0)}, {d: new Date(1)}];
		assert.deepStrictEqual(alasql('SELECT COUNT(DISTINCT *) AS n FROM ?', [dates]), [{n: 2}]);
	});
});
