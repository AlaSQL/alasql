if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2967'; // Aggregate MIN and MAX skip a 0 when only NULLs come before it

describe(`Test ${testId} - MIN and MAX keep a 0 that follows NULLs`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) A 0 after a NULL in a parameter array', function () {
		const res = alasql('SELECT MAX(v) AS mx, MIN(v) AS mn FROM ?', [[{v: null}, {v: 0}, {v: -5}]]);
		assert.deepStrictEqual(res, [{mx: 0, mn: -5}]);
	});

	it('B) A 0 after a NULL in a table', function () {
		alasql('CREATE TABLE w (a INTEGER)');
		alasql('INSERT INTO w VALUES (NULL), (0)');
		const res = alasql('SELECT MIN(a) AS m, MAX(a) AS x FROM w');
		assert.deepStrictEqual(res, [{m: 0, x: 0}]);
	});

	it('C) A 0 after a NULL in each group', function () {
		const data = [
			{g: 1, v: null},
			{g: 1, v: 0},
			{g: 1, v: 3},
			{g: 2, v: null},
			{g: 2, v: 0},
			{g: 2, v: -3},
		];
		const res = alasql('SELECT g, MIN(v) AS mn, MAX(v) AS mx FROM ? GROUP BY g', [data]);
		assert.deepStrictEqual(res, [
			{g: 1, mn: 0, mx: 3},
			{g: 2, mn: -3, mx: 0},
		]);
	});

	it('D) A 0 from a function after a NULL', function () {
		const data = [{v: null}, {v: 0}, {v: -5}];
		const res = alasql('SELECT MAX(ABS(v)) AS mx, MIN(ABS(v)) AS mn FROM ?', [data]);
		assert.deepStrictEqual(res, [{mx: 5, mn: 0}]);
	});

	it('E) A BigInt 0 after a NULL', function () {
		const res = alasql('SELECT MAX(v) AS mx, MIN(v) AS mn FROM ?', [
			[{v: null}, {v: 0n}, {v: -5n}],
		]);
		assert.deepStrictEqual(res, [{mx: 0n, mn: -5n}]);
	});

	it('F) Only NULLs, and no NULLs, are unchanged', function () {
		assert.deepStrictEqual(
			alasql('SELECT MAX(v) AS mx, MIN(v) AS mn FROM ?', [[{v: null}, {v: null}]]),
			[{mx: undefined, mn: undefined}]
		);
		assert.deepStrictEqual(
			alasql('SELECT MAX(v) AS mx, MIN(v) AS mn FROM ?', [[{v: 0}, {v: 2}, {v: -1}]]),
			[{mx: 2, mn: -1}]
		);
	});
});

describe(`Test ${testId} - RIGHT and OUTER JOIN compare a Number or String object by its own value`, function () {
	const a = [{k: 1}, {k: 2}];
	const b = [{k: new Number(1), v: 'one'}];

	it('A) RIGHT JOIN with a Number object', function () {
		const res = alasql('SELECT a.k, b.v FROM ? a RIGHT JOIN ? b ON a.k = b.k', [a, b]);
		assert.deepStrictEqual(res, [{k: 1, v: 'one'}]);
	});

	it('B) OUTER JOIN with a Number object', function () {
		const res = alasql('SELECT a.k, b.v FROM ? a OUTER JOIN ? b ON a.k = b.k', [a, b]);
		// In the full suite the missing v comes back as a key set to undefined, so compare values only
		assert.deepStrictEqual(
			res.map(r => [r.k, r.v]),
			[
				[1, 'one'],
				[2, undefined],
			]
		);
	});

	it('C) RIGHT JOIN with a String object', function () {
		const res = alasql('SELECT a.k, b.v FROM ? a RIGHT JOIN ? b ON a.k = b.k', [
			[{k: 'x'}, {k: 'y'}],
			[{k: new String('x'), v: 'ex'}],
		]);
		assert.deepStrictEqual(res, [{k: 'x', v: 'ex'}]);
	});
});
