if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 403 REINDEX', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test403;USE test403');
		done();
	});

	it('2. Create table and index before insert', function(done) {
		alasql('CREATE TABLE one (a INT)');
		alasql('CREATE INDEX xone ON one (a)');
		alasql('INSERT INTO one (a) VALUES (100), (200), (300)');
		done();
	});

	it('3. Create table and index after insert', function(done) {
		alasql('CREATE TABLE two (a INT)');
		alasql('INSERT INTO two (a) VALUES (100), (200), (300)');
		alasql('CREATE INDEX xtwo ON two (a)');
		done();
	});

	it('4. REINDEX', function(done) {
		var res = alasql('REINDEX xone');
		assert(res == 1);
		var res = alasql('REINDEX xtwo');
		assert(res == 1);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test403');
		done();
	});
});
