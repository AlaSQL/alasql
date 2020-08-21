if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 396 SQLLOGICTEST ', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test396;USE test396');
		done();
	});

	it('2. Prepare', function (done) {
		alasql('CREATE TABLE t1( x INTEGER NOT NULL PRIMARY KEY, y VARCHAR(16) )');
		alasql("INSERT INTO t1 VALUES(1, 'true')");
		alasql("INSERT INTO t1 VALUES(0, 'false')");

		alasql.options.modifier = 'ROW';
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		assert.deepEqual(res, undefined);

		alasql("INSERT INTO t1 VALUES(2, 'insert')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		assert.deepEqual(res, [2, 'insert']);

		alasql("INSERT OR REPLACE INTO t1 VALUES(2, 'insert or replace')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		assert.deepEqual(res, [2, 'insert or replace']);

		alasql("REPLACE INTO t1 VALUES(2, 'replace')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		assert.deepEqual(res, [2, 'replace']);

		alasql("INSERT OR REPLACE INTO t1 VALUES(3, 'insert or replace (new)')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=3');
		assert.deepEqual(res, [3, 'insert or replace (new)']);

		done();
	});

	it('3. Error statement', function (done) {
		alasql("REPLACE INTO t1 VALUES(4, 'replace (new)')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=4');
		assert.deepEqual(res, [4, 'replace (new)']);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test396');
		done();
	});
});
