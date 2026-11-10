if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2873'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - unqualified column that is NULL in the first join source`, function () {
	const A = [
		{id: 1, x: null},
		{id: 2, x: 20},
	];
	const B = [
		{id: 1, x: 100},
		{id: 2, x: 200},
	];

	it('A) WHERE x IS NULL finds the row', function () {
		assert.deepStrictEqual(
			alasql('SELECT t0.id FROM ? t0 JOIN ? t1 ON t0.id = t1.id WHERE x IS NULL', [A, B]),
			[{id: 1}]
		);
	});

	it('B) a computed column does not read the other source', function () {
		var res = alasql('SELECT t0.id, x + 0 AS v FROM ? t0 JOIN ? t1 ON t0.id = t1.id', [A, B]);
		assert.strictEqual(res.length, 2);
		assert.strictEqual(res[0].v == null, true);
		assert.strictEqual(res[1].v, 20);
	});

	it('C) a column only in the second source still resolves', function () {
		var C = [
			{id: 1, y: 7},
			{id: 2, y: 8},
		];
		assert.deepStrictEqual(
			alasql('SELECT t0.id, y + 0 AS v FROM ? t0 JOIN ? t1 ON t0.id = t1.id', [A, C]),
			[
				{id: 1, v: 7},
				{id: 2, v: 8},
			]
		);
	});

	it('D) a table row without the column does not read the other table', function () {
		alasql('CREATE DATABASE test2873; USE test2873');
		alasql('CREATE TABLE ta (id INT, x INT); CREATE TABLE tb (id INT, x INT, z INT)');
		alasql('INSERT INTO ta (id) VALUES (1)');
		alasql('INSERT INTO tb VALUES (1, 100, 5)');
		assert.deepStrictEqual(alasql('SELECT ta.id, x, z FROM ta JOIN tb ON ta.id = tb.id'), [
			{id: 1, x: undefined, z: 5},
		]);
		assert.deepStrictEqual(
			alasql('SELECT ta.id FROM ta JOIN ? t1 ON ta.id = t1.id WHERE x IS NULL', [[{id: 1, x: 7}]]),
			[{id: 1}]
		);
		alasql('USE alasql; DROP DATABASE test2873');
	});
});
