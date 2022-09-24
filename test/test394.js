if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on this article:

*/

describe('Test 394 T-SQL Triggers', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test394;USE test394');
		done();
	});

	it('2. Create tables', function (done) {
		alasql('CREATE TABLE main (a INT)');
		alasql('CREATE TABLE log (a INT, d DATETIME DEFAULT GETTIME())');
		alasql('CREATE TRIGGER t_main ON main INSERT AS INSERT INTO log SELECT a FROM inserted');

		done();
	});

	it('3. Fire trigger', function (done) {
		alasql('INSERT INTO main VALUES (1)');

		var res = alasql('SELECT * FROM log');
		//console.log(res);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test394');
		done();
	});
});
