if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3178'; // A correlation in the HAVING of a subquery

describe(`Test ${testId} - HAVING reads the row of the SELECT around it`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (k INT, g INT); INSERT INTO t VALUES (1, 1), (2, 1), (3, 2)');
		alasql('CREATE TABLE p (k INT); INSERT INTO p VALUES (1), (2), (3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) EXISTS', function () {
		let res = alasql(
			'SELECT p.k FROM p WHERE EXISTS (SELECT t.g FROM t GROUP BY t.g HAVING t.g = p.k)'
		);
		assert.deepStrictEqual(res, [{k: 1}, {k: 2}]);
	});

	it('B) IN', function () {
		let res = alasql(
			'SELECT p.k FROM p WHERE p.k IN (SELECT t.g FROM t GROUP BY t.g HAVING t.g = p.k)'
		);
		assert.deepStrictEqual(res, [{k: 1}, {k: 2}]);
	});

	it('C) Scalar subquery that compares an aggregate with the outer column', function () {
		let res = alasql(
			'SELECT p.k, (SELECT t.g FROM t GROUP BY t.g HAVING COUNT(*) = p.k) AS g FROM p'
		);
		assert.deepStrictEqual(res, [
			{k: 1, g: 2},
			{k: 2, g: 1},
			{k: 3, g: undefined},
		]);
	});

	it('D) A table name in HAVING still reads a source that has an alias', function () {
		let res = alasql('SELECT x.g FROM t AS x GROUP BY x.g HAVING t.g = 2');
		assert.deepStrictEqual(res, [{g: 2}]);
	});
});
