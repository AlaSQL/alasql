if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 926 - GROUP BY with duplicate column names', function () {
	const test = '926';

	it('A) GROUP BY on same column twice with different aliases', function () {
		var accounts = [{name: 'A', region_id: 1}, {name: 'B', region_id: 2}];

		var result = alasql(
			'SELECT accounts.name AS `AccountName`, accounts.name AS `AccountName2`, COUNT(1) AS `Count` FROM ? accounts GROUP BY accounts.name',
			[accounts]
		);

		// Both AccountName and AccountName2 should be present in the result
		assert(result.length === 2, 'Should have 2 rows');
		assert(
			result[0].hasOwnProperty('AccountName'),
			'AccountName should exist in first row'
		);
		assert(
			result[0].hasOwnProperty('AccountName2'),
			'AccountName2 should exist in first row'
		);
		assert(result[0].AccountName === 'A' || result[0].AccountName === 'B', 'AccountName value');
		assert(
			result[0].AccountName2 === 'A' || result[0].AccountName2 === 'B',
			'AccountName2 value'
		);
		assert(result[0].AccountName === result[0].AccountName2, 'Both should have same value');
	});

	it('B) GROUP BY with join on columns with same name', function () {
		var accounts = [{name: 'A', region_id: 1}, {name: 'B', region_id: 2}];

		var regions = [
			{id: 1, name: 'North'},
			{id: 2, name: 'South'},
		];

		var result = alasql(
			'SELECT accounts.name AS `AccountName`, regions.name AS `RegionName`, COUNT(1) AS `Count` FROM ? accounts LEFT JOIN ? regions ON accounts.region_id = regions.id GROUP BY accounts.name, regions.name',
			[accounts, regions]
		);

		assert(result.length === 2, 'Should have 2 rows');
		assert(result[0].hasOwnProperty('AccountName'), 'AccountName should exist');
		assert(result[0].hasOwnProperty('RegionName'), 'RegionName should exist');
		assert(result[0].hasOwnProperty('Count'), 'Count should exist');

		// Check values are correct
		var aRow = result.find(r => r.AccountName === 'A');
		var bRow = result.find(r => r.AccountName === 'B');
		assert(aRow, 'Should have row for A');
		assert(bRow, 'Should have row for B');
		assert(aRow.RegionName === 'North', 'A should be in North region');
		assert(bRow.RegionName === 'South', 'B should be in South region');
	});

	it('C) GROUP BY on same column three times', function () {
		var data = [{x: 1}, {x: 2}];

		var result = alasql(
			'SELECT x AS a, x AS b, x AS c, COUNT(1) AS cnt FROM ? GROUP BY x',
			[data]
		);

		assert(result.length === 2, 'Should have 2 rows');
		assert(result[0].hasOwnProperty('a'), 'a should exist');
		assert(result[0].hasOwnProperty('b'), 'b should exist');
		assert(result[0].hasOwnProperty('c'), 'c should exist');
		assert(result[0].a === result[0].b && result[0].b === result[0].c, 'All should be equal');
	});
});
