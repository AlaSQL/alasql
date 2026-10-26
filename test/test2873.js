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
});
