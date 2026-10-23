if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2634';

describe(`Test ${testId} - REPLACE with an empty pattern`, function () {
	it('A) Leaves the target unchanged for an empty pattern', function () {
		assert.deepStrictEqual(alasql("SELECT REPLACE('abc', '', 'x') AS result"), [{result: 'abc'}]);
	});

	it('B) Treats a NULL pattern as empty without splitting the target', function () {
		assert.deepStrictEqual(alasql("SELECT REPLACE('abc', NULL, 'x') AS result"), [{result: 'abc'}]);
	});

	it('C) Still replaces a matching non-empty pattern', function () {
		assert.deepStrictEqual(alasql("SELECT REPLACE('abc', 'b', 'x') AS result"), [{result: 'axc'}]);
	});
});
