if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3180';

describe(`Test ${testId} - a subquery in a SEARCH selector`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (k INT); INSERT INTO t VALUES (1), (2), (3)');
		alasql('CREATE TABLE u (k INT); INSERT INTO u VALUES (1), (3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) WHERE with IN (SELECT ...)', function () {
		assert.deepStrictEqual(alasql('SEARCH / WHERE(k IN (SELECT k FROM u)) k FROM t'), [1, 3]);
	});

	it('B) WHERE with NOT IN (SELECT ...)', function () {
		assert.deepStrictEqual(alasql('SEARCH / WHERE(k NOT IN (SELECT k FROM u)) k FROM t'), [2]);
	});

	it('C) WHERE with a scalar subquery', function () {
		assert.deepStrictEqual(alasql('SEARCH / WHERE(k = (SELECT MIN(k) FROM u)) k FROM t'), [1]);
	});

	it('D) WHERE with EXISTS', function () {
		assert.deepStrictEqual(
			alasql('SEARCH / WHERE(EXISTS (SELECT * FROM u WHERE u.k = 3)) k FROM t'),
			[1, 2, 3]
		);
		assert.deepStrictEqual(
			alasql('SEARCH / WHERE(EXISTS (SELECT * FROM u WHERE u.k = 9)) k FROM t'),
			[]
		);
	});

	it('E) The subquery reads a parameter', function () {
		assert.deepStrictEqual(
			alasql('SEARCH / WHERE(k = (SELECT MIN(k) FROM u WHERE u.k > ?)) k FROM t', [1]),
			[3]
		);
		assert.deepStrictEqual(
			alasql('SEARCH / WHERE(k = (SELECT MIN(k) FROM u WHERE u.k > ?)) k FROM t', [0]),
			[1]
		);
	});

	it('F) EX and RETURN with a subquery', function () {
		assert.deepStrictEqual(alasql('SEARCH / EX(k + (SELECT MAX(k) FROM u)) FROM t'), [4, 5, 6]);
		assert.deepStrictEqual(alasql('SEARCH / RETURN(k, (SELECT COUNT(*) FROM u) AS n) FROM t'), [
			{k: 1, n: 2},
			{k: 2, n: 2},
			{k: 3, n: 2},
		]);
	});

	it('G) Two subqueries in the same SEARCH keep their own list', function () {
		assert.deepStrictEqual(
			alasql('SEARCH / WHERE(k IN (SELECT k FROM u) AND k > (SELECT MIN(k) FROM u)) k FROM t'),
			[3]
		);
	});

	it('H) A SEARCH without a subquery is unchanged', function () {
		assert.deepStrictEqual(alasql('SEARCH / WHERE(k = 2) k FROM t'), [2]);
	});
});
