if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1126 ROW_NUMBER() with PARTITION BY', function () {
	before(function () {
		alasql('CREATE DATABASE test1126;USE test1126');
	});

	after(function () {
		alasql('DROP DATABASE test1126');
	});

	it('1. Basic ROW_NUMBER() OVER (PARTITION BY) - SQL-99 syntax', function (done) {
		var data = [
			{category: 'A', amount: 10},
			{category: 'A', amount: 20},
			{category: 'A', amount: 30},
			{category: 'B', amount: 40},
			{category: 'B', amount: 50},
			{category: 'C', amount: 60},
		];
		var res = alasql(
			'SELECT category, amount, ROW_NUMBER() OVER (PARTITION BY category) AS rn FROM ? ORDER BY category, amount',
			[data]
		);
		assert.deepStrictEqual(res, [
			{category: 'A', amount: 10, rn: 1},
			{category: 'A', amount: 20, rn: 2},
			{category: 'A', amount: 30, rn: 3},
			{category: 'B', amount: 40, rn: 1},
			{category: 'B', amount: 50, rn: 2},
			{category: 'C', amount: 60, rn: 1},
		]);
		done();
	});

	it('2. Use ROW_NUMBER() with PARTITION BY to get first N rows per group', function (done) {
		alasql('CREATE TABLE test_data (category STRING, amount INT)');
		alasql('INSERT INTO test_data VALUES ("X", 1), ("X", 2), ("X", 3), ("Y", 10), ("Y", 20)');

		var res = alasql(
			'SELECT * FROM (SELECT category, amount, ROW_NUMBER() OVER (PARTITION BY category) AS rn FROM test_data ORDER BY category, amount) WHERE rn <= 2'
		);
		assert.deepStrictEqual(res, [
			{category: 'X', amount: 1, rn: 1},
			{category: 'X', amount: 2, rn: 2},
			{category: 'Y', amount: 10, rn: 1},
			{category: 'Y', amount: 20, rn: 2},
		]);

		alasql('DROP TABLE test_data');
		done();
	});

	it('3. ROW_NUMBER() without OVER should still work for entire result set', function (done) {
		var data = [
			{category: 'A', amount: 10},
			{category: 'A', amount: 20},
			{category: 'B', amount: 30},
		];
		var res = alasql('SELECT category, amount, ROW_NUMBER() AS rn FROM ?', [data]);
		assert.deepStrictEqual(res, [
			{category: 'A', amount: 10, rn: 1},
			{category: 'A', amount: 20, rn: 2},
			{category: 'B', amount: 30, rn: 3},
		]);
		done();
	});

	it('4. Multi-column PARTITION BY', function (done) {
		var data = [
			{dept: 'IT', team: 'A', name: 'Alice'},
			{dept: 'IT', team: 'A', name: 'Charlie'},
			{dept: 'IT', team: 'B', name: 'Dave'},
			{dept: 'Sales', team: 'A', name: 'Jane'},
			{dept: 'Sales', team: 'A', name: 'John'},
		];
		var res = alasql(
			'SELECT dept, team, name, ROW_NUMBER() OVER (PARTITION BY dept, team) AS rn FROM ? ORDER BY dept, team, name',
			[data]
		);
		assert.deepStrictEqual(res, [
			{dept: 'IT', team: 'A', name: 'Alice', rn: 1},
			{dept: 'IT', team: 'A', name: 'Charlie', rn: 2},
			{dept: 'IT', team: 'B', name: 'Dave', rn: 1},
			{dept: 'Sales', team: 'A', name: 'Jane', rn: 1},
			{dept: 'Sales', team: 'A', name: 'John', rn: 2},
		]);
		done();
	});

	it('5. Get top 2 per group with complex ordering', function (done) {
		var data = [
			{dept: 'Sales', score: 100},
			{dept: 'Sales', score: 95},
			{dept: 'Sales', score: 90},
			{dept: 'IT', score: 98},
			{dept: 'IT', score: 92},
			{dept: 'IT', score: 85},
		];
		var res = alasql(
			'SELECT * FROM (SELECT dept, score, ROW_NUMBER() OVER (PARTITION BY dept) AS rn FROM ? ORDER BY dept, score DESC) WHERE rn <= 2',
			[data]
		);
		assert.deepStrictEqual(res, [
			{dept: 'IT', score: 98, rn: 1},
			{dept: 'IT', score: 92, rn: 2},
			{dept: 'Sales', score: 100, rn: 1},
			{dept: 'Sales', score: 95, rn: 2},
		]);
		done();
	});
});
