if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1126 GROUP_ROW_NUMBER()', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test1126;USE test1126');
		done();
	});

	it('2. Basic GROUP_ROW_NUMBER() - per group row numbering with first column partitioning', function (done) {
		var data = [
			{category: 'A', amount: 10},
			{category: 'A', amount: 20},
			{category: 'A', amount: 30},
			{category: 'B', amount: 40},
			{category: 'B', amount: 50},
			{category: 'C', amount: 60},
		];
		// GROUP_ROW_NUMBER() numbers rows, restarting at 1 when the first selected column changes
		// Data should be pre-sorted by the grouping column(s)
		var res = alasql(
			'SELECT category, amount, GROUP_ROW_NUMBER() AS rn FROM ? ORDER BY category, amount',
			[data]
		);
		assert.deepEqual(res, [
			{category: 'A', amount: 10, rn: 1},
			{category: 'A', amount: 20, rn: 2},
			{category: 'A', amount: 30, rn: 3},
			{category: 'B', amount: 40, rn: 1},
			{category: 'B', amount: 50, rn: 2},
			{category: 'C', amount: 60, rn: 1},
		]);
		done();
	});

	it('3. Use GROUP_ROW_NUMBER() to get first N rows per group', function (done) {
		alasql('CREATE TABLE test_data (category STRING, amount INT)');
		alasql('INSERT INTO test_data VALUES ("X", 1), ("X", 2), ("X", 3), ("Y", 10), ("Y", 20)');

		var res = alasql(
			'SELECT * FROM (SELECT category, amount, GROUP_ROW_NUMBER() AS rn FROM test_data ORDER BY category, amount) WHERE rn <= 2'
		);
		assert.deepEqual(res, [
			{category: 'X', amount: 1, rn: 1},
			{category: 'X', amount: 2, rn: 2},
			{category: 'Y', amount: 10, rn: 1},
			{category: 'Y', amount: 20, rn: 2},
		]);

		alasql('DROP TABLE test_data');
		done();
	});

	it('4. ROW_NUMBER() should still work for entire result set', function (done) {
		var data = [
			{category: 'A', amount: 10},
			{category: 'A', amount: 20},
			{category: 'B', amount: 30},
		];
		var res = alasql('SELECT category, amount, ROW_NUMBER() AS rn FROM ?', [data]);
		assert.deepEqual(res, [
			{category: 'A', amount: 10, rn: 1},
			{category: 'A', amount: 20, rn: 2},
			{category: 'B', amount: 30, rn: 3},
		]);
		done();
	});

	it('5. GROUP_ROW_NUMBER() with multi-column grouping', function (done) {
		var data = [
			{dept: 'IT', team: 'A', name: 'Alice'},
			{dept: 'IT', team: 'A', name: 'Charlie'},
			{dept: 'IT', team: 'B', name: 'Dave'},
			{dept: 'Sales', team: 'A', name: 'Jane'},
			{dept: 'Sales', team: 'A', name: 'John'},
		];
		// When there are multiple columns, GROUP_ROW_NUMBER() partitions by the first column
		var res = alasql(
			'SELECT dept, team, name, GROUP_ROW_NUMBER() AS rn FROM ? ORDER BY dept, team, name',
			[data]
		);
		assert.deepEqual(res, [
			{dept: 'IT', team: 'A', name: 'Alice', rn: 1},
			{dept: 'IT', team: 'A', name: 'Charlie', rn: 2},
			{dept: 'IT', team: 'B', name: 'Dave', rn: 3},
			{dept: 'Sales', team: 'A', name: 'Jane', rn: 1},
			{dept: 'Sales', team: 'A', name: 'John', rn: 2},
		]);
		done();
	});

	it('6. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test1126');
		done();
	});
});
