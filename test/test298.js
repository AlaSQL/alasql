if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 298 PLUG-IN TEST', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test298;USE test298');
		done();
	});

	it('2.REQURE ECHO plugin', function(done) {
		assert.throws(function() {
			var res = alasql('ECHO 1');
			//      console.log(1,res);
		}, Error);

		var res = alasql('REQUIRE ECHO');
		assert.deepEqual(res, 1);
		var res = alasql('ECHO 10');
		assert.deepEqual(res, 10);
		//      console.log(2,res);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test298');
		done();
	});
});
