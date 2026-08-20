if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2515 - ORDER BY original grouped column with selected alias', function () {
	it('A) Orders ascending by original grouped column name', function () {
		var data = [
			{num: 100, letter: 'one'},
			{num: 50, letter: 'two'},
			{num: 10, letter: 'two'},
		];

		var res = alasql(
			'SELECT num AS position, letter AS note FROM ? GROUP BY num, letter ORDER BY num',
			[data]
		);

		assert.deepStrictEqual(res, [
			{position: 10, note: 'two'},
			{position: 50, note: 'two'},
			{position: 100, note: 'one'},
		]);
	});

	it('B) Orders descending by original grouped column name', function () {
		var data = [
			{num: 100, letter: 'one'},
			{num: 50, letter: 'two'},
			{num: 10, letter: 'two'},
		];

		var res = alasql(
			'SELECT num AS position, letter AS note FROM ? GROUP BY num, letter ORDER BY num DESC',
			[data]
		);

		assert.deepStrictEqual(res, [
			{position: 100, note: 'one'},
			{position: 50, note: 'two'},
			{position: 10, note: 'two'},
		]);
	});
});
