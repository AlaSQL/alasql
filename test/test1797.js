if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '1797';

describe('Test ' + test + ' - select * with alias colname', function () {
	it('Join with simple subquery', function () {
		var expected = [
			{a: 1, b: 1, c: 1, d: 3},
			{a: 2, b: 1, c: 1, d: 1},
		];
		var data = [
			{a: 1, b: 1, c: 1},
			{a: 1, b: 2, c: 1},
			{a: 1, b: 3, c: 1},
			{a: 2, b: 1, c: 1},
		];
		var res = alasql(`SELECT *, COUNT(a) as d FROM ? GROUP BY a`, [data]);
		assert.deepEqual(res, expected);
	});

	it('Join with simple subquery', function () {
		var expected = [
			{a: 1, b: 1, c: 1, d: 5},
			{a: 2, b: 1, c: 1, d: 2},
		];
		var data = [
			{a: 1, b: 1, c: 1},
			{a: 1, b: 1, c: 2},
			{a: 1, b: 1, c: 3},
			{a: 1, b: 2, c: 1},
			{a: 1, b: 3, c: 1},
			{a: 2, b: 1, c: 1},
			{a: 2, b: 1, c: 2},
		];
		var res = alasql(`SELECT *, COUNT(a) as d FROM ? GROUP BY a`, [data]);
		assert.deepEqual(res, expected);
	});
});
