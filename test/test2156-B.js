if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2156B'; // ROUND and grouped aggregates leave no global variable behind

describe(`Test ${testId} - no global variable from ROUND or grouped aggregates`, function () {
	var data = [
		{g: 1, x: 1.26, d: new Date('2020-01-01')},
		{g: 1, x: 2.5, d: new Date('2021-01-01')},
		{g: 2, x: null, d: null},
	];

	beforeEach(function () {
		delete globalThis.__alasql_tmp;
	});

	it('A) ROUND gives the same results and sets no global', function () {
		var res = alasql(
			"SELECT ROUND(x) AS a, ROUND(x, 1) AS b, ROUND('2.46', 1) AS c, ROUND('') AS e FROM ?",
			[data]
		);
		assert.deepStrictEqual(res[0], {a: 1, b: 1.3, c: 2.5, e: undefined});
		assert.deepStrictEqual(res[2], {a: undefined, b: undefined, c: 2.5, e: undefined});
		assert.strictEqual(alasql('VALUE OF SELECT ROUND(x, ROUND(1.2)) FROM ?', [[{x: 1.26}]]), 1.3);
		assert.strictEqual(globalThis.__alasql_tmp, undefined);
	});

	it('B) MIN, MAX and SUM in groups give the same results and set no global', function () {
		var res = alasql(
			'SELECT g, MIN(d) AS mi, MAX(d) AS ma, SUM(x) AS s, MAX(x) AS mx FROM ? GROUP BY g',
			[data]
		);
		assert.strictEqual(res[0].mi.toISOString(), '2020-01-01T00:00:00.000Z');
		assert.strictEqual(res[0].ma.toISOString(), '2021-01-01T00:00:00.000Z');
		assert.strictEqual(res[0].s, 3.76);
		assert.strictEqual(res[0].mx, 2.5);
		assert.strictEqual(globalThis.__alasql_tmp, undefined);
	});
});
