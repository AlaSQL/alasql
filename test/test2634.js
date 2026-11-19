if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2634';

describe(`Test ${testId} - REPLACE with an empty pattern`, function () {
	it('A) Leaves the target unchanged for an empty pattern', function () {
		assert.deepStrictEqual(alasql("SELECT REPLACE('abc', '', 'x') AS result"), [{result: 'abc'}]);
	});

	it('B) Still replaces a matching non-empty pattern', function () {
		assert.deepStrictEqual(alasql("SELECT REPLACE('abc', 'b', 'x') AS result"), [{result: 'axc'}]);
	});
});
