if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2878'; // A source column wins over a SELECT alias of the same name in HAVING

describe(`Test ${testId} - HAVING reads a source column before a SELECT alias of the same name`, function () {
	var data = [
		{a: 1, cnt: 0},
		{a: 1, cnt: 0},
		{a: 2, cnt: 5},
	];

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t (a INT, cnt INT)');
		alasql('CREATE TABLE loose');
		alasql.tables.t.data = data.slice();
		alasql.tables.loose.data = data.slice();
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) A subquery as the source', function () {
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS cnt FROM (SELECT a, cnt FROM ?) s GROUP BY a HAVING cnt > 1', [
				data,
			]),
			[{a: 2, cnt: 1}]
		);
	});

	it('B) FROM ? as the source', function () {
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS cnt FROM ? GROUP BY a HAVING cnt > 1', [data]),
			[{a: 2, cnt: 1}]
		);
	});

	it('C) A table without column definitions', function () {
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS cnt FROM loose GROUP BY a HAVING cnt > 1'),
			[{a: 2, cnt: 1}]
		);
	});

	it('D) A table with column definitions', function () {
		assert.deepStrictEqual(alasql('SELECT a, COUNT(*) AS cnt FROM t GROUP BY a HAVING cnt > 1'), [
			{a: 2, cnt: 1},
		]);
	});

	it('E) A joined source', function () {
		assert.deepStrictEqual(
			alasql(
				'SELECT t.a, COUNT(*) AS cnt FROM t JOIN ? AS d ON d.id = t.a GROUP BY t.a HAVING cnt > 1',
				[[{id: 1}, {id: 2}]]
			),
			[{a: 2, cnt: 1}]
		);
		assert.deepStrictEqual(
			alasql(
				'SELECT t.a, COUNT(*) AS n FROM t JOIN ? AS d ON d.id = t.a GROUP BY t.a HAVING n > 1',
				[
					[
						{id: 1, n: 0},
						{id: 2, n: 5},
					],
				]
			),
			[{a: 2, n: 1}]
		);
	});

	it('F) The alias is still read when no source has a column of that name', function () {
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS n FROM (SELECT a, cnt FROM ?) s GROUP BY a HAVING n > 1', [
				data,
			]),
			[{a: 1, n: 2}]
		);
		assert.deepStrictEqual(
			alasql('SELECT a, COUNT(*) AS n FROM ? GROUP BY a HAVING n > 1', [data]),
			[{a: 1, n: 2}]
		);
		assert.deepStrictEqual(alasql('SELECT a, COUNT(*) AS n FROM loose GROUP BY a HAVING n > 1'), [
			{a: 1, n: 2},
		]);
	});

	it('G) A compiled statement decides for the data of each run', function () {
		var compiled = alasql.compile('SELECT a, COUNT(*) AS cnt FROM ? GROUP BY a HAVING cnt > 1');
		assert.deepStrictEqual(compiled([data]), [{a: 2, cnt: 1}]);
		assert.deepStrictEqual(compiled([[{a: 1}, {a: 1}, {a: 2}]]), [{a: 1, cnt: 2}]);
		assert.deepStrictEqual(compiled([data]), [{a: 2, cnt: 1}]);
	});
});
