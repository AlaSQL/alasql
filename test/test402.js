if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 402 a NOT NULL', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test402;USE test402');
		done();
	});

	it('2. Create table and trigger', function(done) {
		alasql('CREATE TABLE one (a INT, b INT)');
		alasql('INSERT INTO one (a) VALUES (100), (200), (300)');
		alasql('UPDATE one SET b = 1 WHERE a = 100');
		done();
	});

	it('3. IS NOT NULL', function(done) {
		var res = alasql('SELECT * FROM one WHERE b IS NOT NULL');
		assert.deepEqual(res, [{a: 100, b: 1}]);
		done();
	});

	it('4. NOT NULL', function(done) {
		var res = alasql('SELECT * FROM one WHERE b NOT NULL');
		assert.deepEqual(res, [{a: 100, b: 1}]);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test402');
		done();
	});
});
