if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1042 - promiseExec callback parameter order', function () {
	const test = '1042';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Callback should use standard (err, data) parameter order for success', function (done) {
		alasql('CREATE TABLE test_table (a int)', [], function (err, data) {
			assert.strictEqual(err, null, 'Error should be null on success');
			assert.strictEqual(data, 1, 'Data should be 1 for CREATE TABLE');
			done();
		});
	});

	it('B) Callback should use standard (err, data) parameter order for errors', function (done) {
		alasql('set errorlog on');
		alasql('SELECT * FROM nonexistent_table', [], function (err, data) {
			assert(err instanceof Error, 'First parameter should be an Error object');
			assert(/Table does not exist/.test(err.message), 'Error message should indicate table does not exist');
			assert(data === undefined || data === null, 'Data should be undefined or null on error');
			done();
		});
	});

	it('C) Promise should reject with error and resolve with data', function () {
		return alasql
			.promise('CREATE TABLE promise_test (b int)')
			.then(function (data) {
				assert.strictEqual(data, 1, 'Promise should resolve with data');
				return alasql.promise('SELECT * FROM promise_test');
			})
			.then(function (data) {
				assert(Array.isArray(data), 'Promise should resolve with array');
				assert.strictEqual(data.length, 0, 'Table should be empty');
			});
	});

	it('D) Promise should properly reject on error', function () {
		alasql('set errorlog on');
		return alasql
			.promise('SELECT * FROM another_nonexistent_table')
			.then(
				function (err, data) {
					throw new Error('Promise should have rejected but resolved instead');
				},
				function (err) {
					assert(err instanceof Error, 'Promise should reject with Error object');
					assert(
						/Table does not exist/.test(err.message),
						'Error message should indicate table does not exist'
					);
				}
			);
	});

	it('E) Multiple statements with callback should use standard parameter order', function (done) {
		var sql = 'CREATE TABLE multi_test (c int);';
		sql += 'INSERT INTO multi_test VALUES (1),(2),(3);';
		sql += 'SELECT * FROM multi_test;';
		alasql(sql, function (err, data) {
			assert.strictEqual(err, null, 'Error should be null on success');
			assert(Array.isArray(data), 'Data should be an array of results');
			assert.strictEqual(data.length, 3, 'Should have 3 results');
			assert.strictEqual(data[0], 1, 'First result should be 1 (CREATE TABLE)');
			assert.strictEqual(data[1], 3, 'Second result should be 3 (INSERT count)');
			assert(Array.isArray(data[2]), 'Third result should be SELECT result array');
			assert.strictEqual(data[2].length, 3, 'SELECT should return 3 rows');
			done();
		});
	});

	it('F) Simple query with callback should use standard parameter order', function (done) {
		alasql('INSERT INTO test_table VALUES (10),(20),(30)', [], function (err, data) {
			assert.strictEqual(err, null, 'Error should be null on success');
			assert.strictEqual(data, 3, 'Should insert 3 rows');

			alasql('SELECT * FROM test_table ORDER BY a', [], function (err, data) {
				assert.strictEqual(err, null, 'Error should be null on success');
				assert(Array.isArray(data), 'Data should be an array');
				assert.strictEqual(data.length, 3, 'Should return 3 rows');
				assert.deepEqual(
					data,
					[{a: 10}, {a: 20}, {a: 30}],
					'Should return correct data'
				);
				done();
			});
		});
	});
});
