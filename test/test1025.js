if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1025';

describe(`Test ${testId} - nested scalar subqueries`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Two-level scalar subquery', function () {
		var res = alasql('SELECT (SELECT 1 AS b) AS a');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('B) Three-level scalar subquery (issue #1025)', function () {
		var res = alasql('SELECT (SELECT (SELECT 1 AS c) AS b) AS a');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('C) Four-level scalar subquery', function () {
		var res = alasql('SELECT (SELECT (SELECT (SELECT 1 AS d) AS c) AS b) AS a');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('D) Nested scalar subquery with expression', function () {
		var res = alasql('SELECT (SELECT (SELECT 1 + 2 AS c) AS b) AS a');
		assert.deepStrictEqual(res, [{a: 3}]);
	});

	it('E) Nested scalar subquery inside derived table', function () {
		var res = alasql('SELECT * FROM (SELECT (SELECT (SELECT 1 AS c) AS b) AS a) t');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('F) Nested scalar subquery mixed with FROM subquery', function () {
		var res = alasql('SELECT (SELECT a FROM (SELECT (SELECT 1 AS c) AS a) t) AS x');
		assert.deepStrictEqual(res, [{x: 1}]);
	});

	it('G) Nested scalar subquery alongside other columns', function () {
		var res = alasql('SELECT (SELECT (SELECT 1 AS c) AS b) AS a, 2 AS x');
		assert.deepStrictEqual(res, [{a: 1, x: 2}]);
	});

	it('H) Nested scalar subquery inside IN', function () {
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1), (2), (3)');
		var res = alasql('SELECT * FROM one WHERE a IN (SELECT (SELECT 2))');
		assert.deepStrictEqual(res, [{a: 2}]);
		alasql('DROP TABLE one');
	});

	it('I) Deeply nested scalar subquery inside IN', function () {
		alasql('CREATE TABLE two (a INT)');
		alasql('INSERT INTO two VALUES (1), (2), (3)');
		var res = alasql('SELECT * FROM two WHERE a IN (SELECT (SELECT (SELECT 2)))');
		assert.deepStrictEqual(res, [{a: 2}]);
		alasql('DROP TABLE two');
	});
});
