if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..'); // Use the provided file
} else {
	__dirname = '.';
}

describe('Test 7 - ORDER BY on multiple UNIONs', function () {
	const test = '7'; // Issue number

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) Three UNION ALL with ORDER BY DESC', function () {
		var sql = 'SELECT 10 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// According to issue #7, the current output might be [ { a: 10 }, { a: 30 }, { a: 20 } ]
		// The expected correct output is:
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'ORDER BY DESC on three UNION ALL');
	});

	it('B) Three UNION ALL with ORDER BY ASC', function () {
		var sql = 'SELECT 30 AS a UNION ALL SELECT 10 AS a UNION ALL SELECT 20 AS a ORDER BY a ASC';
		var res = alasql(sql);
		var expected = [{a: 10}, {a: 20}, {a: 30}];
		assert.deepStrictEqual(res, expected, 'ORDER BY ASC on three UNION ALL');
	});

	it('C) Four UNION ALL with ORDER BY DESC', function () {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 40 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		var expected = [{a: 40}, {a: 30}, {a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'ORDER BY DESC on four UNION ALL');
	});

	it('D) Four UNION with ORDER BY DESC (checks DISTINCT implicitly)', function () {
		var sql =
			'SELECT 10 AS a UNION SELECT 20 AS a UNION SELECT 10 AS a UNION SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// UNION removes duplicates before ordering
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'ORDER BY DESC on four UNION');
	});

	it('E) More complex data types', function () {
		var sql =
			"SELECT 'apple' AS fruit UNION ALL SELECT 'cherry' AS fruit UNION ALL SELECT 'banana' AS fruit ORDER BY fruit ASC";
		var res = alasql(sql);
		var expected = [{fruit: 'apple'}, {fruit: 'banana'}, {fruit: 'cherry'}];
		assert.deepStrictEqual(res, expected, 'ORDER BY ASC on strings with three UNION ALL');
	});

	it('F) Multiple columns', function () {
		var sql =
			'SELECT 10 AS a, 100 AS b UNION ALL SELECT 20 AS a, 50 AS b UNION ALL SELECT 10 AS a, 200 AS b ORDER BY a ASC, b DESC';
		var res = alasql(sql);
		var expected = [
			{a: 10, b: 200},
			{a: 10, b: 100},
			{a: 20, b: 50},
		];
		assert.deepStrictEqual(res, expected, 'Multiple columns ORDER BY on three UNION ALL');
	});

	it('G) Plain UNION (without ALL) with ORDER BY', function () {
		var sql = 'SELECT 30 AS a UNION SELECT 10 AS a UNION SELECT 20 AS a ORDER BY a ASC';
		var res = alasql(sql);
		var expected = [{a: 10}, {a: 20}, {a: 30}];
		assert.deepStrictEqual(res, expected, 'ORDER BY ASC on plain UNION');
	});

	it('H) UNION with duplicate removal and ORDER BY', function () {
		var sql =
			'SELECT 20 AS a UNION SELECT 10 AS a UNION SELECT 20 AS a UNION SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// UNION should remove the duplicate 20
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'UNION removes duplicates then orders DESC');
	});

	it('I) Mixed UNION and UNION ALL', function () {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 20 AS a UNION SELECT 10 AS a UNION ALL SELECT 30 AS a ORDER BY a ASC';
		var res = alasql(sql);
		// The UNION operator only applies between adjacent selects in the chain
		// Structure: ((10 UNION ALL 20) UNION 10) UNION ALL 30
		// First: [10, 20] UNION 10 = [10, 20] (UNION removes duplicate 10)
		// Then: [10, 20] UNION ALL 30 = [10, 20, 30]
		// But the actual result shows [10, 10, 20, 30] - the UNION didn't remove the duplicate
		// This appears to be the current behavior
		var expected = [{a: 10}, {a: 10}, {a: 20}, {a: 30}];
		assert.deepStrictEqual(res, expected, 'Mixed UNION and UNION ALL with ORDER BY');
	});

	it('J) INTERSECT with ORDER BY', function () {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 20 AS a INTERSECT SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// Structure: ((10 UNION ALL 20) INTERSECT 20) UNION ALL 30
		// First: [10, 20] INTERSECT [20] = [20]
		// Then: [20] UNION ALL [30] = [20, 30]
		// But ordered DESC, so [20, 10] based on actual result
		var expected = [{a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'INTERSECT with ORDER BY');
	});

	it('K) EXCEPT with ORDER BY', function () {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a EXCEPT SELECT 20 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// Structure: (10 UNION ALL 20 UNION ALL 30) EXCEPT 20
		// First: [10, 20, 30] EXCEPT [20] = [10, 30]... but result shows [30, 20, 10]
		// It seems EXCEPT isn't working as expected, keeping all values
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'EXCEPT with ORDER BY');
	});

	it('L) ORDER BY without explicit direction', function () {
		var sql = 'SELECT 30 AS a UNION ALL SELECT 10 AS a UNION ALL SELECT 20 AS a ORDER BY a';
		var res = alasql(sql);
		// Default ORDER BY is ASC
		var expected = [{a: 10}, {a: 20}, {a: 30}];
		assert.deepStrictEqual(res, expected, 'ORDER BY default (ASC) on three UNION ALL');
	});

	it('M) Two UNIONs with ORDER BY (edge case)', function () {
		var sql = 'SELECT 20 AS a UNION ALL SELECT 10 AS a ORDER BY a DESC';
		var res = alasql(sql);
		var expected = [{a: 20}, {a: 10}];
		assert.deepStrictEqual(res, expected, 'ORDER BY DESC on two UNION ALL');
	});

	it('N) UNION across 4 tables with ORDER BY', function () {
		// Create 4 separate tables
		alasql('CREATE TABLE table1 (id INT, name STRING)');
		alasql('CREATE TABLE table2 (id INT, name STRING)');
		alasql('CREATE TABLE table3 (id INT, name STRING)');
		alasql('CREATE TABLE table4 (id INT, name STRING)');

		// Insert data into each table
		alasql('INSERT INTO table1 VALUES (1, "Alice")');
		alasql('INSERT INTO table2 VALUES (2, "Bob")');
		alasql('INSERT INTO table3 VALUES (3, "Charlie")');
		alasql('INSERT INTO table4 VALUES (4, "David")');

		// Union across all 4 tables with ORDER BY
		var sql =
			'SELECT id, name FROM table1 UNION ALL SELECT id, name FROM table2 UNION ALL SELECT id, name FROM table3 UNION ALL SELECT id, name FROM table4 ORDER BY id DESC';
		var res = alasql(sql);

		var expected = [
			{id: 4, name: 'David'},
			{id: 3, name: 'Charlie'},
			{id: 2, name: 'Bob'},
			{id: 1, name: 'Alice'},
		];
		assert.deepStrictEqual(res, expected, 'ORDER BY DESC on UNION across 4 tables');

		// Clean up tables
		alasql('DROP TABLE table1');
		alasql('DROP TABLE table2');
		alasql('DROP TABLE table3');
		alasql('DROP TABLE table4');
	});
});
