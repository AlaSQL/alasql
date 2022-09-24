if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 342 Expression Statement', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test342;USE test342');
		done();
	});

	it('2. Expression', function(done) {
		var res = alasql('=2*2');
		assert.deepEqual(res, 4);
		done();
	});

	it('3. Expression with SELECT', function(done) {
		var res = alasql('=2*(SELECT VALUE 2)');
		assert.deepEqual(res, 4);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test342');
		done();
	});
});
