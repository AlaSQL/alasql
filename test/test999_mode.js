if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test MODE aggregate function', function () {
	it('1. Basic numbers mode', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 1}, {a: 2}, {a: 2}, {a: 3}]]);
		assert.deepStrictEqual(res, [{m: 2}]);
	});

	it('2. Mode with tie breaking (smallest value)', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: 3}, {a: 1}, {a: 3}, {a: 1}]]);
		assert.deepStrictEqual(res, [{m: 1}]);
	});

	it('3. Mode with strings', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [
			[{a: 'apple'}, {a: 'banana'}, {a: 'apple'}, {a: 'orange'}],
		]);
		assert.deepStrictEqual(res, [{m: 'apple'}]);
	});

	it('4. Mode ignores NULL and undefined values', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[{a: null}, {a: 5}, {a: undefined}, {a: 5}]]);
		assert.deepStrictEqual(res, [{m: 5}]);
	});

	it('5. Mode with GROUP BY', function () {
		var data = [
			{g: 1, v: 10},
			{g: 1, v: 20},
			{g: 1, v: 20},
			{g: 2, v: 30},
			{g: 2, v: 30},
			{g: 2, v: 40},
		];
		var res = alasql('SELECT g, MODE(v) AS m FROM ? GROUP BY g ORDER BY g', [data]);
		assert.deepStrictEqual(res, [
			{g: 1, m: 20},
			{g: 2, m: 30},
		]);
	});

	it('6. Empty input returns undefined/null', function () {
		var res = alasql('SELECT MODE(a) AS m FROM ?', [[]]);
		assert.deepStrictEqual(res, [{m: undefined}]);
	});
});
