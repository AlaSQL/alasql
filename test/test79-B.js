if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 79-B - GROUP BY with no matching rows', function () {
	const test = '79-B';

	it('A) GROUP BY returns empty result when no rows meet condition', function () {
		// Original issue: SELECT with GROUP BY should return [] when WHERE clause matches no rows
		var res = alasql('SELECT Name FROM ? WHERE 1=0 GROUP BY Name', [[{Name: 'test'}]]);
		assert.deepStrictEqual(res, []);
	});

	it('B) GROUP BY with aggregate returns empty result when no rows meet condition', function () {
		var res = alasql('SELECT Name, COUNT(*) as cnt FROM ? WHERE 1=0 GROUP BY Name', [
			[{Name: 'test'}],
		]);
		assert.deepStrictEqual(res, []);
	});

	it('C) GROUP BY on empty dataset returns empty result', function () {
		var res = alasql('SELECT Name FROM ? GROUP BY Name', [[]]);
		assert.deepStrictEqual(res, []);
	});

	it('D) GROUP BY with multiple columns and no matches returns empty result', function () {
		var res = alasql('SELECT Name, Type FROM ? WHERE 1=0 GROUP BY Name, Type', [
			[{Name: 'test', Type: 'A'}],
		]);
		assert.deepStrictEqual(res, []);
	});

	it('E) Aggregate without GROUP BY returns one row with default values when no rows match', function () {
		// This is the correct SQL behavior - aggregates without GROUP BY return one row
		var res = alasql('SELECT COUNT(*) as cnt FROM ? WHERE 1=0', [[{Name: 'test'}]]);
		assert.deepStrictEqual(res, [{cnt: 0}]);
	});

	it('F) Aggregate without GROUP BY on empty dataset returns one row', function () {
		// This is the correct SQL behavior - aggregates without GROUP BY return one row
		var res = alasql('SELECT COUNT(*) as cnt FROM ?', [[]]);
		assert.deepStrictEqual(res, [{cnt: 0}]);
	});

	it('G) GROUP BY with valid data returns correct results', function () {
		// Sanity check that GROUP BY still works correctly with matching data
		var res = alasql('SELECT Name FROM ? WHERE 1=1 GROUP BY Name', [[{Name: 'test'}]]);
		assert.deepStrictEqual(res, [{Name: 'test'}]);
	});

	it('H) GROUP BY with multiple groups returns correct results', function () {
		var data = [
			{Name: 'Alice', Type: 'A'},
			{Name: 'Bob', Type: 'B'},
			{Name: 'Alice', Type: 'A'},
		];
		var res = alasql('SELECT Name, COUNT(*) as cnt FROM ? GROUP BY Name ORDER BY Name', [data]);
		assert.deepStrictEqual(res, [
			{Name: 'Alice', cnt: 2},
			{Name: 'Bob', cnt: 1},
		]);
	});
});
