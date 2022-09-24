if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 395 SQLLOGICTEST SELECT 1', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test395;USE test395');
		done();
	});

	it('2. Test inline', function(done) {
		var res = alasql('COLUMN OF SELECT 1 FROM @[1,2,3] WHERE 1 IN (SELECT 1)');
		assert.deepEqual(res, [1, 1, 1]);
		var res = alasql('COLUMN OF SELECT 1 FROM @[] WHERE 1 IN (SELECT 1)');
		assert.deepEqual(res, []);
		done();
	});

	it('3. Test from table', function(done) {
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1),(2),(3)');
		var res = alasql('COLUMN OF SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)');
		assert.deepEqual(res, [1, 1, 1]);
		done();
	});

	it('4. Test like in command-line', function(done) {
		alasql.promise('COLUMN OF SELECT 1 FROM @[1,2] WHERE 1 IN (SELECT 1)').then(function(res) {
			assert.deepEqual(res, [1, 1]);
			done();
		});
	});

	it('5. More tests', function(done) {
		var res = alasql('COLUMN OF SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)');
		assert.deepEqual(res, [1, 1, 1]);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test395');
		done();
	});
});
