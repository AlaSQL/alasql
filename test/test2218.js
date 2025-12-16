if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2218 - SOURCE keyword context', function () {
	const testId = '2218';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Should allow "source" as a table name', function () {
		alasql('CREATE TABLE source(id INT, data VARCHAR(50))');
		alasql('INSERT INTO source VALUES (1, "test1"), (2, "test2")');

		var res = alasql('SELECT * FROM source ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, data: 'test1'},
			{id: 2, data: 'test2'},
		]);
	});

	it('B) Should allow "source" as a column name', function () {
		alasql('CREATE TABLE test_col(id INT, source VARCHAR(50))');
		alasql('INSERT INTO test_col VALUES (1, "data1"), (2, "data2")');

		var res = alasql('SELECT id, source FROM test_col ORDER BY id');
		assert.deepEqual(res, [
			{id: 1, source: 'data1'},
			{id: 2, source: 'data2'},
		]);
	});

	it('C) Should allow "source" as a JSON property name', function () {
		alasql('CREATE TABLE test_json(data JSON)');
		alasql('CREATE INDEX idx_source on test_json(data->source)');

		alasql('INSERT INTO test_json VALUES (@{source:100})');
		alasql('INSERT INTO test_json VALUES (@{source:200})');

		var res = alasql('SELECT * FROM test_json ORDER BY data->source');
		assert.equal(res.length, 2);
		assert.deepEqual(res, [{data: {source: 100}}, {data: {source: 200}}]);
	});

	it('D) Should parse MERGE BY SOURCE syntax without error', function () {
		// Test that MERGE statement with BY SOURCE clause is properly parsed
		// The SOURCE keyword should be recognized in this context
		// We just verify it parses - actual MERGE functionality is tested elsewhere
		var sql = `
			MERGE tbl_target AS t
			USING tbl_source AS s
			ON t.id = s.id
			WHEN MATCHED THEN UPDATE SET t.name = s.name
			WHEN NOT MATCHED BY SOURCE AND t.name LIKE 'S%' THEN DELETE
			WHEN NOT MATCHED BY TARGET THEN INSERT VALUES (s.id, s.name)
		`;

		// This should not throw a parse error
		var parsed = alasql.parse(sql);
		assert.ok(parsed);
		// The parsed object should have statements array
		assert.ok(parsed.statements);
		assert.ok(parsed.statements.length > 0);
		// Check that it contains a MERGE statement with BY SOURCE clause
		assert.ok(parsed.statements[0].using);
	});

	it('E) Should work with source in UNIQUE constraint', function () {
		alasql('CREATE TABLE test_unique(id INT, source VARCHAR(50), UNIQUE(source))');

		alasql('INSERT INTO test_unique VALUES (1, "unique1")');

		// This should fail - duplicate source
		assert.throws(() => {
			alasql('INSERT INTO test_unique VALUES (2, "unique1")');
		}, Error);

		// This should succeed - different source
		alasql('INSERT INTO test_unique VALUES (3, "unique2")');

		var res = alasql('SELECT * FROM test_unique');
		assert.equal(res.length, 2);
	});

	it('F) Should allow "source" in table alias', function () {
		alasql('CREATE TABLE test_alias(id INT, data VARCHAR(50))');
		alasql('INSERT INTO test_alias VALUES (1, "test1")');

		var res = alasql('SELECT source.id, source.data FROM test_alias AS source');
		assert.deepEqual(res, [{id: 1, data: 'test1'}]);
	});

	it('G) Should work with "source" in WHERE clause', function () {
		alasql('CREATE TABLE test_where(id INT, source VARCHAR(50))');
		alasql('INSERT INTO test_where VALUES (1, "value1"), (2, "value2")');

		var res = alasql('SELECT * FROM test_where WHERE source = "value1"');
		assert.deepEqual(res, [{id: 1, source: 'value1'}]);
	});
});
