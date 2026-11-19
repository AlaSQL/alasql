if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2260 - TIMEOUT keyword should be usable as identifier', function () {
	const test = '2260';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) TIMEOUT as column name in CREATE TABLE', function () {
		var res = alasql('CREATE TABLE test_timeout_col (id INT, timeout INT, name VARCHAR(50))');
		assert.strictEqual(res, 1);

		var insertRes = alasql("INSERT INTO test_timeout_col VALUES (1, 100, 'task1')");
		assert.strictEqual(insertRes, 1);

		var selectRes = alasql('SELECT * FROM test_timeout_col');
		assert.deepStrictEqual(selectRes, [{id: 1, timeout: 100, name: 'task1'}]);
	});

	it('B) TIMEOUT as table name', function () {
		var res = alasql('CREATE TABLE timeout (id INT, val VARCHAR(50))');
		assert.strictEqual(res, 1);

		var insertRes = alasql("INSERT INTO timeout VALUES (1, 'val1')");
		assert.strictEqual(insertRes, 1);

		var selectRes = alasql('SELECT * FROM timeout');
		assert.deepStrictEqual(selectRes, [{id: 1, val: 'val1'}]);
	});

	it('C) TIMEOUT column in INSERT with column list and SELECT', function () {
		alasql('CREATE TABLE t (id INT, timeout INT)');
		var insertRes = alasql('INSERT INTO t (timeout) VALUES (10)');
		assert.strictEqual(insertRes, 1);

		var selectRes = alasql('SELECT timeout FROM t');
		assert.deepStrictEqual(selectRes, [{timeout: 10}]);
	});

	it('D) TIMEOUT column with table prefix in SELECT', function () {
		var selectRes = alasql('SELECT t.timeout FROM t');
		assert.deepStrictEqual(selectRes, [{timeout: 10}]);
	});

	it('E) TIMEOUT column in WHERE clause', function () {
		alasql('INSERT INTO t (id, timeout) VALUES (2, 20), (3, 30)');
		var res = alasql('SELECT * FROM t WHERE timeout = 20');
		assert.deepStrictEqual(res, [{id: 2, timeout: 20}]);
	});

	it('F) TIMEOUT column in ORDER BY', function () {
		var res = alasql('SELECT timeout FROM t ORDER BY timeout DESC');
		assert.deepStrictEqual(res, [{timeout: 30}, {timeout: 20}, {timeout: 10}]);
	});

	it('G) TIMEOUT column in GROUP BY', function () {
		alasql('INSERT INTO t (id, timeout) VALUES (4, 20)');
		var res = alasql(
			'SELECT timeout, COUNT(*) AS cnt FROM t WHERE timeout IS NOT NULL GROUP BY timeout ORDER BY timeout'
		);
		assert.deepStrictEqual(res, [
			{timeout: 10, cnt: 1},
			{timeout: 20, cnt: 2},
			{timeout: 30, cnt: 1},
		]);
	});

	it('H) TIMEOUT column in UPDATE and DELETE', function () {
		alasql('INSERT INTO t (id, timeout) VALUES (1, 10)');
		alasql('UPDATE t SET timeout = 99 WHERE id = 1');
		var updated = alasql('SELECT timeout FROM t WHERE id = 1');
		assert.deepStrictEqual(updated, [{timeout: 99}]);

		alasql('DELETE FROM t WHERE timeout = 99');
		var deleted = alasql('SELECT timeout FROM t WHERE id = 1');
		assert.deepStrictEqual(deleted, []);
	});

	it('I) TIMEOUT as alias', function () {
		var res = alasql('SELECT 123 AS timeout');
		assert.deepStrictEqual(res, [{timeout: 123}]);
	});

	it('J) Join tables with TIMEOUT column', function () {
		alasql('CREATE TABLE t1 (id INT, timeout INT)');
		alasql('CREATE TABLE t2 (id INT, timeout INT)');
		alasql('INSERT INTO t1 VALUES (1, 10), (2, 20)');
		alasql('INSERT INTO t2 VALUES (1, 10), (3, 30)');

		var res = alasql('SELECT t1.id, t1.timeout FROM t1 JOIN t2 ON t1.timeout = t2.timeout');
		assert.deepStrictEqual(res, [{id: 1, timeout: 10}]);
	});

	it('K) JSON arrow access with timeout: data->timeout', function () {
		var data = [
			{id: 1, config: {timeout: 500}},
			{id: 2, config: {timeout: 1000}},
		];
		var res = alasql('SELECT config->timeout AS to_val FROM ?', [data]);
		assert.deepStrictEqual(res, [{to_val: 500}, {to_val: 1000}]);
	});

	it('L) Quoted TIMEOUT identifier [timeout]', function () {
		alasql('CREATE TABLE [timeout_quoted] ([timeout] INT)');
		alasql('INSERT INTO [timeout_quoted] VALUES (42)');
		var res = alasql('SELECT [timeout] FROM [timeout_quoted]');
		assert.deepStrictEqual(res, [{timeout: 42}]);
	});
});
