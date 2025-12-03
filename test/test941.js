if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 941 - GROUP BY with duplicate column names', function () {
	it('A) GROUP BY on same column twice with different aliases', function () {
		var accounts = [{name: 'A', region_id: 1}, {name: 'B', region_id: 2}];

		var result = alasql(
			'SELECT accounts.name AS `AccountName`, accounts.name AS `AccountName2`, COUNT(1) AS `Count` FROM ? accounts GROUP BY accounts.name',
			[accounts]
		);

		var expected = [
			{AccountName: 'A', AccountName2: 'A', Count: 1},
			{AccountName: 'B', AccountName2: 'B', Count: 1},
		];
		assert.deepEqual(result, expected);
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

		var expected = [
			{AccountName: 'A', RegionName: 'North', Count: 1},
			{AccountName: 'B', RegionName: 'South', Count: 1},
		];
		assert.deepEqual(result, expected);
	});

	it('C) GROUP BY on same column three times', function () {
		var data = [{x: 1}, {x: 2}];

		var result = alasql('SELECT x AS a, x AS b, x AS c, COUNT(1) AS cnt FROM ? GROUP BY x', [
			data,
		]);

		var expected = [
			{a: 1, b: 1, c: 1, cnt: 1},
			{a: 2, b: 2, c: 2, cnt: 1},
		];
		assert.deepEqual(result, expected);
	});
});
