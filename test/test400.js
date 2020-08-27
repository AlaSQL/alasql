if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 400 Trigger with INSERTED', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test400;USE test400');
		done();
	});

	it('2. Create table and trigger', function (done) {
		alasql('CREATE TABLE one (a INT)');
		alasql('CREATE TABLE log (a INT, d DATETIME DEFAULT GETDATE())');
		alasql('CREATE TRIGGER tone INSERT ON one BEGIN INSERT INTO log SELECT * FROM INSERTED; END');
		done();
	});

	it('3. Insert', function (done) {
		alasql('INSERT INTO one VALUES (100)');
		alasql('INSERT INTO log (a) VALUES (200)');

		var res = alasql('MATRIX OF SELECT a,YEAR(d) FROM log');
		assert.deepEqual(res, [
			[100, new Date().getFullYear()],
			[200, new Date().getFullYear()],
		]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test400');
		done();
	});
});
