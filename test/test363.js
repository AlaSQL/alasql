if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 363 -> with undefined', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test363;USE test363');
		done();
	});

	it('2. TEST', function(done) {
		var res = alasql('VALUE OF SELECT a->name FROM ?', [[{a: {name: 'hello'}}]]);
		assert.deepEqual(res, 'hello');
		var res = alasql('VALUE OF SELECT a->name FROM ?', [{}]);
		assert.deepEqual(res, undefined);
		var res = alasql('VALUE OF SELECT {}->name');
		assert.deepEqual(res, undefined);
		var res = alasql('VALUE OF SELECT {amt:10}->amt');
		assert.deepEqual(res, 10);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test363');
		done();
	});
});
