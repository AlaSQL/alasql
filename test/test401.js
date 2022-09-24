if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 401 NOT INDEXED', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test401;USE test401');
		done();
	});

	it('2. Create table and trigger', function (done) {
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (100), (200), (300)');
		done();
	});

	it('3. Insert', function (done) {
		var res = alasql('COLUMN OF SELECT * FROM one NOT INDEXED');
		assert.deepEqual(res, [100, 200, 300]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test401');
		done();
	});
});
