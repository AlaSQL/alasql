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

	it('B) Orders ascending by original grouped column name with explicit ASC', function () {
		var data = [
			{num: 100, letter: 'one'},
			{num: 50, letter: 'two'},
			{num: 10, letter: 'two'},
		];

		var res = alasql(
			'SELECT num AS position, letter AS note FROM ? GROUP BY num, letter ORDER BY num ASC',
			[data]
		);

		assert.deepStrictEqual(res, [
			{position: 10, note: 'two'},
			{position: 50, note: 'two'},
			{position: 100, note: 'one'},
		]);
	});

	it('C) Orders descending by original grouped column name', function () {
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

	it('D) Orders by grouped source column that is not projected', function () {
		var data = [
			{num: 100, letter: 'one'},
			{num: 50, letter: 'two'},
			{num: 10, letter: 'three'},
		];

		var res = alasql('SELECT letter AS note FROM ? GROUP BY num, letter ORDER BY num', [data]);

		assert.deepStrictEqual(res, [{note: 'three'}, {note: 'two'}, {note: 'one'}]);
	});
});
