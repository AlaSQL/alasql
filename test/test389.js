if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + './restest389.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 389 Autoincrement for localStorage', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test389;USE test389');
		done();
	});

	it('2. Prepare tables', function(done) {
		alasql('SET AUTOCOMMIT OFF');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS test');
		alasql('ATTACH localStorage DATABASE test');
		alasql('CREATE TABLE IF NOT EXISTS test.one (a INT AUTO_INCREMENT, b STRING)');
		done();
	});

	it('3. SELECTs', function() {
		alasql('USE test');
		alasql('INSERT INTO test.one (b) VALUES ("one"), ("two")');
		alasql('INSERT INTO test.one (b) VALUES ("three"), ("four")');
		alasql('COMMIT TRANSACTION');
		var res = alasql('SELECT * FROM test.one');
		//Missing assert()

		alasql('TRUNCATE TABLE test.one; COMMIT TRANSACTION');
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test389');
		done();
	});
});
