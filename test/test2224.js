if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2224 - OPEN keyword should be usable as identifier', function () {
	const test = '2224'; // insert test file number

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

	it('A) OPEN as column name in CREATE TABLE', function () {
		var res = alasql('CREATE TABLE test_open_col (id INT, open VARCHAR(50), data VARCHAR(100))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_open_col VALUES (1, 'myopen', 'myvalue')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_open_col');
		assert.deepEqual(selectRes, [{id: 1, open: 'myopen', data: 'myvalue'}]);
	});

	it('B) OPEN as table name', function () {
		var res = alasql('CREATE TABLE open (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO open VALUES (1, 'test')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM open');
		assert.deepEqual(selectRes, [{id: 1, name: 'test'}]);
	});

	it('C) OPEN as column name with quoted identifier', function () {
		var res = alasql('CREATE TABLE test_quoted ([open] INT, data VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_quoted VALUES (123, 'data')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_quoted');
		assert.deepEqual(selectRes, [{open: 123, data: 'data'}]);
	});

	it('D) OPEN as table name with quoted identifier', function () {
		// Clean up the unquoted 'open' table from test B (both resolve to same table)
		alasql('DROP TABLE IF EXISTS [open]');
		var res = alasql('CREATE TABLE [open] (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO [open] VALUES (2, 'test2')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM [open]');
		assert.deepEqual(selectRes, [{id: 2, name: 'test2'}]);
	});

	it('E) SELECT with OPEN column in WHERE clause', function () {
		alasql('CREATE TABLE items (id INT, open VARCHAR(50), data VARCHAR(100))');
		alasql("INSERT INTO items VALUES (1, 'open1', 'value1'), (2, 'open2', 'value2')");

		var res = alasql("SELECT * FROM items WHERE open = 'open1'");
		assert.deepEqual(res, [{id: 1, open: 'open1', data: 'value1'}]);
	});

	it('F) Join tables with OPEN column', function () {
		alasql('CREATE TABLE t1 (id INT, open VARCHAR(50))');
		alasql('CREATE TABLE t2 (id INT, open VARCHAR(50))');
		alasql("INSERT INTO t1 VALUES (1, 'a'), (2, 'b')");
		alasql("INSERT INTO t2 VALUES (1, 'a'), (3, 'c')");

		var res = alasql('SELECT t1.id, t1.open FROM t1 JOIN t2 ON t1.open = t2.open');
		assert.deepEqual(res, [{id: 1, open: 'a'}]);
	});

	it('G) OPEN as alias', function () {
		alasql('CREATE TABLE test_alias (id INT, myopen VARCHAR(50))');
		alasql("INSERT INTO test_alias VALUES (1, 'test')");

		var res = alasql('SELECT myopen AS open FROM test_alias');
		assert.deepEqual(res, [{open: 'test'}]);
	});

	it('H) GROUP BY with OPEN column', function () {
		alasql('CREATE TABLE test_group (open VARCHAR(50), amount INT)');
		alasql("INSERT INTO test_group VALUES ('a', 1), ('b', 2), ('a', 3)");

		var res = alasql(
			'SELECT open, SUM(amount) as sum_amount FROM test_group GROUP BY open ORDER BY open'
		);
		assert.deepEqual(res, [
			{open: 'a', sum_amount: 4},
			{open: 'b', sum_amount: 2},
		]);
	});

	it('I) ORDER BY with OPEN column', function () {
		alasql('CREATE TABLE test_order (id INT, open VARCHAR(50))');
		alasql("INSERT INTO test_order VALUES (2, 'b'), (1, 'a'), (3, 'c')");

		var res = alasql('SELECT * FROM test_order ORDER BY open');
		assert.deepEqual(res, [
			{id: 1, open: 'a'},
			{id: 2, open: 'b'},
			{id: 3, open: 'c'},
		]);
	});

	it.skip('J) OPEN CURSOR syntax still works', function () {
		// Note: Cursor syntax is currently commented out in the grammar
		// This test is skipped until cursor support is fully implemented
		// Declare a cursor
		var res1 = alasql('DECLARE cur1 CURSOR FOR SELECT 1 as a');
		assert.equal(res1, 1);

		// Open the cursor - this should still work with OPEN keyword
		var res2 = alasql('OPEN cur1');
		assert.equal(res2, 1);

		// Close the cursor
		var res3 = alasql('CLOSE cur1');
		assert.equal(res3, 1);
	});

	it('K) OPEN in subquery', function () {
		alasql('CREATE TABLE test_sub (id INT, open VARCHAR(50))');
		alasql("INSERT INTO test_sub VALUES (1, 'test1'), (2, 'test2')");

		var res = alasql(
			'SELECT * FROM test_sub WHERE open IN (SELECT open FROM test_sub WHERE id = 1)'
		);
		assert.deepEqual(res, [{id: 1, open: 'test1'}]);
	});

	it('L) UPDATE with OPEN column', function () {
		alasql('CREATE TABLE test_update (id INT, open VARCHAR(50))');
		alasql("INSERT INTO test_update VALUES (1, 'old')");

		var updateRes = alasql("UPDATE test_update SET open = 'new' WHERE id = 1");
		assert.equal(updateRes, 1);

		var selectRes = alasql('SELECT * FROM test_update');
		assert.deepEqual(selectRes, [{id: 1, open: 'new'}]);
	});

	it('M) DELETE with OPEN column', function () {
		alasql('CREATE TABLE test_delete (id INT, open VARCHAR(50))');
		alasql("INSERT INTO test_delete VALUES (1, 'test1'), (2, 'test2')");

		var deleteRes = alasql("DELETE FROM test_delete WHERE open = 'test1'");
		assert.equal(deleteRes, 1);

		var selectRes = alasql('SELECT * FROM test_delete');
		assert.deepEqual(selectRes, [{id: 2, open: 'test2'}]);
	});
});
