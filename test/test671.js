if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 671 - UNION with ORDER BY', function () {
	const test = '671';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) UNION ALL with ORDER BY on alias', function () {
		var projects = [
			{projectID: 1, Date1: '2023-01-01', Date2: '2023-02-01'},
			{projectID: 2, Date1: '2023-03-01', Date2: '2023-01-15'},
			{projectID: 3, Date1: '2023-02-01', Date2: '2023-04-01'},
		];

		var res = alasql(
			'SELECT projectID, Date1 as theDate FROM $0 UNION ALL SELECT projectID, Date2 as theDate FROM $0 ORDER BY theDate',
			[projects]
		);

		assert.equal(res.length, 6);
		// Verify correct ascending order
		assert.equal(res[0].theDate, '2023-01-01');
		assert.equal(res[1].theDate, '2023-01-15');
		assert.equal(res[2].theDate, '2023-02-01');
		assert.equal(res[3].theDate, '2023-02-01');
		assert.equal(res[4].theDate, '2023-03-01');
		assert.equal(res[5].theDate, '2023-04-01');
	});

	it('B) UNION ALL with ORDER BY DESC', function () {
		var projects = [
			{projectID: 1, Date1: '2023-01-01', Date2: '2023-02-01'},
			{projectID: 2, Date1: '2023-03-01', Date2: '2023-01-15'},
		];

		var res = alasql(
			'SELECT projectID, Date1 as theDate FROM $0 UNION ALL SELECT projectID, Date2 as theDate FROM $0 ORDER BY theDate DESC',
			[projects]
		);

		assert.equal(res.length, 4);
		// Verify correct descending order
		assert.equal(res[0].theDate, '2023-03-01');
		assert.equal(res[1].theDate, '2023-02-01');
		assert.equal(res[2].theDate, '2023-01-15');
		assert.equal(res[3].theDate, '2023-01-01');
	});

	it('C) UNION with ORDER BY (removes duplicates)', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 3, b: 'z'},
		];

		var res = alasql(
			'SELECT a FROM $0 WHERE a < 3 UNION SELECT a FROM $0 WHERE a > 1 ORDER BY a DESC',
			[data]
		);

		assert.equal(res.length, 3);
		assert.equal(res[0].a, 3);
		assert.equal(res[1].a, 2);
		assert.equal(res[2].a, 1);
	});

	it('D) UNION ALL with multiple ? parameters', function () {
		var data1 = [
			{id: 1, value: 'a'},
			{id: 2, value: 'b'},
		];
		var data2 = [
			{id: 3, value: 'c'},
			{id: 4, value: 'd'},
		];

		var res = alasql('SELECT id, value FROM ? UNION ALL SELECT id, value FROM ? ORDER BY id', [
			data1,
			data2,
		]);

		assert.equal(res.length, 4);
		assert.equal(res[0].id, 1);
		assert.equal(res[1].id, 2);
		assert.equal(res[2].id, 3);
		assert.equal(res[3].id, 4);
	});
});
