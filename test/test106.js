//
// tselect01.js
// Test for select
//

if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 06 - Callback', function () {
	it('exec(sql, callback)', function (done) {
		alasql('create database test06; use test06');
		alasql('CREATE TABLE test (a INT, b INT)');
		alasql('INSERT INTO test VALUES (1,1)');
		alasql('SELECT * FROM test', [], function (res) {
			assert(res[0].a == 1);
			alasql('drop database test06');
			done();
		});
	});
});
