if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2874'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - IN and NOT IN with items that are not plain literals`, function () {
	const data = [
		{a: -1, b: 0},
		{a: 5, b: 0},
		{a: 3, b: 3},
	];

	it('A) IN with a negative number', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (-1, 5)', [data]), [{a: -1}, {a: 5}]);
	});

	it('B) IN with an expression', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (1 + 2, 5)', [data]), [
			{a: 5},
			{a: 3},
		]);
	});

	it('C) IN with a column', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (b, 5)', [data]), [{a: 5}, {a: 3}]);
	});

	it('D) NOT IN with a negative number', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a NOT IN (-1, 5)', [data]), [{a: 3}]);
	});

	it('E) NOT IN with a column', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a NOT IN (b, 5)', [data]), [{a: -1}]);
	});

	it('F) IN with plain literals still works', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (3, 5)', [data]), [{a: 5}, {a: 3}]);
	});

	it('G) A negative number keeps the cached list', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM ? WHERE a IN (-1, 3)', [data]), [{a: -1}, {a: 3}]);
		assert.ok(alasql.sets['[-1,3]'] instanceof Set);
	});
});
