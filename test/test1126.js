if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1126 GROUP_ROW_NUMBER()', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test1126;USE test1126');
		done();
	});

	it('2. Basic GROUP_ROW_NUMBER() - per group row numbering', function (done) {
		var data = [
			{category: 'A', value: 10},
			{category: 'A', value: 20},
			{category: 'A', value: 30},
			{category: 'B', value: 40},
			{category: 'B', value: 50},
			{category: 'C', value: 60},
		];
		// GROUP_ROW_NUMBER() numbers rows within groups defined by consecutive matching values
		// when used with ORDER BY
		var res = alasql(
			'SELECT category, value, GROUP_ROW_NUMBER() AS rn FROM ? ORDER BY category, value',
			[data]
		);
		assert.deepEqual(res, [
			{category: 'A', value: 10, rn: 1},
			{category: 'A', value: 20, rn: 2},
			{category: 'A', value: 30, rn: 3},
			{category: 'B', value: 40, rn: 1},
			{category: 'B', value: 50, rn: 2},
			{category: 'C', value: 60, rn: 1},
		]);
		done();
	});

	it('3. Use GROUP_ROW_NUMBER() to get first N rows per group', function (done) {
		alasql('CREATE TABLE test_data (category STRING, value INT)');
		alasql('INSERT INTO test_data VALUES ("X", 1), ("X", 2), ("X", 3), ("Y", 10), ("Y", 20)');

		var res = alasql(
			'SELECT * FROM (SELECT category, value, GROUP_ROW_NUMBER() AS rn FROM test_data GROUP BY category) WHERE rn <= 2 ORDER BY category, value'
		);
		assert.deepEqual(res, [
			{category: 'X', value: 1, rn: 1},
			{category: 'X', value: 2, rn: 2},
			{category: 'Y', value: 10, rn: 1},
			{category: 'Y', value: 20, rn: 2},
		]);

		alasql('DROP TABLE test_data');
		done();
	});

	it('4. ROW_NUMBER() should still work for entire result set', function (done) {
		var data = [
			{category: 'A', value: 10},
			{category: 'A', value: 20},
			{category: 'B', value: 30},
		];
		var res = alasql('SELECT category, value, ROW_NUMBER() AS rn FROM ?', [data]);
		assert.deepEqual(res, [
			{category: 'A', value: 10, rn: 1},
			{category: 'A', value: 20, rn: 2},
			{category: 'B', value: 30, rn: 3},
		]);
		done();
	});

	it('5. Multiple groups with GROUP_ROW_NUMBER()', function (done) {
		var data = [
			{dept: 'Sales', team: 'A', name: 'John'},
			{dept: 'Sales', team: 'A', name: 'Jane'},
			{dept: 'Sales', team: 'B', name: 'Bob'},
			{dept: 'IT', team: 'A', name: 'Alice'},
			{dept: 'IT', team: 'A', name: 'Charlie'},
		];
		var res = alasql(
			'SELECT dept, team, name, GROUP_ROW_NUMBER() AS rn FROM ? GROUP BY dept, team ORDER BY dept, team, name',
			[data]
		);
		assert.deepEqual(res, [
			{dept: 'IT', team: 'A', name: 'Alice', rn: 1},
			{dept: 'IT', team: 'A', name: 'Charlie', rn: 2},
			{dept: 'Sales', team: 'A', name: 'Jane', rn: 1},
			{dept: 'Sales', team: 'A', name: 'John', rn: 2},
			{dept: 'Sales', team: 'B', name: 'Bob', rn: 1},
		]);
		done();
	});

	it('6. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test1126');
		done();
	});
});
