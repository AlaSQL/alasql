if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 351 CALL PROCEDURE', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test351;USE test351');
		done();
	});

	it('2. CREATE TABLE', function(done) {
		alasql.fn.myfn = function(a, b) {
			//      console.log(a,b);
			assert.deepEqual([a, b], [1, 2]);
			done();
		};
		var res = alasql('CALL myfn(1,2)');
		//    assert.deepEqual(res,1);
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test351');
		done();
	});
});
