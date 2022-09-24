if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 290 FROM Json', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test290;USE test290');
		done();
	});

	it.skip('2. SELECT', function(done) {
		var res = alasql('SELECT VALUE @[1,2,3,(b+4)] FROM @[{b:100}]');
		//    console.log(res);
		assert.deepEqual(res, [1, 2, 3, 104]);
		done();
	});

	it.skip('3. JOINed source', function(done) {
		var res = alasql(
			'SELECT * FROM @[{a:1,b:10},{a:2,b:20}] \
      JOIN @[{b:10,c:100},{b:20,c:200},{b:30,c:300},] ON b'
		);
		console.log(res);
		assert.deepEqual(res, [1, 2, 3, 104]);
		done();
	});

	// TODO: Add other operators

	it.skip('3. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test290');
		done();
	});
});
