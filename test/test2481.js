if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2481'; // VAR / STDEV / VARP / STDEVP / STD / STDDEV and NULL values

describe(`Test ${testId} - variance aggregates skip NULL values`, function () {
	const sql =
		'SELECT VAR(a) AS v, STDEV(a) AS s, VARP(a) AS vp, STDEVP(a) AS sp, STD(a) AS sd, STDDEV(a) AS sdd FROM ?';
	const clean = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
	const expected = alasql(sql, [clean]);

	it('A) Results for values without NULL', function () {
		assert.deepStrictEqual(expected, [
			{
				v: 5 / 3,
				s: Math.sqrt(5 / 3),
				vp: 1.25,
				sp: Math.sqrt(1.25),
				sd: Math.sqrt(1.25),
				sdd: Math.sqrt(1.25),
			},
		]);
	});

	it('B) NULL values are skipped', function () {
		assert.deepStrictEqual(alasql(sql, [[...clean, {a: null}]]), expected);
		assert.deepStrictEqual(alasql(sql, [[{a: null}, ...clean]]), expected);
	});

	it('C) Missing values are skipped', function () {
		assert.deepStrictEqual(alasql(sql, [[...clean, {}]]), expected);
		assert.deepStrictEqual(alasql(sql, [[{}, ...clean]]), expected);
	});

	it('D) Only NULL values give NULL (undefined)', function () {
		assert.deepStrictEqual(alasql(sql, [[{a: null}, {}]]), [
			{v: undefined, s: undefined, vp: undefined, sp: undefined, sd: undefined, sdd: undefined},
		]);
	});

	it('E) A single value: sample variance is NULL, population variance is 0', function () {
		assert.deepStrictEqual(alasql(sql, [[{a: 5}, {a: null}]]), [
			{v: undefined, s: undefined, vp: 0, sp: 0, sd: 0, sdd: 0},
		]);
	});

	it('F) Per group', function () {
		const res = alasql('SELECT g, VARP(a) AS vp, VAR(a) AS v FROM ? GROUP BY g', [
			[{g: 1, a: 2}, {g: 1, a: 4}, {g: 1}, {g: 2, a: null}],
		]);
		assert.deepStrictEqual(res, [
			{g: 1, vp: 1, v: 2},
			{g: 2, vp: undefined, v: undefined},
		]);
	});
});
