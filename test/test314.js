if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 314 SEARCH with null values', function() {
	it('1. Traverse with null', function(done) {
		var data = [{a: 1}, null];

		var res = alasql('SEARCH / a FROM ?', [data]);
		assert.deepEqual(res, [1]);
		done();
	});
});
