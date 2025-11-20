if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 895 - SERIAL type should not overwrite explicitly provided values', function () {
	const test = '895';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) SERIAL column should auto-increment when not provided', function () {
		alasql('CREATE TABLE test_serial (id serial, name varchar(50))');
		alasql('INSERT INTO test_serial (name) VALUES ("first")');
		alasql('INSERT INTO test_serial (name) VALUES ("second")');
		alasql('INSERT INTO test_serial (name) VALUES ("third")');
		var res = alasql('SELECT * FROM test_serial ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'first'},
			{id: 2, name: 'second'},
			{id: 3, name: 'third'},
		]);
	});

	it('B) SERIAL column should accept explicitly provided value', function () {
		alasql('CREATE TABLE test_serial2 (id serial, name varchar(50))');
		alasql('INSERT INTO test_serial2 (id, name) VALUES (10, "first")');
		alasql('INSERT INTO test_serial2 (id, name) VALUES (20, "second")');
		alasql('INSERT INTO test_serial2 (id, name) VALUES (30, "third")');
		var res = alasql('SELECT * FROM test_serial2 ORDER BY id');
		assert.deepEqual(res, [
			{id: 10, name: 'first'},
			{id: 20, name: 'second'},
			{id: 30, name: 'third'},
		]);
	});

	it('C) SERIAL column should accept explicitly provided value even if lower than counter', function () {
		alasql('CREATE TABLE test_serial3 (id serial, name varchar(50))');
		// Insert with auto-increment first
		alasql('INSERT INTO test_serial3 (name) VALUES ("auto1")');
		alasql('INSERT INTO test_serial3 (name) VALUES ("auto2")');
		alasql('INSERT INTO test_serial3 (name) VALUES ("auto3")');
		// Now insert with explicit ID that is higher than counter
		alasql('INSERT INTO test_serial3 (id, name) VALUES (100, "explicit")');
		var res = alasql('SELECT * FROM test_serial3 ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'auto1'},
			{id: 2, name: 'auto2'},
			{id: 3, name: 'auto3'},
			{id: 100, name: 'explicit'},
		]);
	});

	it('D) SERIAL with mixed auto and explicit values', function () {
		alasql('CREATE TABLE test_serial4 (id serial, name varchar(50))');
		alasql('INSERT INTO test_serial4 (id, name) VALUES (5, "explicit5")');
		// After explicit insert of 5, counter advances to 6
		alasql('INSERT INTO test_serial4 (name) VALUES ("auto")'); // Should be 6
		alasql('INSERT INTO test_serial4 (id, name) VALUES (10, "explicit10")');
		// After explicit insert of 10, counter advances to 11
		alasql('INSERT INTO test_serial4 (name) VALUES ("auto2")'); // Should be 11
		var res = alasql('SELECT * FROM test_serial4 ORDER BY id');
		assert.deepEqual(res, [
			{id: 5, name: 'explicit5'},
			{id: 6, name: 'auto'},
			{id: 10, name: 'explicit10'},
			{id: 11, name: 'auto2'},
		]);
	});

	it('E) Bulk insert with explicit SERIAL values', function () {
		alasql('CREATE TABLE test_serial5 (id serial, name varchar(50))');
		alasql('INSERT INTO test_serial5 (id, name) VALUES (4, "item4"), (8, "item8"), (12, "item12")');
		var res = alasql('SELECT * FROM test_serial5 ORDER BY id');
		assert.deepEqual(res, [
			{id: 4, name: 'item4'},
			{id: 8, name: 'item8'},
			{id: 12, name: 'item12'},
		]);
	});

	it('F) Re-inserting data after truncate with explicit IDs', function () {
		alasql('CREATE TABLE test_serial6 (id serial, name varchar(50))');
		// Initial data
		alasql('INSERT INTO test_serial6 (name) VALUES ("first"), ("second"), ("third")');
		var res1 = alasql('SELECT * FROM test_serial6 ORDER BY id');
		assert.deepEqual(res1, [
			{id: 1, name: 'first'},
			{id: 2, name: 'second'},
			{id: 3, name: 'third'},
		]);

		// Simulate the flush scenario from the issue
		alasql('DELETE FROM test_serial6'); // Delete all

		// Re-insert with explicit IDs (simulating data from backend storage)
		alasql('INSERT INTO test_serial6 (id, name) VALUES (4, "item4")');
		alasql('INSERT INTO test_serial6 (id, name) VALUES (7, "item7")');
		alasql('INSERT INTO test_serial6 (id, name) VALUES (9, "item9")');

		var res2 = alasql('SELECT * FROM test_serial6 ORDER BY id');
		assert.deepEqual(res2, [
			{id: 4, name: 'item4'},
			{id: 7, name: 'item7'},
			{id: 9, name: 'item9'},
		]);
	});
});
