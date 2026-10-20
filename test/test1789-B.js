if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1789B'; // A subquery in JOIN that reads a file

describe(`Test ${testId} - subquery in JOIN that reads a file`, function () {
	var file = __dirname + '/test1919.jsonl';
	var data = [
		{a: 'foo', n: 1},
		{a: 'bar', n: 2},
	];
	var expected = [
		{a: 'foo', n: 1, b: 5},
		{a: 'bar', n: 2, b: 8},
	];

	it('A) JOIN (SELECT ... FROM JSONL(file))', async function () {
		var res = await alasql.promise(
			`SELECT t.a, t.n, f.b FROM ? t JOIN (SELECT a, b FROM JSONL("${file}")) f ON t.a = f.a`,
			[data]
		);
		assert.deepStrictEqual(res, expected);
	});

	it('B) The same subquery in FROM gives the same rows', async function () {
		var res = await alasql.promise(
			`SELECT t.a, t.n, f.b FROM (SELECT a, b FROM JSONL("${file}")) f JOIN ? t ON t.a = f.a`,
			[data]
		);
		assert.deepStrictEqual(res, expected);
	});

	it('C) LEFT JOIN on a subquery over data, run twice', function () {
		var sql = 'SELECT t.a, s.c FROM ? t LEFT JOIN (SELECT a, n * 10 AS c FROM ?) s ON t.a = s.a';
		var other = [{a: 'foo', n: 3}];
		var want = [
			{a: 'foo', c: 30},
			{a: 'bar', c: undefined},
		];
		assert.deepStrictEqual(alasql(sql, [data, other]), want);
		assert.deepStrictEqual(alasql(sql, [data, other]), want);
	});
});
