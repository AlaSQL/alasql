if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2745'; // EXCEPT and INTERSECT with SELECT * on parameter arrays

describe(`Test ${testId} - EXCEPT and INTERSECT with SELECT * on parameter arrays`, function () {
	const a = [{id: 1}, {id: 2}, {id: 3}];
	const b = [{id: 2}, {id: 3}, {id: 4}];

	it('A) EXCEPT', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM ? EXCEPT SELECT * FROM ?', [a, b]), [{id: 1}]);
	});

	it('B) INTERSECT', function () {
		assert.deepStrictEqual(alasql('SELECT * FROM ? INTERSECT SELECT * FROM ?', [a, b]), [
			{id: 2},
			{id: 3},
		]);
	});

	it('C) Several columns', function () {
		const c = [
			{id: 1, v: 'x'},
			{id: 2, v: 'y'},
		];
		const d = [
			{id: 1, v: 'x'},
			{id: 2, v: 'z'},
		];
		assert.deepStrictEqual(alasql('SELECT * FROM ? EXCEPT SELECT * FROM ?', [c, d]), [
			{id: 2, v: 'y'},
		]);
		assert.deepStrictEqual(alasql('SELECT * FROM ? INTERSECT SELECT * FROM ?', [c, d]), [
			{id: 1, v: 'x'},
		]);
	});

	it('D) Named columns match by position as before', function () {
		const e = [{x: 2}, {x: 9}];
		assert.deepStrictEqual(alasql('SELECT id FROM ? EXCEPT SELECT x FROM ?', [a, e]), [
			{id: 1},
			{id: 3},
		]);
		assert.deepStrictEqual(alasql('SELECT id FROM ? INTERSECT SELECT x FROM ?', [a, e]), [{id: 2}]);
	});
});
