if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2362 - UNION with ORDER BY in first SELECT', function () {
	const test = '2362';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) ORDER BY before UNION should work', function () {
		var foreignCompetitors = [
			{country: 'USA', name: 'John'},
			{country: 'UK', name: 'Jane'},
			{country: 'USA', name: 'Bob'},
			{country: 'France', name: 'Pierre'},
			{country: 'UK', name: 'Alice'},
		];

		// This is the exact query from the issue
		var res = alasql(
			`SELECT country, COUNT(*) AS competitors
			FROM ?
			GROUP BY country
			ORDER BY country
			UNION
			SELECT "Total: " AS country, COUNT(*) AS competitors
			FROM ?`,
			[foreignCompetitors, foreignCompetitors]
		);

		// The result should have the grouped countries plus the total row
		// Since it's UNION (not UNION ALL), duplicates are removed
		assert(res.length >= 3); // At least 3 countries + total
	});

	it('B) Simplified case - ORDER BY before UNION', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		// Simpler test case
		var res = alasql(`SELECT a FROM ? WHERE a < 3 ORDER BY a UNION SELECT a FROM ? WHERE a > 1`, [
			data,
			data,
		]);

		// Should not throw a parse error
		assert(res.length > 0);
	});
});
