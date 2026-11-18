if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2821 - CUBE, ROLLUP and GROUPING SETS inside GROUPING SETS', function () {
	before(function () {
		alasql('CREATE DATABASE test2821; USE test2821');
		alasql('CREATE TABLE g (a INT, b INT, c INT)');
		alasql('INSERT INTO g VALUES (1, 1, 1), (1, 2, 2)');
	});

	after(function () {
		alasql('DROP DATABASE test2821');
	});

	function sorted(res) {
		return res
			.map(function (r) {
				return JSON.stringify([r.a, r.b, r.s]);
			})
			.sort();
	}

	var expected = sorted([
		{a: 1, b: null, s: 3},
		{a: null, b: null, s: 3},
		{a: null, b: 1, s: 1},
		{a: null, b: 2, s: 2},
	]);

	it('A) CUBE inside GROUPING SETS', function () {
		var res = alasql('SELECT a, b, SUM(c) AS s FROM g GROUP BY GROUPING SETS (a, CUBE(b))');
		assert.deepEqual(sorted(res), expected);
	});

	it('B) ROLLUP inside GROUPING SETS', function () {
		var res = alasql('SELECT a, b, SUM(c) AS s FROM g GROUP BY GROUPING SETS (a, ROLLUP(b))');
		assert.deepEqual(sorted(res), expected);
	});

	it('C) GROUPING SETS inside GROUPING SETS', function () {
		var res = alasql(
			'SELECT a, b, SUM(c) AS s FROM g GROUP BY GROUPING SETS (a, GROUPING SETS (a, b))'
		);
		assert.deepEqual(
			sorted(res),
			sorted([
				{a: 1, b: null, s: 3},
				{a: 1, b: null, s: 3},
				{a: null, b: 1, s: 1},
				{a: null, b: 2, s: 2},
			])
		);
	});

	it('D) plain GROUPING SETS still works', function () {
		var res = alasql('SELECT a, b, SUM(c) AS s FROM g GROUP BY GROUPING SETS (a, b)');
		assert.deepEqual(
			sorted(res),
			sorted([
				{a: 1, b: null, s: 3},
				{a: null, b: 1, s: 1},
				{a: null, b: 2, s: 2},
			])
		);
	});
});
