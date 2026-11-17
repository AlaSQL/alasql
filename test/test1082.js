if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(null, {strict: false});
}

describe('Test 1082 - DEFAULT values in LOCALSTORAGE survive a reload', function () {
	var lsdbid = 'test' + 1082;
	var prevAutocommit;

	before(function () {
		prevAutocommit = alasql.options.autocommit;
	});

	after(function () {
		alasql.options.autocommit = prevAutocommit;
	});

	beforeEach(function () {
		alasql.options.autocommit = true;
		localStorage.clear();
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ' + lsdbid);
		alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
		alasql('USE ' + lsdbid);
		alasql(`CREATE TABLE events (
			id STRING PRIMARY KEY,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
			ready BOOLEAN DEFAULT false
		)`);
	});

	afterEach(function () {
		try {
			alasql('USE alasql');
			alasql('DETACH DATABASE ' + lsdbid);
			alasql('DROP LOCALSTORAGE DATABASE ' + lsdbid);
		} catch (e) {
			// Database might not exist
		}
		localStorage.clear();
	});

	// DETACH + ATTACH is what a page reload leaves behind: the rows stay in
	// localStorage, the in-memory tables are built again from the stored schema
	function reload() {
		alasql('DETACH DATABASE ' + lsdbid);
		alasql('ATTACH LOCALSTORAGE DATABASE ' + lsdbid);
		alasql('USE ' + lsdbid);
	}

	it('A) applies DEFAULT values on the first INSERT after a reload', function (done) {
		alasql("INSERT INTO events (id) VALUES ('before-reload')");
		reload();
		alasql("INSERT INTO events (id) VALUES ('after-reload')");

		var rows = alasql('SELECT * FROM events ORDER BY id');
		assert.equal(rows.length, 2);
		var reloaded = rows.filter(function (row) {
			return row.id === 'after-reload';
		})[0];
		assert.ok(
			reloaded.timestamp !== undefined,
			'timestamp should get DEFAULT CURRENT_TIMESTAMP after a reload'
		);
		assert.equal(reloaded.ready, false, 'ready should get DEFAULT false after a reload');
		done();
	});

	it('B) keeps the DEFAULT values of rows written after several reloads', function (done) {
		reload();
		alasql("INSERT INTO events (id) VALUES ('one')");
		reload();
		alasql("INSERT INTO events (id) VALUES ('two')");
		reload();
		alasql("INSERT INTO events (id) VALUES ('three')");

		var rows = alasql('SELECT * FROM events ORDER BY id');
		assert.equal(rows.length, 3);
		rows.forEach(function (row) {
			assert.ok(row.timestamp !== undefined, 'timestamp should be set for ' + row.id);
			assert.equal(row.ready, false, 'ready should be set for ' + row.id);
		});
		done();
	});
});
