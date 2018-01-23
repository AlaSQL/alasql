if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 367 NOT and = predecessing', function() {
	it('NOT over =', function(done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT * FROM ? WHERE NOT a = 1', [data]);
		assert.deepEqual(res, [{a: 2}, {a: 3}]);
		done();
	});
});
