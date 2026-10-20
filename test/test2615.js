if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2615'; // Built-in functions read an unqualified column from the first table in a JOIN

describe(`Test ${testId} - built-in functions with a column of the second table in a JOIN`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE one (a INT, b INT)');
		alasql('INSERT INTO one VALUES (1, 10), (2, 20)');
		alasql('CREATE TABLE two (a INT, w STRING, n NUMBER)');
		alasql("INSERT INTO two VALUES (1, 'x', -1.6), (2, ' yy ', 2.5)");
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) String functions on a column of the second table', function () {
		const res = alasql(
			'SELECT UPPER(w) AS u, LENGTH(w) AS l, TRIM(w) AS t FROM one t0 JOIN two t1 ON t0.a = t1.a'
		);
		assert.deepStrictEqual(res, [
			{u: 'X', l: 1, t: 'x'},
			{u: ' YY ', l: 4, t: 'yy'},
		]);
	});

	it('B) Number functions on a column of the second table', function () {
		const res = alasql(
			'SELECT ABS(n) AS a, ROUND(n) AS r, IFNULL(n, 0) AS z FROM one t0 JOIN two t1 ON t0.a = t1.a'
		);
		assert.deepStrictEqual(res, [
			{a: 1.6, r: -2, z: -1.6},
			{a: 2.5, r: 3, z: 2.5},
		]);
	});

	it('C) A column of a joined subquery, in WHERE and ORDER BY', function () {
		const res = alasql(
			`SELECT t0.a FROM one t0 JOIN (SELECT a, w FROM two) t1 ON t0.a = t1.a
				WHERE LENGTH(w) > 1 ORDER BY UPPER(w)`
		);
		assert.deepStrictEqual(res, [{a: 2}]);
	});

	it('D) Columns of both tables in one call', function () {
		const res = alasql('SELECT GREATEST(b, LENGTH(w)) AS g FROM one t0 JOIN two t1 ON t0.a = t1.a');
		assert.deepStrictEqual(res, [{g: 10}, {g: 20}]);
	});

	it('E) The first table and qualified columns are unchanged', function () {
		const res = alasql(
			'SELECT ABS(b) AS b, UPPER(t1.w) AS u FROM one t0 JOIN two t1 ON t0.a = t1.a'
		);
		assert.deepStrictEqual(res, [
			{b: 10, u: 'X'},
			{b: 20, u: ' YY '},
		]);
	});
});
