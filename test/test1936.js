if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1936 - Check CURDATE', function () {
	it('CURDATE in SELECT - as Date', function () {
		alasql.options.dateAsString = false;
		let result = alasql("SELECT CURDATE()");

		assert.ok(result[0]["CURDATE()"] instanceof Date);
		assert.ok(result[0]["CURDATE()"].getHours() === 0);
		assert.ok(result[0]["CURDATE()"].getMinutes() === 0);
		assert.ok(result[0]["CURDATE()"].getSeconds() === 0);
	});

	it('CURDATE in SELECT - as String', function () {
		alasql.options.dateAsString = true;
		let result = alasql("SELECT CURDATE()");

		assert.ok(typeof result[0]["CURDATE()"] === 'string');
		assert.ok(!result[0]["CURDATE()"].includes("00:00:00"));
	});
});
