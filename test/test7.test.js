// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe.skip('Test 7 - ORDER BY on multiple UNIONs', () => {
	const testId = '7'; // Issue number

	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId);
		alasql('USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('A) Three UNION ALL with ORDER BY DESC', () => {
		var sql = 'SELECT 10 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// According to issue #7, the current output might be [ { a: 10 }, { a: 30 }, { a: 20 } ]
		// The expected correct output is:
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		expect(res).toEqual(expected, 'ORDER BY DESC on three UNION ALL');
	});

	test('B) Three UNION ALL with ORDER BY ASC', () => {
		var sql = 'SELECT 30 AS a UNION ALL SELECT 10 AS a UNION ALL SELECT 20 AS a ORDER BY a ASC';
		var res = alasql(sql);
		var expected = [{a: 10}, {a: 20}, {a: 30}];
		expect(res).toEqual(expected, 'ORDER BY ASC on three UNION ALL');
	});

	test('C) Four UNION ALL with ORDER BY DESC', () => {
		var sql =
			'SELECT 10 AS a UNION ALL SELECT 40 AS a UNION ALL SELECT 20 AS a UNION ALL SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		var expected = [{a: 40}, {a: 30}, {a: 20}, {a: 10}];
		expect(res).toEqual(expected, 'ORDER BY DESC on four UNION ALL');
	});

	test('D) Four UNION with ORDER BY DESC (checks DISTINCT implicitly)', () => {
		var sql =
			'SELECT 10 AS a UNION SELECT 20 AS a UNION SELECT 10 AS a UNION SELECT 30 AS a ORDER BY a DESC';
		var res = alasql(sql);
		// UNION removes duplicates before ordering
		var expected = [{a: 30}, {a: 20}, {a: 10}];
		expect(res).toEqual(expected, 'ORDER BY DESC on four UNION');
	});

	test('E) More complex data types', () => {
		var sql =
			"SELECT 'apple' AS fruit UNION ALL SELECT 'cherry' AS fruit UNION ALL SELECT 'banana' AS fruit ORDER BY fruit ASC";
		var res = alasql(sql);
		var expected = [{fruit: 'apple'}, {fruit: 'banana'}, {fruit: 'cherry'}];
		expect(res).toEqual(expected, 'ORDER BY ASC on strings with three UNION ALL');
	});

	test('F) Multiple columns', () => {
		var sql =
			'SELECT 10 AS a, 100 AS b UNION ALL SELECT 20 AS a, 50 AS b UNION ALL SELECT 10 AS a, 200 AS b ORDER BY a ASC, b DESC';
		var res = alasql(sql);
		var expected = [
			{a: 10, b: 200},
			{a: 10, b: 100},
			{a: 20, b: 50},
		];
		expect(res).toEqual(expected, 'Multiple columns ORDER BY on three UNION ALL');
	});
});
