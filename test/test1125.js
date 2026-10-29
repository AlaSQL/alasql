if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1125'; // Postgres DISTINCT ON keeps the first row of each group

describe(`Test ${testId} - DISTINCT ON`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE tests (id INT, dt INT, score INT)');
		alasql('INSERT INTO tests VALUES (1,1,50),(1,3,70),(1,2,60),(2,2,80),(2,1,90),(3,1,40)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Most recent score per id, ordered by a column not selected', function () {
		var res = alasql('SELECT DISTINCT ON (id) id, score FROM tests ORDER BY id, dt DESC');
		assert.deepStrictEqual(res, [
			{id: 1, score: 70},
			{id: 2, score: 80},
			{id: 3, score: 40},
		]);
	});

	it('B) Several expressions in the key', function () {
		var res = alasql(
			'SELECT DISTINCT ON (id, score > 60) id, score FROM tests ORDER BY id, score > 60, dt'
		);
		assert.deepStrictEqual(res, [
			{id: 1, score: 50},
			{id: 1, score: 70},
			{id: 2, score: 90},
			{id: 3, score: 40},
		]);
	});

	it('C) Without ORDER BY keeps the first row met, and LIMIT applies after', function () {
		var res = alasql('SELECT DISTINCT ON (id) id, dt FROM tests LIMIT 2');
		assert.deepStrictEqual(res, [
			{id: 1, dt: 1},
			{id: 2, dt: 2},
		]);
	});

	it('D) toString round trip', function () {
		var sql = alasql.parse('SELECT DISTINCT ON (id) id, score FROM tests').toString();
		assert.strictEqual(sql, 'SELECT DISTINCT ON (id) id, score FROM tests');
	});

	it('E) GROUP BY, aggregates and set operations are rejected', function () {
		[
			'SELECT DISTINCT ON (id) id, MAX(score) AS m FROM tests GROUP BY id',
			'SELECT DISTINCT ON (id) MAX(score) AS m FROM tests',
			'SELECT DISTINCT ON (id) id FROM tests UNION ALL SELECT id FROM tests',
			'SELECT DISTINCT ON (id) id FROM tests EXCEPT SELECT id FROM tests',
		].forEach(function (sql) {
			assert.throws(function () {
				alasql(sql);
			}, /DISTINCT ON is not supported/);
		});
	});

	it('F) An output alias or column number refers to the output column', function () {
		var expected = [
			{k: 1, score: 70},
			{k: 2, score: 80},
			{k: 3, score: 40},
		];
		assert.deepStrictEqual(
			alasql('SELECT DISTINCT ON (k) id AS k, score FROM tests ORDER BY k, dt DESC'),
			expected
		);
		assert.deepStrictEqual(
			alasql('SELECT DISTINCT ON (1) id AS k, score FROM tests ORDER BY k, dt DESC'),
			expected
		);
	});

	it('G) NULL keys form one group, and OFFSET applies after', function () {
		var data = [
			{id: null, v: 1},
			{id: null, v: 2},
			{id: 5, v: 3},
		];
		assert.deepStrictEqual(alasql('SELECT DISTINCT ON (id) id, v FROM ? ORDER BY v', [data]), [
			{id: null, v: 1},
			{id: 5, v: 3},
		]);
		assert.deepStrictEqual(
			alasql('SELECT DISTINCT ON (id) v FROM ? ORDER BY v LIMIT 5 OFFSET 1', [data]),
			[{v: 3}]
		);
	});
});
