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
});
