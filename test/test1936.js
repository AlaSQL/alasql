if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1936 - Check CURDATE', function () {
	it('CURDATE in SELECT', function () {
		let result = alasql("SELECT CURDATE()");

		assert.equal(true, result[0]["CURDATE()"] instanceof Date);
		assert.equal(true, result[0]["CURDATE()"].toISOString().includes("00:00"));
	});
});
