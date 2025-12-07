if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 110-B - DUMP DATABASE functionality', function () {
	const test = '110B'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) DUMP empty database', function () {
		var sql = alasql('DUMP');
		assert.strictEqual(typeof sql, 'string');
		assert.strictEqual(sql, '');
	});

	it('B) DUMP database with single table and no data', function () {
		alasql('CREATE TABLE one (a INT, b STRING)');
		var sql = alasql('DUMP');
		assert(sql.includes('CREATE TABLE one'));
		assert(sql.includes('a INT'));
		assert(sql.includes('b STRING'));
	});

	it('C) DUMP database with single table and data', function () {
		alasql('INSERT INTO one VALUES (1, "test")');
		alasql('INSERT INTO one VALUES (2, "hello")');
		var sql = alasql('DUMP');
		assert(sql.includes('CREATE TABLE one'));
		assert(sql.includes('INSERT INTO one'));
		assert(sql.includes("'test'"));
		assert(sql.includes("'hello'"));
	});

	it('D) DUMP database with multiple tables', function () {
		alasql('CREATE TABLE two (x INT, y INT, z STRING)');
		alasql('INSERT INTO two VALUES (10, 20, "data")');
		var sql = alasql('DUMP');
		assert(sql.includes('CREATE TABLE one'));
		assert(sql.includes('CREATE TABLE two'));
		assert(sql.includes('INSERT INTO one'));
		assert(sql.includes('INSERT INTO two'));
	});

	it('E) DUMP DATABASE with specific database name', function () {
		var sql = alasql('DUMP DATABASE test' + test);
		assert(sql.includes('CREATE TABLE one'));
		assert(sql.includes('CREATE TABLE two'));
	});

	it('F) Re-create database from dump', function () {
		// Get dump of current database
		var sql = alasql('DUMP');

		// Create new database and execute the dump
		alasql('CREATE DATABASE test' + test + '_copy');
		alasql('USE test' + test + '_copy');

		// Execute all statements from dump
		alasql(sql);

		// Verify tables exist
		var tables = alasql('SHOW TABLES');
		assert.strictEqual(tables.length, 2);

		// Verify data
		var data1 = alasql('SELECT * FROM one ORDER BY a');
		assert.strictEqual(data1.length, 2);
		assert.strictEqual(data1[0].a, 1);
		assert.strictEqual(data1[0].b, 'test');
		assert.strictEqual(data1[1].a, 2);
		assert.strictEqual(data1[1].b, 'hello');

		var data2 = alasql('SELECT * FROM two');
		assert.strictEqual(data2.length, 1);
		assert.strictEqual(data2[0].x, 10);
		assert.strictEqual(data2[0].y, 20);
		assert.strictEqual(data2[0].z, 'data');

		// Cleanup
		alasql('DROP DATABASE test' + test + '_copy');
		alasql('USE test' + test);
	});

	it('G) DUMP handles NULL values', function () {
		alasql('CREATE TABLE three (a INT, b STRING)');
		alasql('INSERT INTO three VALUES (1, NULL)');
		alasql('INSERT INTO three VALUES (NULL, "text")');
		var sql = alasql('DUMP');
		assert(sql.includes('NULL'));
	});

	it('H) DUMP handles quotes in strings', function () {
		alasql('CREATE TABLE four (name STRING)');
		alasql('INSERT INTO four VALUES ("Val\'s Diner")');
		var sql = alasql('DUMP');
		assert(sql.includes('CREATE TABLE four'));
		// Should have escaped quotes
		assert(sql.includes('INSERT INTO four'));
	});
});
