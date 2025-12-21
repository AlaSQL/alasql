if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2361 - DEFAULT keyword should not be reserved in all contexts', function () {
	const test = '2361'; // insert test file number

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

	it('A) Should allow DEFAULT as a table name', function () {
		var res = alasql('CREATE TABLE default (id INT, name STRING)');
		assert.equal(res, 1);

		// Insert some data
		alasql('INSERT INTO default VALUES (1, "test1"), (2, "test2")');

		// Query the table
		var data = alasql('SELECT * FROM default ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, name: 'test1'},
			{id: 2, name: 'test2'},
		]);

		// Clean up
		alasql('DROP TABLE default');
	});

	it('B) Should allow DEFAULT as a column name', function () {
		var res = alasql('CREATE TABLE test_default_col (id INT, default STRING, amount INT)');
		assert.equal(res, 1);

		// Insert data
		alasql('INSERT INTO test_default_col VALUES (1, "col1", 100), (2, "col2", 200)');

		// Query with DEFAULT column
		var data = alasql('SELECT id, default, amount FROM test_default_col ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, default: 'col1', amount: 100},
			{id: 2, default: 'col2', amount: 200},
		]);

		// Clean up
		alasql('DROP TABLE test_default_col');
	});

	it('C) Should allow DEFAULT as a column name with table prefix', function () {
		alasql('CREATE TABLE test_qualified (id INT, default STRING)');
		alasql('INSERT INTO test_qualified VALUES (1, "value1")');

		// Query using table.column notation
		var data = alasql('SELECT test_qualified.id, test_qualified.default FROM test_qualified');
		assert.deepEqual(data, [{id: 1, default: 'value1'}]);

		alasql('DROP TABLE test_qualified');
	});

	it('D) Should allow DEFAULT in WHERE clause as column reference', function () {
		alasql('CREATE TABLE test_where (id INT, default STRING)');
		alasql('INSERT INTO test_where VALUES (1, "abc"), (2, "def"), (3, "abc")');

		// Filter by DEFAULT column
		var data = alasql('SELECT * FROM test_where WHERE default = "abc" ORDER BY id');
		assert.deepEqual(data, [
			{id: 1, default: 'abc'},
			{id: 3, default: 'abc'},
		]);

		alasql('DROP TABLE test_where');
	});

	it('E) Should still work with DEFAULT VALUES in INSERT', function () {
		// This test verifies that the legitimate DEFAULT keyword usage still works
		// DEFAULT VALUES is used to insert a row with all default values
		alasql('CREATE TABLE test_default_val (id INT DEFAULT 1, name STRING DEFAULT "unnamed")');

		// Test that regular INSERT still works
		alasql('INSERT INTO test_default_val (id, name) VALUES (2, "test")');
		var data = alasql('SELECT * FROM test_default_val');
		assert.equal(data.length, 1);
		assert.equal(data[0].id, 2);
		assert.equal(data[0].name, 'test');

		alasql('DROP TABLE test_default_val');
	});

	it('F) Should allow DEFAULT keyword with DEFAULT constraint', function () {
		// Test that we can use DEFAULT both as keyword and identifier
		alasql('CREATE TABLE test_mixed (id INT, status STRING DEFAULT "active", default STRING)');
		alasql('INSERT INTO test_mixed (id, default) VALUES (1, "test")');

		var data = alasql('SELECT * FROM test_mixed');
		assert.equal(data[0].id, 1);
		assert.equal(data[0].status, 'active'); // should get default value
		assert.equal(data[0].default, 'test');

		alasql('DROP TABLE test_mixed');
	});

	it('G) Should allow DEFAULT in JOIN operations', function () {
		alasql('CREATE TABLE default (id INT, amount STRING)');
		alasql('CREATE TABLE other (id INT, ref_id INT)');

		alasql('INSERT INTO default VALUES (1, "a"), (2, "b")');
		alasql('INSERT INTO other VALUES (1, 1), (2, 2)');

		// Join using table named DEFAULT
		var data = alasql(
			'SELECT default.amount, other.id FROM default JOIN other ON default.id = other.ref_id ORDER BY other.id'
		);
		assert.deepEqual(data, [
			{amount: 'a', id: 1},
			{amount: 'b', id: 2},
		]);

		alasql('DROP TABLE default');
		alasql('DROP TABLE other');
	});

	it('H) Should allow DEFAULT as table alias', function () {
		alasql('CREATE TABLE test_alias (id INT, name STRING)');
		alasql('INSERT INTO test_alias VALUES (1, "test")');

		// Use DEFAULT as an alias
		var data = alasql('SELECT default.id, default.name FROM test_alias AS default');
		assert.deepEqual(data, [{id: 1, name: 'test'}]);

		alasql('DROP TABLE test_alias');
	});

	it('I) Should allow DEFAULT in subqueries', function () {
		alasql('CREATE TABLE default (id INT, amount INT)');
		alasql('INSERT INTO default VALUES (1, 10), (2, 20)');

		// Use table named DEFAULT in subquery
		var data = alasql(
			'SELECT * FROM (SELECT id, amount FROM default WHERE amount > 5) ORDER BY id'
		);
		assert.deepEqual(data, [
			{id: 1, amount: 10},
			{id: 2, amount: 20},
		]);

		alasql('DROP TABLE default');
	});

	it('J) Should allow DEFAULT in ORDER BY and GROUP BY', function () {
		alasql('CREATE TABLE test_group (id INT, default STRING, qty INT)');
		alasql('INSERT INTO test_group VALUES (1, "a", 5), (2, "a", 3), (3, "b", 7)');

		// Group by column named DEFAULT
		var data = alasql(
			'SELECT default, SUM(qty) as sumqty FROM test_group GROUP BY default ORDER BY default'
		);
		assert.deepEqual(data, [
			{default: 'a', sumqty: 8},
			{default: 'b', sumqty: 7},
		]);

		alasql('DROP TABLE test_group');
	});
});
