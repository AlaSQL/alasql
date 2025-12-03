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

	it('D) SELECT * with GROUP BY and duplicate column in SELECT', function () {
		var data = [{x: 1, y: 'a'}, {x: 1, y: 'b'}, {x: 2, y: 'c'}];

		var result = alasql('SELECT *, x AS x_copy, COUNT(1) AS cnt FROM ? GROUP BY x', [data]);

		var expected = [
			{x: 1, y: 'a', x_copy: 1, cnt: 2},
			{x: 2, y: 'c', x_copy: 2, cnt: 1},
		];
		assert.deepEqual(result, expected);
	});

	it('E) Multiple aggregates with duplicate column names', function () {
		var data = [{x: 1, val: 10}, {x: 1, val: 20}, {x: 2, val: 30}];

		var result = alasql(
			'SELECT x AS col1, x AS col2, SUM(val) AS `total`, AVG(val) AS avg FROM ? GROUP BY x',
			[data]
		);

		var expected = [
			{col1: 1, col2: 1, total: 30, avg: 15},
			{col1: 2, col2: 2, total: 30, avg: 30},
		];
		assert.deepEqual(result, expected);
	});

	it('F) Duplicate column with different aggregates', function () {
		var data = [{x: 1, y: 10}, {x: 1, y: 20}, {x: 2, y: 30}];

		var result = alasql(
			'SELECT x AS grp1, x AS grp2, MAX(y) AS max_y, MIN(y) AS min_y FROM ? GROUP BY x',
			[data]
		);

		var expected = [
			{grp1: 1, grp2: 1, max_y: 20, min_y: 10},
			{grp1: 2, grp2: 2, max_y: 30, min_y: 30},
		];
		assert.deepEqual(result, expected);
	});

	it('G) GROUP BY multiple columns with duplicates in SELECT', function () {
		var data = [
			{a: 1, b: 'x', c: 100},
			{a: 1, b: 'y', c: 200},
			{a: 2, b: 'x', c: 300},
		];

		var result = alasql(
			'SELECT a AS a1, a AS a2, b AS b1, b AS b2, SUM(c) AS `total` FROM ? GROUP BY a, b',
			[data]
		);

		var expected = [
			{a1: 1, a2: 1, b1: 'x', b2: 'x', total: 100},
			{a1: 1, a2: 1, b1: 'y', b2: 'y', total: 200},
			{a1: 2, a2: 2, b1: 'x', b2: 'x', total: 300},
		];
		assert.deepEqual(result, expected);
	});

	it('H) Duplicate columns with HAVING clause', function () {
		var data = [{x: 1}, {x: 1}, {x: 2}];

		var result = alasql(
			'SELECT x AS col1, x AS col2, COUNT(1) AS cnt FROM ? GROUP BY x HAVING COUNT(1) > 1',
			[data]
		);

		var expected = [{col1: 1, col2: 1, cnt: 2}];
		assert.deepEqual(result, expected);
	});

	it('I) Duplicate columns in subquery with GROUP BY', function () {
		var data = [{x: 1}, {x: 1}, {x: 2}];

		var result = alasql(
			'SELECT col1, col2, cnt FROM (SELECT x AS col1, x AS col2, COUNT(1) AS cnt FROM ? GROUP BY x) WHERE cnt > 0',
			[data]
		);

		var expected = [
			{col1: 1, col2: 1, cnt: 2},
			{col1: 2, col2: 2, cnt: 1},
		];
		assert.deepEqual(result, expected);
	});

	it('J) Duplicate columns with both qualified and unqualified names', function () {
		var data = [{x: 1, y: 'a'}, {x: 2, y: 'b'}];

		var result = alasql(
			'SELECT d.x AS x1, x AS x2, COUNT(1) AS cnt FROM ? d GROUP BY d.x',
			[data]
		);

		var expected = [
			{x1: 1, x2: 1, cnt: 1},
			{x1: 2, x2: 2, cnt: 1},
		];
		assert.deepEqual(result, expected);
	});

	it('K) Multiple duplicate columns from different aggregations', function () {
		var data = [{x: 1, a: 10, b: 5}, {x: 1, a: 20, b: 15}, {x: 2, a: 30, b: 25}];

		var result = alasql(
			'SELECT x AS id1, x AS id2, SUM(a) AS sum_a, SUM(b) AS sum_b, AVG(a) AS avg_a FROM ? GROUP BY x',
			[data]
		);

		var expected = [
			{id1: 1, id2: 1, sum_a: 30, sum_b: 20, avg_a: 15},
			{id1: 2, id2: 2, sum_a: 30, sum_b: 25, avg_a: 30},
		];
		assert.deepEqual(result, expected);
	});

	it('L) Duplicate columns with DISTINCT', function () {
		var data = [{x: 1}, {x: 1}, {x: 2}];

		var result = alasql(
			'SELECT DISTINCT x AS col1, x AS col2 FROM ? ORDER BY x',
			[data]
		);

		var expected = [
			{col1: 1, col2: 1},
			{col1: 2, col2: 2},
		];
		assert.deepEqual(result, expected);
	});
});
});
