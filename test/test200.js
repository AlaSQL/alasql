if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 200 IS NULL + IS NOT NULL', function () {
	it('1. Simple Variant', function (done) {
		alasql('CREATE DATABASE test200; USE test200');
		var res = alasql('IF 1 IS NOT NULL CREATE TABLE one');
		assert(!!alasql.tables.one);

		var res = alasql('ROW OF SELECT NULL IS NULL, 1 IS NULL, NULL NOT NULL, 1 NOT NULL');
		assert.deepEqual(res, [true, false, false, true]);
		var res = alasql('ROW OF SELECT NULL IS NOT NULL, 1 IS NOT NULL');
		assert.deepEqual(res, [false, true]);

		alasql('DROP DATABASE test200');
		done();
	});
});
