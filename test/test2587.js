if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2587 - statement cache with colliding SQL hashes', function () {
	it('A) returns the result of each query when their hashes collide', function () {
		assert.strictEqual(
			alasql.utils.hash('SELECT 369825 AS a|joinstar:overwrite'),
			alasql.utils.hash('SELECT 1025164 AS a|joinstar:overwrite')
		);
		assert.deepStrictEqual(alasql('SELECT 369825 AS a'), [{a: 369825}]);
		assert.deepStrictEqual(alasql('SELECT 1025164 AS a'), [{a: 1025164}]);
	});
});
