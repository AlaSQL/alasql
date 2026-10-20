if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 128 ASSERT', function () {
	it('1. Assert on SOURCE and run statements', function (done) {
		alasql('create database test128');
		alasql('assert 1');
		alasql('use test128');
		alasql('assert 1');
		alasql('source "' + __dirname + '/test128.sql"');
		alasql('assert @[1,1,2,1,2,1]');

		alasql('select * from one');
		alasql('assert @[{a:1,bbb:1, c:1}, {a:2,bbb:2, c:2}]');
		alasql('drop database test128');

		alasql('assert 1');
		done();
	});
});
