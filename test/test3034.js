if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3034'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - alias of a JSON array in FROM`, function () {
	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) a column qualified with the alias', function () {
		assert.deepStrictEqual(alasql('SELECT v.a, b FROM @[{a:1,b:2},{a:3,b:4}] AS v WHERE a > 1'), [
			{a: 3, b: 4},
		]);
	});

	it('B) alias without AS', function () {
		assert.deepStrictEqual(alasql('SELECT v.a FROM @[{a:1}] v'), [{a: 1}]);
	});

	it('C) without an alias', function () {
		assert.deepStrictEqual(alasql('SELECT a FROM @[{a:1}]'), [{a: 1}]);
	});
});
