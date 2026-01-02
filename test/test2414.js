if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2414 - UNION with parenthesized SELECT and ORDER BY', function () {
	const test = '2414';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Parenthesized SELECT with ORDER BY before UNION', function () {
		var foreignCompetitors = [
			{country: 'USA', name: 'John'},
			{country: 'UK', name: 'Jane'},
			{country: 'USA', name: 'Bob'},
			{country: 'France', name: 'Pierre'},
			{country: 'UK', name: 'Alice'},
		];

		// SQL-99 compliant: parenthesized SELECT with ORDER BY before UNION
		var res = alasql(
			`(SELECT country, COUNT(*) AS competitors
			FROM ?
			GROUP BY country
			ORDER BY country)
			UNION
			SELECT "Total: " AS country, COUNT(*) AS competitors
			FROM ?`,
			[foreignCompetitors, foreignCompetitors]
		);

		// The result should have the grouped countries plus the total row
		// Since it's UNION (not UNION ALL), duplicates are removed
		assert(res.length >= 3); // At least 3 countries + total
	});

	it('B) Simplified case - parenthesized ORDER BY before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(`(SELECT a FROM ? WHERE a < 3 ORDER BY a) UNION SELECT a FROM ? WHERE a > 1`, [
			data,
			data,
		]);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('C) Parenthesized ORDER BY DESC before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a < 3 ORDER BY a DESC) UNION SELECT a FROM ? WHERE a > 2`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('D) Parenthesized LIMIT before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];

		var res = alasql(`(SELECT a FROM ? LIMIT 2) UNION SELECT a FROM ? WHERE a > 2`, [data, data]);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('E) Parenthesized ORDER BY and LIMIT before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];

		var res = alasql(
			`(SELECT a FROM ? ORDER BY a DESC LIMIT 2) UNION SELECT a FROM ? WHERE a < 2`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('F) Parenthesized ORDER BY before UNION with ORDER BY at end', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a < 3 ORDER BY a) UNION SELECT a FROM ? WHERE a > 1 ORDER BY a DESC`,
			[data, data]
		);

		// Should not throw a parse error, and final ORDER BY should take precedence
		assert(res.length > 0);
		// Result should be ordered descending (by final ORDER BY)
		if (res.length >= 2) {
			assert(res[0].a >= res[res.length - 1].a);
		}
	});

	it('G) Both SELECTs parenthesized with ORDER BY + LIMIT', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];

		var res = alasql(
			`(SELECT a FROM ? ORDER BY a LIMIT 2) UNION ALL (SELECT a FROM ? ORDER BY a DESC LIMIT 1)`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('H) UNION ALL with parenthesized ORDER BY', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a < 3 ORDER BY a) UNION ALL SELECT a FROM ? WHERE a > 1`,
			[data, data]
		);

		// Should not throw a parse error
		// UNION ALL keeps duplicates
		assert(res.length > 0);
	});

	it('I) EXCEPT with parenthesized ORDER BY', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a < 4 ORDER BY a) EXCEPT SELECT a FROM ? WHERE a = 2`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length >= 0);
	});

	it('J) INTERSECT with parenthesized ORDER BY', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a < 3 ORDER BY a) INTERSECT SELECT a FROM ? WHERE a > 0`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('K) Multiple UNIONs with parenthesized ORDER BY', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];

		var res = alasql(
			`(SELECT a FROM ? WHERE a = 1 ORDER BY a) UNION SELECT a FROM ? WHERE a = 2 UNION SELECT a FROM ? WHERE a = 3 ORDER BY a DESC`,
			[data, data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('L) Parenthesized ORDER BY with multiple columns before UNION', function () {
		var data = [
			{a: 1, b: 'x', c: 10},
			{a: 2, b: 'y', c: 20},
			{a: 3, b: 'z', c: 30},
		];

		var res = alasql(
			`(SELECT a, b FROM ? WHERE a < 3 ORDER BY b, a) UNION SELECT a, b FROM ? WHERE a > 2`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('M) Parenthesized ORDER BY with expression before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			`(SELECT a, b FROM ? WHERE a < 3 ORDER BY a * 2) UNION SELECT a, b FROM ? WHERE a > 2`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('N) Parenthesized LIMIT with OFFSET before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
			{a: 5, b: 'v'},
		];

		var res = alasql(
			`(SELECT a FROM ? ORDER BY a LIMIT 2 OFFSET 1) UNION SELECT a FROM ? WHERE a > 4`,
			[data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});

	it('O) UNION without parentheses and ORDER BY at end (standard behavior)', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		// This is the standard SQL-99 behavior: ORDER BY applies to the entire UNION result
		var res = alasql(
			`SELECT a FROM ? WHERE a < 3 UNION SELECT a FROM ? WHERE a > 1 ORDER BY a DESC`,
			[data, data]
		);

		// Should not throw a parse error, final ORDER BY applies to entire result
		assert(res.length > 0);
		if (res.length >= 2) {
			assert(res[0].a >= res[res.length - 1].a);
		}
	});

	it('P) Complex nested parenthesized UNIONs with ORDER BY', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
			{a: 4, b: 'w'},
		];

		var res = alasql(
			`((SELECT a FROM ? WHERE a = 1) UNION (SELECT a FROM ? WHERE a = 2 ORDER BY a)) UNION SELECT a FROM ? WHERE a > 2 ORDER BY a DESC`,
			[data, data, data]
		);

		// Should not throw a parse error
		assert(res.length > 0);
	});
});
