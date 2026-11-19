if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2841'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - WITH with a column list`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('create table one (x int, y string)');
		alasql("insert into one values (1, 'a'), (2, 'b')");
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Renames the column of a single column CTE', function () {
		let res = alasql('WITH t(a) AS (SELECT 1 AS x) SELECT a FROM t');
		assert.deepStrictEqual(res, [{a: 1}]);
	});

	it('B) Renames the columns by position', function () {
		let res = alasql('WITH t(p, q) AS (SELECT y, x FROM one) SELECT * FROM t ORDER BY q');
		assert.deepStrictEqual(res, [
			{p: 'a', q: 1},
			{p: 'b', q: 2},
		]);
	});

	it('C) Renames the columns of SELECT * and of an expression', function () {
		let res = alasql(
			'WITH t(p, q) AS (SELECT * FROM one), u(n) AS (SELECT p + 1 FROM t) SELECT * FROM u ORDER BY n'
		);
		assert.deepStrictEqual(res, [{n: 2}, {n: 3}]);
	});

	it('D) Works with an empty CTE', function () {
		let res = alasql('WITH t(a) AS (SELECT x FROM one WHERE x > 5) SELECT a FROM t');
		assert.deepStrictEqual(res, []);
	});

	it('E) Works with a recursive CTE that is not a UNION', function () {
		let res = alasql('WITH RECURSIVE t(a) AS (SELECT x FROM one) SELECT a FROM t ORDER BY a');
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
	});

	it('F) Works with a callback', function (done) {
		alasql('WITH t(a) AS (SELECT x FROM one) SELECT a FROM t ORDER BY a', function (res) {
			assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
			done();
		});
	});
});
