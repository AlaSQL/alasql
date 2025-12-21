if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2203 - KEY keyword should be usable as identifier', function () {
	const test = '2203'; // insert test file number

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	// NOTE: Tests should use assert.deepEqual to verify the complete expected output
	// against the actual result object. This ensures comprehensive validation and
	// makes test failures more informative by showing the full diff.

	it('A) KEY as column name in CREATE TABLE', function () {
		var res = alasql('CREATE TABLE test_key_col (id INT, key VARCHAR(50), data VARCHAR(100))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_key_col VALUES (1, 'mykey', 'myvalue')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_key_col');
		assert.deepEqual(selectRes, [{id: 1, key: 'mykey', data: 'myvalue'}]);
	});

	it('B) KEY as table name', function () {
		var res = alasql('CREATE TABLE key (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO key VALUES (1, 'test')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM key');
		assert.deepEqual(selectRes, [{id: 1, name: 'test'}]);
	});

	it('C) KEY as column name with quoted identifier', function () {
		var res = alasql('CREATE TABLE test_quoted ([key] INT, data VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_quoted VALUES (123, 'data')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_quoted');
		assert.deepEqual(selectRes, [{key: 123, data: 'data'}]);
	});

	it('D) KEY as table name with quoted identifier', function () {
		// Clean up the unquoted 'key' table from test B (both resolve to same table)
		alasql('DROP TABLE IF EXISTS [key]');
		var res = alasql('CREATE TABLE [key] (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO [key] VALUES (2, 'test2')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM [key]');
		assert.deepEqual(selectRes, [{id: 2, name: 'test2'}]);
	});

	it('E) SELECT with KEY column in WHERE clause', function () {
		alasql('CREATE TABLE items (id INT, key VARCHAR(50), data VARCHAR(100))');
		alasql("INSERT INTO items VALUES (1, 'key1', 'value1'), (2, 'key2', 'value2')");

		var res = alasql("SELECT * FROM items WHERE key = 'key1'");
		assert.deepEqual(res, [{id: 1, key: 'key1', data: 'value1'}]);
	});

	it('F) PRIMARY KEY syntax still works', function () {
		var res = alasql('CREATE TABLE test_pk (id INT PRIMARY KEY, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_pk VALUES (1, 'test')");
		assert.equal(insertRes, 1);
	});

	it('G) FOREIGN KEY syntax still works', function () {
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		var res = alasql(
			'CREATE TABLE child (id INT, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id))'
		);
		assert.equal(res, 1);
	});

	it('H) UNIQUE KEY syntax still works', function () {
		var res = alasql('CREATE TABLE test_unique (id INT, email VARCHAR(100), UNIQUE KEY (email))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_unique VALUES (1, 'test@example.com')");
		assert.equal(insertRes, 1);
	});

	it('I) INDEX syntax still works', function () {
		var res = alasql('CREATE TABLE test_index (id INT, name VARCHAR(50), INDEX idx_name (name))');
		assert.equal(res, 1);
	});

	it('J) Join tables with KEY column', function () {
		alasql('CREATE TABLE t1 (id INT, key VARCHAR(50))');
		alasql('CREATE TABLE t2 (id INT, key VARCHAR(50))');
		alasql("INSERT INTO t1 VALUES (1, 'a'), (2, 'b')");
		alasql("INSERT INTO t2 VALUES (1, 'a'), (3, 'c')");

		var res = alasql('SELECT t1.id, t1.key FROM t1 JOIN t2 ON t1.key = t2.key');
		assert.deepEqual(res, [{id: 1, key: 'a'}]);
	});

	it('K) KEY as alias', function () {
		alasql('CREATE TABLE test_alias (id INT, mykey VARCHAR(50))');
		alasql("INSERT INTO test_alias VALUES (1, 'test')");

		var res = alasql('SELECT mykey AS key FROM test_alias');
		assert.deepEqual(res, [{key: 'test'}]);
	});

	it('L) GROUP BY with KEY column', function () {
		alasql('CREATE TABLE test_group (key VARCHAR(50), amount INT)');
		alasql("INSERT INTO test_group VALUES ('a', 1), ('b', 2), ('a', 3)");

		var res = alasql(
			'SELECT key, SUM(amount) as sum_amount FROM test_group GROUP BY key ORDER BY key'
		);
		assert.deepEqual(res, [
			{key: 'a', sum_amount: 4},
			{key: 'b', sum_amount: 2},
		]);
	});

	it('M) ORDER BY with KEY column', function () {
		alasql('CREATE TABLE test_order (id INT, key VARCHAR(50))');
		alasql("INSERT INTO test_order VALUES (2, 'b'), (1, 'a'), (3, 'c')");

		var res = alasql('SELECT * FROM test_order ORDER BY key');
		assert.deepEqual(res, [
			{id: 1, key: 'a'},
			{id: 2, key: 'b'},
			{id: 3, key: 'c'},
		]);
	});
});
