if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 323 ANY() and ALL()', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test323; USE test323');
		done();
	});

	var data = [{a: 1}, {a: 2}];
	it('2. ALL', function(done) {
		var res = alasql('SEARCH ALL(/a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]); // To be checked
		done();
	});

	it('3. ANY', function(done) {
		var res = alasql('SEARCH ANY(/a) FROM ?', [data]);
		assert.deepEqual(res, [1]); // To be checked
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test323');
		done();
	});
});
