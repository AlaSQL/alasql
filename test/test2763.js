if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2763 - AVG over text', function () {
	var sql = 'SELECT AVG(y) AS a FROM ?';

	it('A) text is left out of the sum and the count', function () {
		assert.deepEqual(alasql(sql, [[{y: '12'}, {y: 3}]]), [{a: 3}]);
		assert.deepEqual(alasql(sql, [[{y: 3}, {y: '12'}]]), [{a: 3}]);
	});

	it('B) only text gives no value', function () {
		assert.strictEqual(alasql(sql, [[{y: '12'}, {y: '3'}]])[0].a, undefined);
	});

	it('C) text in a group', function () {
		var data = [
			{g: 1, y: 2},
			{g: 1, y: 'x'},
			{g: 2, y: 5},
		];
		assert.deepEqual(alasql('SELECT g, AVG(y) AS a FROM ? GROUP BY g', [data]), [
			{g: 1, a: 2},
			{g: 2, a: 5},
		]);
	});

	it('D) numbers, NULL and BigInt still work', function () {
		assert.deepEqual(alasql(sql, [[{y: 1}, {y: 2}, {y: 6}]]), [{a: 3}]);
		assert.deepEqual(alasql(sql, [[{y: 1}, {y: 2}, {y: null}]]), [{a: 1.5}]);
		assert.strictEqual(alasql(sql, [[{y: 10n}, {y: 20n}]])[0].a, 15n);
	});
});
