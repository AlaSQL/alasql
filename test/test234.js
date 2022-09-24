if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 234 Complex test', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test234; USE test234;');
		done();
	});

	it('2. Throw error', function (done) {
		alasql('source "' + __dirname + '/test234.sql"', [], function (res) {
			//          console.log(res);
			assert.deepEqual(res.pop(), [
				{FirstName: 'John', LastName: 'Johnson'},
				{FirstName: 'Larry', LastName: 'Larrison'},
			]);
			done();
		});
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test234');
		done();
	});
});
