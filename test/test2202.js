if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2202 - VALUE(S) reserved keyword context', function () {
	const testId = '2202';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Should allow "value" as a JSON property in CREATE INDEX', function () {
		alasql('CREATE TABLE test1(data JSON)');
		// This should not throw - "value" should be allowed as a JSON property name
		alasql('CREATE INDEX idx_value on test1(data->value)');

		alasql('INSERT INTO test1 VALUES (@{value:100})');
		alasql('INSERT INTO test1 VALUES (@{value:200})');

		var res = alasql('SELECT * FROM test1 ORDER BY data->value');
		assert.equal(res.length, 2);
		assert.deepEqual(res, [{data: {value: 100}}, {data: {value: 200}}]);
	});

	// Note: Using "value" as a STANDALONE column name (not as a JSON property)
	// conflicts with VALUE->property syntax in CHECK constraints (test231).
	// The original issue (#2202) was about data->value in CREATE INDEX, which works.
	// See tests A, F, G, H for JSON property usage.

	it('B) Should allow "values" as a column name', function () {
		alasql('CREATE TABLE test2(id INT, values VARCHAR(50))');
		alasql('INSERT INTO test2 VALUES (1, "data1")');
		alasql('INSERT INTO test2 VALUES (2, "data2")');

		var res = alasql('SELECT id, values FROM test2 ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, values: 'data1'},
			{id: 2, values: 'data2'},
		]);
	});

	it('C) Should still work with VALUE OF SELECT', function () {
		alasql('CREATE TABLE test3(amount INT)');
		alasql('INSERT INTO test3 VALUES (100), (200), (300)');

		var res = alasql('VALUE OF SELECT MAX(amount) FROM test3');
		assert.equal(res, 300);
	});

	it('D) Should still work with SELECT VALUE (alternative notation)', function () {
		alasql('CREATE TABLE test4(amount INT)');
		alasql('INSERT INTO test4 VALUES (100), (200), (300)');

		// Test SELECT VALUE notation
		var res = alasql('SELECT VALUE MAX(amount) FROM test4');
		assert.equal(res, 300);

		// Test that it returns a single value, not an array
		assert.equal(typeof res, 'number');
	});

	it('E) Should still work with VALUES in INSERT', function () {
		alasql('CREATE TABLE test5(id INT, name VARCHAR(50))');
		alasql('INSERT INTO test5 VALUES (1, "Alice"), (2, "Bob")');

		var res = alasql('SELECT * FROM test5 ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, name: 'Alice'},
			{id: 2, name: 'Bob'},
		]);
	});

	it('F) Should allow "value" in UNIQUE constraint with JSON property', function () {
		alasql('CREATE TABLE test6(data JSON, UNIQUE(data->value))');

		alasql('INSERT INTO test6 VALUES (@{value:1})');

		// This should fail - duplicate value
		assert.throws(() => {
			alasql('INSERT INTO test6 VALUES (@{value:1})');
		}, Error);

		// This should succeed - different value
		alasql('INSERT INTO test6 VALUES (@{value:2})');

		var res = alasql('SELECT * FROM test6');
		assert.equal(res.length, 2);
	});

	it('G) Should allow "values" as a JSON property name', function () {
		alasql('CREATE TABLE test7(data JSON)');
		alasql('CREATE INDEX idx_values on test7(data->values)');

		alasql('INSERT INTO test7 VALUES (@{values:100})');
		alasql('INSERT INTO test7 VALUES (@{values:200})');

		var res = alasql('SELECT * FROM test7 ORDER BY data->values');
		assert.equal(res.length, 2);
		assert.deepEqual(res, [{data: {values: 100}}, {data: {values: 200}}]);
	});

	it('H) Should work with the original issue example: data->value in CREATE INDEX', function () {
		// This is the exact scenario from issue 2202 that was failing
		alasql(`
			CREATE TABLE BOM5(id INT, data JSON);
			CREATE UNIQUE INDEX idx_id on BOM5(id);
			CREATE INDEX idx_data on BOM5(data->value);
			INSERT INTO BOM5 VALUES (1, @{value:100});
			INSERT INTO BOM5 VALUES (2, @{value:100});
			INSERT INTO BOM5 VALUES (3, @{value:200});
		`);

		var res = alasql('SELECT * FROM BOM5 ORDER BY id');
		assert.equal(res.length, 3);
		assert.deepEqual(res, [
			{id: 1, data: {value: 100}},
			{id: 2, data: {value: 100}},
			{id: 3, data: {value: 200}},
		]);
	});
});
