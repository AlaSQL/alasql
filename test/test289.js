if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 289 SEARCH INSTANCEOF', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test289;USE test289');
		done();
	});

	it('2. SEARCH', function(done) {
		var ast = alasql.parse('SELECT SUM(x)+20 FROM one GROUP BY x');

		// { statements: [ { columns: [
		//    { left: { aggregatorid: 'SUM', expression: [Object], over: undefined },
		//    op: '+',
		//    right: { value: 20 } } ], from: [Object], group: [Object] } ] }

		var res = alasql('SEARCH /+ aggregatorid FROM ?', [ast]);
		assert.deepEqual(res, ['SUM']);
		/// console.log(res);
		//    assert.deepEqual(res,[ { a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 } ]);
		done();
	});

	// TODO: Add other operators

	it('3. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test289');
		done();
	});
});
