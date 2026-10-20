if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 248 IN ()', function () {
	it('1. IN ()', function (done) {
		var res = alasql('SELECT VALUE 1 IN ()');
		assert(res == false);

		done();
	});

	it('2. NOT IN ()', function (done) {
		var res = alasql('SELECT VALUE 1 NOT IN ()');
		assert(res == true);

		done();
	});
});
