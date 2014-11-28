if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 144 - Use three databases simultaniosly', function() {

	it("1. Create database", function(done){
		alasql('CREATE DATABASE db1');
		alasql('CREATE DATABASE db2');
		alasql('CREATE DATABASE db3');

		alasql('CREATE TABLE db1.one');
		alasql('CREATE TABLE db1.two (a int, b int)');
		alasql('CREATE TABLE db1.three (a int, b int)');

		alasql('INSERT INTO db2.two VALUES (1,10), (2,20), (3,30)');
		alasql('INSERT INTO db3.three VALUES (1,100), (2,200)');

		alasql('SELECT * INTO db1.one FROM db2.two JOIN db3.three USING a')
		alasql('SELECT * FROM db1.one');

		alasql('DELETE FROM db2.two WHERE a = 1');
		alasql('SELECT * FROM db2.two');

		alasql('UPDATE db3.three SET b = a*1000 WHERE a = 2');
		alasql('SELECT * FROM db3.three');

		done();
	});

	it("99. Drop database", function(done){
		alasql('DROP DATABASE db1');
		alasql('DROP DATABASE db2');
		alasql('DROP DATABASE db3');
		done();
	});
});

