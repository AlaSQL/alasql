if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 362 IF() and IIF()', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test362;USE test362');
		done();
	});

	it('2. TEST', function(done) {
		var res = alasql('VALUE OF SELECT IIF(1>2,2,3)');
		assert.deepEqual(res, 3);
		var res = alasql('VALUE OF SELECT IF(1>2,2,3)');
		assert.deepEqual(res, 3);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test362');
		done();
	});
});
