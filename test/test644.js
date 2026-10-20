if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '644'; // GROUP BY CUBE / GROUPING SETS merged groups from different grouping sets

describe(`Test ${testId} - CUBE and GROUPING SETS keep grouping sets apart`, function () {
	// GROUP BY does not define the order of the groups, so compare them sorted
	const sorted = rows =>
		rows.slice().sort((x, y) => (JSON.stringify(x) < JSON.stringify(y) ? -1 : 1));
	const sameRows = (actual, expected) => assert.deepStrictEqual(sorted(actual), sorted(expected));

	const data = [
		{a: 2, b: 2, v: 15},
		{a: 2, b: 4, v: 20},
	];

	it('A) CUBE(a, b) from the issue', function () {
		const res = alasql('SELECT a, b, SUM(v) AS s FROM ? GROUP BY CUBE(a, b)', [data]);
		sameRows(res, [
			{a: null, b: null, s: 35},
			{a: 2, b: null, s: 35},
			{a: null, b: 2, s: 15},
			{a: 2, b: 2, s: 15},
			{a: null, b: 4, s: 20},
			{a: 2, b: 4, s: 20},
		]);
	});

	it('B) GROUPING SETS(a, b) with overlapping values', function () {
		const res = alasql('SELECT a, b, SUM(v) AS s FROM ? GROUP BY GROUPING SETS(a, b)', [data]);
		sameRows(res, [
			{a: 2, b: null, s: 35},
			{a: null, b: 2, s: 15},
			{a: null, b: 4, s: 20},
		]);
	});

	it('C) CUBE with COUNT over several rows', function () {
		const rows = [
			{x: 'p', y: 'p'},
			{x: 'p', y: 'q'},
			{x: 'q', y: 'p'},
		];
		const res = alasql('SELECT x, y, COUNT(*) AS c FROM ? GROUP BY CUBE(x, y)', [rows]);
		sameRows(res, [
			{x: null, y: null, c: 3},
			{x: 'p', y: null, c: 2},
			{x: null, y: 'p', c: 2},
			{x: 'p', y: 'p', c: 1},
			{x: null, y: 'q', c: 1},
			{x: 'p', y: 'q', c: 1},
			{x: 'q', y: null, c: 1},
			{x: 'q', y: 'p', c: 1},
		]);
	});

	it('D) ROLLUP and plain GROUP BY are unchanged', function () {
		sameRows(alasql('SELECT a, b, SUM(v) AS s FROM ? GROUP BY ROLLUP(a, b)', [data]), [
			{a: null, b: null, s: 35},
			{a: 2, b: null, s: 35},
			{a: 2, b: 2, s: 15},
			{a: 2, b: 4, s: 20},
		]);
		assert.deepStrictEqual(alasql('SELECT a, b, SUM(v) AS s FROM ? GROUP BY a, b', [data]), [
			{a: 2, b: 2, s: 15},
			{a: 2, b: 4, s: 20},
		]);
	});
});
