if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..'); // Use the provided file
} else {
	__dirname = '.';
}

describe.skip('Test 7 - ORDER BY on multiple UNIONs', function () {
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
		assert.deepEqual(res, expected, 'ORDER BY DESC on three UNION ALL');
	});

	it('B) Three UNION ALL with ORDER BY ASC', function () {
		var sql = 'SELECT 30 AS a UNION ALL SELECT 10 AS a UNION ALL SELECT 20 AS a ORDER BY a ASC';
		var res = alasql(sql);
		var expected = [{a: 10}, {a: 20}, {a: 30}];
		assert.deepEqual(res, expected, 'ORDER BY ASC on three UNION ALL');
	});

	it('C) Four UNION ALL with ORDER BY DESC', function () {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 40 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		var expected = [{a: 40}, {a: 30}, {a: 20}, {a: 10}];
		assert.deepEqual(res, expected, 'ORDER BY DESC on four UNION ALL');
	});

	it('D) Four UNION with ORDER BY DESC (checks DISTINCT implicitly)', function () {
		var sql =
			'SELECT 10 AS a UNION SELECT 20 AS a UNION SELECT 10 AS a UNION SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// UNION removes duplicates before ordering
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		assert.deepEqual(res, expected, 'ORDER BY DESC on four UNION');
	});

	it('E) More complex data types', function () {
		var sql =
			"SELECT 'apple' AS fruit UNION ALL SELECT 'cherry' AS fruit UNION ALL SELECT 'banana' AS fruit ORDER BY fruit ASC";
		var res = alasql(sql);
		var expected = [{fruit: 'apple'}, {fruit: 'banana'}, {fruit: 'cherry'}];
		assert.deepEqual(res, expected, 'ORDER BY ASC on strings with three UNION ALL');
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
		assert.deepEqual(res, expected, 'Multiple columns ORDER BY on three UNION ALL');
	});
});
