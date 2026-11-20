if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2881'; // WITH RECURSIVE ... UNION keeps values of different types apart

describe(`Test ${testId} - recursive CTE with UNION compares values by type`, function () {
	const sql =
		'WITH RECURSIVE r(n) AS (SELECT n FROM ? UNION SELECT n FROM r WHERE 1 = 0) SELECT COUNT(*) AS c FROM r';

	it('A) BigInt values do not throw', function () {
		const res = alasql(sql, [[{n: 1n}, {n: 2n}]]);
		assert.deepStrictEqual(res, [{c: 2}]);
	});

	it('B) NaN and NULL are different rows', function () {
		const res = alasql(sql, [[{n: NaN}, {n: null}]]);
		assert.deepStrictEqual(res, [{c: 2}]);
	});

	it('C) A Date and its ISO string are different rows', function () {
		const res = alasql(sql, [
			[{n: new Date('2020-01-01T00:00:00.000Z')}, {n: '2020-01-01T00:00:00.000Z'}],
		]);
		assert.deepStrictEqual(res, [{c: 2}]);
	});

	it('D) Equal values are still added only once', function () {
		const res = alasql(sql, [
			[{n: 5}, {n: 5}, {n: null}, {n: undefined}, {n: new Date(0)}, {n: new Date(0)}],
		]);
		assert.deepStrictEqual(res, [{c: 3}]);
	});

	it('E) Equal BigInt and NaN values are added only once', function () {
		const res = alasql(sql, [[{n: 1n}, {n: 1n}, {n: NaN}, {n: NaN}]]);
		assert.deepStrictEqual(res, [{c: 2}]);
	});

	it('F) A step that finds only rows already in the result ends the recursion', function () {
		const data = [{n: 1n}, {n: NaN}, {n: new Date(0)}];
		const res = alasql(
			'WITH RECURSIVE r(n) AS (SELECT n FROM ? UNION SELECT n FROM r) SELECT n FROM r',
			[data]
		);
		assert.deepStrictEqual(res, data);
	});

	it('G) A boxed string is the same value as the plain string', function () {
		const res = alasql(sql, [[{n: 'a'}, {n: new String('a')}]]);
		assert.deepStrictEqual(res, [{c: 1}]);
	});
});
