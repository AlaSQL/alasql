if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 426;

describe('Test ' + test + ' Binary operators', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. ^', function(done) {
		var res = alasql('= 60^13');
		assert.deepEqual(res, 49);
		done();
	});

	it('2. ~', function(done) {
		var res = alasql('= ~60');
		assert(res == -61);
		done();
	});

	it('3. POWER', function(done) {
		var res = alasql('= POWER(2,3)');
		assert(res == 8);
		done();
	});

	it('4. EXP', function(done) {
		var res = alasql('= EXP(1)');
		assert(res == 2.718281828459045);
		done();
	});
});
