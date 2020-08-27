if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 127 SOURCE', function () {
	it('1. Load and run statements', function (done) {
		alasql('create database test127');
		alasql('use test127');
		alasql('source "' + __dirname + '/test127.sql"');
		assert.deepEqual(Object.keys(alasql.databases.test127.tables), ['one']);
		done();
	});

	it('2. Test on loaded database', function (done) {
		var res = alasql('select * from one');
		assert.deepEqual(res, [
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);

		alasql('drop database test127');
		done();
	});
});
