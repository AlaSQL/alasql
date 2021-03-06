if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 144 - Use three databases simultaniosly', function () {
	it('1. Create database', function (done) {
		alasql('CREATE DATABASE test144db1');
		alasql('CREATE DATABASE test144db2');
		alasql('CREATE DATABASE test144db3');

		alasql('CREATE TABLE test144db1.one');
		alasql('CREATE TABLE test144db2.two (a int, b int)');
		alasql('CREATE TABLE test144db3.three (a int, b int)');

		alasql('INSERT INTO test144db1.one VALUES @{a:1}, @{a:2}');
		alasql('INSERT INTO test144db2.two VALUES (1,10), (2,20), (3,30)');
		alasql('INSERT INTO test144db3.three VALUES (1,100), (2,200)');

		alasql('SELECT * INTO test144db1.one FROM test144db2.two JOIN test144db3.three USING a');
		alasql('SELECT * FROM test144db1.one');

		alasql('DELETE FROM test144db2.two WHERE a = 1');
		alasql('SELECT * FROM test144db2.two');

		alasql('UPDATE test144db3.three SET b = a*1000 WHERE a = 2');
		alasql('SELECT * FROM test144db3.three');

		done();
	});

	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test144db1');
		alasql('DROP DATABASE test144db2');
		alasql('DROP DATABASE test144db3');
		done();
	});
});
