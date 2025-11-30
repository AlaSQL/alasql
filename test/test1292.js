if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1292 - Primary key enforcement prevents duplicate values', function () {
	const test = '1292';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Primary key column constraint prevents duplicates', function () {
		alasql('CREATE TABLE settings (setting varchar(50) PRIMARY KEY, val varchar(300))');
		alasql("INSERT INTO settings (setting, val) values ('domain', 'http')");

		// Inserting a duplicate primary key should throw an error
		assert.throws(function () {
			alasql("INSERT INTO settings (setting, val) values ('domain', 'https')");
		}, /already exists in primary key/);

		// Verify only one record exists
		var res = alasql('SELECT * FROM settings');
		assert.deepEqual(res, [{setting: 'domain', val: 'http'}]);

		alasql('DROP TABLE settings');
	});

	it('B) Primary key table constraint prevents duplicates', function () {
		alasql('CREATE TABLE settings2 (setting varchar(50), val varchar(300), PRIMARY KEY (setting))');
		alasql("INSERT INTO settings2 (setting, val) values ('domain', 'http')");

		// Inserting a duplicate primary key should throw an error
		assert.throws(function () {
			alasql("INSERT INTO settings2 (setting, val) values ('domain', 'https')");
		}, /already exists in primary key/);

		// Verify only one record exists
		var res = alasql('SELECT * FROM settings2');
		assert.deepEqual(res, [{setting: 'domain', val: 'http'}]);

		alasql('DROP TABLE settings2');
	});

	it('C) Primary key allows different key values', function () {
		alasql('CREATE TABLE settings3 (setting varchar(50) PRIMARY KEY, val varchar(300))');
		alasql("INSERT INTO settings3 (setting, val) values ('domain', 'http')");
		alasql("INSERT INTO settings3 (setting, val) values ('port', '8080')");

		// Verify both records exist
		var res = alasql('SELECT * FROM settings3 ORDER BY setting');
		assert.deepEqual(res, [
			{setting: 'domain', val: 'http'},
			{setting: 'port', val: '8080'},
		]);

		alasql('DROP TABLE settings3');
	});
});
