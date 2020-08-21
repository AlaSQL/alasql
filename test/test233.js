if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 233 COALESCE() test', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test233; USE test233;');
		done();
	});

	it('2. Throw error', function (done) {
		alasql('source "' + __dirname + '/test233.sql"', [], function (res) {
			assert.deepEqual(alasql.utils.flatArray(res.pop()), [
				10000,
				20000,
				20800,
				30000,
				40000,
				41600,
				45000,
				50000,
				56000,
				62400,
				83200,
				120000,
			]);
			done();
		});
	});

	it('99. DROP', function (done) {
		alasql.options.nocount = false;
		alasql('DROP DATABASE test233');
		done();
	});
});
