if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 218 N string and PRINT "a"', function () {
	it("1. N'String' ", function (done) {
		var res = alasql("SELECT VALUE N'This is a string'"); // N' added for compatibility with MSSQL - the N can be avoided.
		//        console.log(res);
		assert(res == 'This is a string');
		done();
	});
});
