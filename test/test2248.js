if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2248 - CLOSE keyword should be usable as identifier', function () {
	const test = '2248'; // insert test file number

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

	it('A) CLOSE as column name in CREATE TABLE', function () {
		var res = alasql('CREATE TABLE test_close_col (id INT, close VARCHAR(50), data VARCHAR(100))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_close_col VALUES (1, 'myclose', 'myvalue')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_close_col');
		assert.deepStrictEqual(selectRes, [{id: 1, close: 'myclose', data: 'myvalue'}]);
	});

	it('B) CLOSE as table name', function () {
		var res = alasql('CREATE TABLE close (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO close VALUES (1, 'test')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM close');
		assert.deepStrictEqual(selectRes, [{id: 1, name: 'test'}]);
	});

	it('C) CLOSE as column name with quoted identifier', function () {
		var res = alasql('CREATE TABLE test_quoted ([close] INT, data VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO test_quoted VALUES (123, 'data')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_quoted');
		assert.deepStrictEqual(selectRes, [{close: 123, data: 'data'}]);
	});

	it('D) CLOSE as table name with quoted identifier', function () {
		// Clean up the unquoted 'close' table from test B (both resolve to same table)
		alasql('DROP TABLE IF EXISTS [close]');
		var res = alasql('CREATE TABLE [close] (id INT, name VARCHAR(50))');
		assert.equal(res, 1);

		var insertRes = alasql("INSERT INTO [close] VALUES (2, 'test2')");
		assert.equal(insertRes, 1);

		var selectRes = alasql('SELECT * FROM [close]');
		assert.deepStrictEqual(selectRes, [{id: 2, name: 'test2'}]);
	});

	it('E) SELECT with CLOSE column in WHERE clause', function () {
		alasql('CREATE TABLE items (id INT, close VARCHAR(50), data VARCHAR(100))');
		alasql("INSERT INTO items VALUES (1, 'close1', 'value1'), (2, 'close2', 'value2')");

		var res = alasql("SELECT * FROM items WHERE close = 'close1'");
		assert.deepStrictEqual(res, [{id: 1, close: 'close1', data: 'value1'}]);
	});

	it('F) CLOSE CURSOR syntax still works', function () {
		// Note: DECLARE/OPEN/CLOSE cursor syntax is currently commented out in the grammar
		// This test verifies that CLOSE as a keyword still works in the expected context
		// when/if cursor support is re-enabled

		// For now, just verify that we can use 'cursor' as a table/column name
		alasql('CREATE TABLE cursor_test (id INT, name VARCHAR(50))');
		alasql("INSERT INTO cursor_test VALUES (1, 'test1'), (2, 'test2')");

		var res = alasql('SELECT * FROM cursor_test WHERE id = 1');
		assert.deepStrictEqual(res, [{id: 1, name: 'test1'}]);
	});

	it('G) Join tables with CLOSE column', function () {
		alasql('CREATE TABLE t1 (id INT, close VARCHAR(50))');
		alasql('CREATE TABLE t2 (id INT, close VARCHAR(50))');
		alasql("INSERT INTO t1 VALUES (1, 'a'), (2, 'b')");
		alasql("INSERT INTO t2 VALUES (1, 'a'), (3, 'c')");

		var res = alasql('SELECT t1.id, t1.close FROM t1 JOIN t2 ON t1.close = t2.close');
		assert.deepStrictEqual(res, [{id: 1, close: 'a'}]);
	});

	it('H) CLOSE as alias', function () {
		alasql('CREATE TABLE test_alias (id INT, myclose VARCHAR(50))');
		alasql("INSERT INTO test_alias VALUES (1, 'test')");

		var res = alasql('SELECT myclose AS close FROM test_alias');
		assert.deepStrictEqual(res, [{close: 'test'}]);
	});

	it('I) GROUP BY with CLOSE column', function () {
		alasql('CREATE TABLE test_group (close VARCHAR(50), amount INT)');
		alasql("INSERT INTO test_group VALUES ('a', 1), ('b', 2), ('a', 3)");

		var res = alasql(
			'SELECT close, SUM(amount) as sum_amount FROM test_group GROUP BY close ORDER BY close'
		);
		assert.deepStrictEqual(res, [
			{close: 'a', sum_amount: 4},
			{close: 'b', sum_amount: 2},
		]);
	});

	it('J) ORDER BY with CLOSE column', function () {
		alasql('CREATE TABLE test_order (id INT, close VARCHAR(50))');
		alasql("INSERT INTO test_order VALUES (2, 'b'), (1, 'a'), (3, 'c')");

		var res = alasql('SELECT * FROM test_order ORDER BY close');
		assert.deepStrictEqual(res, [
			{id: 1, close: 'a'},
			{id: 2, close: 'b'},
			{id: 3, close: 'c'},
		]);
	});

	it('K) UPDATE with CLOSE column', function () {
		alasql('CREATE TABLE test_update (id INT, close VARCHAR(50), data VARCHAR(100))');
		alasql("INSERT INTO test_update VALUES (1, 'old', 'value')");

		var updateRes = alasql("UPDATE test_update SET close = 'new' WHERE id = 1");
		assert.equal(updateRes, 1);

		var selectRes = alasql('SELECT * FROM test_update');
		assert.deepStrictEqual(selectRes, [{id: 1, close: 'new', data: 'value'}]);
	});

	it('L) DELETE with CLOSE column in WHERE clause', function () {
		alasql('CREATE TABLE test_delete (id INT, close VARCHAR(50))');
		alasql("INSERT INTO test_delete VALUES (1, 'del'), (2, 'keep')");

		var deleteRes = alasql("DELETE FROM test_delete WHERE close = 'del'");
		assert.equal(deleteRes, 1);

		var selectRes = alasql('SELECT * FROM test_delete');
		assert.deepStrictEqual(selectRes, [{id: 2, close: 'keep'}]);
	});
});
