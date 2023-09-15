if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '1666';

describe('Test ' + test + ' - inner functions for SUM, MIN and MAX', function () {
	it('SUM with Round function', function () {
		var data = [
			{
				a: null,
				b: 9.45,
				c: true,
				c2: 1.39,
				d: null,
				e: 'XYZ1',
				f: new Number(2),
			},
			{
				a: null,
				b: 1.13,
				c: false,
				c2: false,
				d: 5.15,
				e: 'XYZ2',
				f: new Number(11.25),
			},
		];
		res = alasql(
			`SELECT SUM(ROUND(a))  AS a,
					sum(ROUND(b))  as b,
					sUm(c)         as c,
					sUm(ROUND(c2)) as c2,
					SuM(ROUND(d))  as d,
					SUM(ROUND(e))  as e,
					SUM(ROUND(f))  as f
			 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: null,
				b: 10,
				c: null,
				c2: 1,
				d: 5,
				e: null,
				f: 13,
			},
		]);

		var data = [[{a: null}]];
		res = alasql(
			`SELECT SUM(a) AS a
					  FROM ?`,
			data
		);
		assert.deepEqual(res, [{a: null}]);

		var data = [[{a: 2}]];
		res = alasql(
			`SELECT SUM(a) AS a
					  FROM ?`,
			data
		);
		assert.deepEqual(res, [{a: 2}]);
	});

	it('MAX/MIN/SUM with Round or Ceil function', function () {
		var data = [{a: 10.25}, {a: null}, {b: 10}, {a: 5.25}, {a: 33.45}];
		res = alasql(
			`SELECT MIN(ROUND(a)) AS a,
					MAX(ROUND(a)) AS b,
					MIN(a)        AS c,
					MAX(a)        AS d,
					MIN(CEIL(a))  AS e,
					MAX(CEIL(a))  AS f,
					SUM(ROUND(a)) AS g,
					SUM(CEIL(a))  AS h
			 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: 5,
				b: 33,
				c: 5.25,
				d: 33.45,
				e: 6,
				f: 34,
				g: 48,
				h: 51,
			},
		]);
	});

	it('MAX/MIN for Dates', function () {
		var data = [
			{a: new Date(2023, 6, 6, 0, 0, 0)},
			{a: new Date(2023, 6, 15, 0, 0, 0)},
			{a: null},
			{a: undefined},
			{a: new Date(2023, 7, 7, 0, 0, 0)},
		];
		res = alasql(
			`SELECT
					MIN(a)        AS c,
					MAX(a)        AS d
				 FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				c: new Date(2023, 6, 6, 0, 0, 0),
				d: new Date(2023, 7, 7, 0, 0, 0),
			},
		]);
	});
});
