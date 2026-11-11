if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe("Test 2872 - bit-value literals b'101'", function () {
	it('A) b and B prefix', function () {
		assert.deepEqual(alasql("SELECT b'101' + 0 AS a, B'11' AS c"), [{a: 5, c: 3}]);
	});

	it('B) a column named b with a string alias after a space is unchanged', function () {
		assert.deepEqual(alasql("SELECT b '101' FROM ?", [[{b: 7}]]), [{101: 7}]);
	});
});
