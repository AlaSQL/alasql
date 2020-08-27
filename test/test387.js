if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test381.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 387 - IN (SELECT) issue #469', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test387;USE test387');
		done();
	});

	it('2. Prepare tables', function (done) {
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1),(2),(3)');
		alasql('CREATE TABLE t2 (a INT)');
		alasql('INSERT INTO t2 VALUES (2),(3),(4)');
		done();
	});

	it('3. SELECTs', function (done) {
		var res = alasql('COLUMN OF SELECT 1 IN ()');
		assert.deepEqual(res, [false]);
		var res = alasql('COLUMN OF SELECT 1 IN (1,2,3)');
		assert.deepEqual(res, [true]);
		var res = alasql('COLUMN OF SELECT a IN (SELECT * FROM t1) FROM t2');
		assert.deepEqual(res, [true, true, false]);
		done();
	});

	it('4. SELECT 1 IN ()', function (done) {
		var res = alasql('SELECT 1 IN (SELECT * FROM t1)');
		assert.deepEqual(res, [{'1 IN (SELECT * FROM t1)': true}]);
		done();
	});

	it('5. SELECT 1 IN () issue #407', function (done) {
		var res = alasql('select 1 in (select 1) as x');
		assert.deepEqual(res, [{x: true}]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test387');
		done();
	});
});
