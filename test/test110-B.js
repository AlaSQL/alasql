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
		assert.strictEqual(sql, 'CREATE TABLE one (a INT, b STRING);\n\n');
	});

	it('C) DUMP database with single table and data', function () {
		alasql('INSERT INTO one VALUES (1, "test")');
		alasql('INSERT INTO one VALUES (2, "hello")');
		var sql = alasql('DUMP');
		assert.strictEqual(
			sql,
			"CREATE TABLE one (a INT, b STRING);\nINSERT INTO one(a,b) VALUES (1,'test');\nINSERT INTO one(a,b) VALUES (2,'hello');\n\n"
		);
	});

	it('D) DUMP database with multiple tables', function () {
		alasql('CREATE TABLE two (x INT, y INT, z STRING)');
		alasql('INSERT INTO two VALUES (10, 20, "data")');
		var sql = alasql('DUMP');
		assert.strictEqual(
			sql,
			"CREATE TABLE one (a INT, b STRING);\nINSERT INTO one(a,b) VALUES (1,'test');\nINSERT INTO one(a,b) VALUES (2,'hello');\n\nCREATE TABLE two (x INT, y INT, z STRING);\nINSERT INTO two(x,y,z) VALUES (10,20,'data');\n\n"
		);
	});

	it('E) DUMP DATABASE with specific database name', function () {
		var sql = alasql('DUMP DATABASE test' + test);
		assert.strictEqual(
			sql,
			"CREATE TABLE one (a INT, b STRING);\nINSERT INTO one(a,b) VALUES (1,'test');\nINSERT INTO one(a,b) VALUES (2,'hello');\n\nCREATE TABLE two (x INT, y INT, z STRING);\nINSERT INTO two(x,y,z) VALUES (10,20,'data');\n\n"
		);
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
		assert.strictEqual(
			sql,
			"CREATE TABLE one (a INT, b STRING);\nINSERT INTO one(a,b) VALUES (1,'test');\nINSERT INTO one(a,b) VALUES (2,'hello');\n\nCREATE TABLE two (x INT, y INT, z STRING);\nINSERT INTO two(x,y,z) VALUES (10,20,'data');\n\nCREATE TABLE three (a INT, b STRING);\nINSERT INTO three(a,b) VALUES (1,NULL);\nINSERT INTO three(a,b) VALUES (NULL,'text');\n\n"
		);
	});

	it('H) DUMP handles quotes in strings', function () {
		alasql('CREATE TABLE four (name STRING)');
		alasql('INSERT INTO four VALUES ("Val\'s Diner")');
		var sql = alasql('DUMP');
		assert.strictEqual(
			sql,
			"CREATE TABLE one (a INT, b STRING);\nINSERT INTO one(a,b) VALUES (1,'test');\nINSERT INTO one(a,b) VALUES (2,'hello');\n\nCREATE TABLE two (x INT, y INT, z STRING);\nINSERT INTO two(x,y,z) VALUES (10,20,'data');\n\nCREATE TABLE three (a INT, b STRING);\nINSERT INTO three(a,b) VALUES (1,NULL);\nINSERT INTO three(a,b) VALUES (NULL,'text');\n\nCREATE TABLE four (name STRING);\nINSERT INTO four(name) VALUES ('Val''s Diner');\n\n"
		);
	});
});
