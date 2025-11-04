var alasql = require('../dist/alasql.js');
alasql.options.errorlog = true;
var assert = require('assert');

describe('Test 2147 - Aggregate functions on DATETIME', function () {
	before(function () {
		alasql.fn.DATETIME = function (date) {
			return new Date(date);
		};
	});

	var data = [
		{id: 1, date: '2025-01-01T01:00:00.000Z'},
		{id: 1, date: '2025-01-02T01:00:00.000Z'},
		{id: 1, date: '2025-01-03T01:00:00.000Z'},
		{id: 2, date: '2025-02-01T01:00:00.000Z'},
		{id: 2, date: '2025-02-02T01:00:00.000Z'},
		{id: 3, date: '2025-03-01T01:00:00.000Z'},
	];

	it('MAX on DATETIME', function (done) {
		var res = alasql(
			'SELECT id, MAX(DATETIME(date)) as maxDate, COUNT(*) as cnt FROM ? GROUP BY id;',
			[data]
		);

		var expected = [
			{id: 1, maxDate: new Date('2025-01-03T01:00:00.000Z'), cnt: 3},
			{id: 2, maxDate: new Date('2025-02-02T01:00:00.000Z'), cnt: 2},
			{id: 3, maxDate: new Date('2025-03-01T01:00:00.000Z'), cnt: 1},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('MIN on DATETIME', function (done) {
		var res = alasql(
			'SELECT id, MIN(DATETIME(date)) as minDate, COUNT(*) as cnt FROM ? GROUP BY id;',
			[data]
		);

		var expected = [
			{id: 1, minDate: new Date('2025-01-01T01:00:00.000Z'), cnt: 3},
			{id: 2, minDate: new Date('2025-02-01T01:00:00.000Z'), cnt: 2},
			{id: 3, minDate: new Date('2025-03-01T01:00:00.000Z'), cnt: 1},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('MIN and MAX together on DATETIME', function (done) {
		// Both MIN and MAX now work correctly with Date objects
		var res = alasql(
			'SELECT id, MIN(DATETIME(date)) as minDate, MAX(DATETIME(date)) as maxDate FROM ? GROUP BY id;',
			[data]
		);

		var expected = [
			{
				id: 1,
				minDate: new Date('2025-01-01T01:00:00.000Z'),
				maxDate: new Date('2025-01-03T01:00:00.000Z'),
			},
			{
				id: 2,
				minDate: new Date('2025-02-01T01:00:00.000Z'),
				maxDate: new Date('2025-02-02T01:00:00.000Z'),
			},
			{
				id: 3,
				minDate: new Date('2025-03-01T01:00:00.000Z'),
				maxDate: new Date('2025-03-01T01:00:00.000Z'),
			},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('COUNT on DATETIME - natural behavior', function (done) {
		// COUNT should work naturally with dates
		var res = alasql('SELECT id, COUNT(DATETIME(date)) as dateCount FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, dateCount: 3},
			{id: 2, dateCount: 2},
			{id: 3, dateCount: 1},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('SUM on DATETIME - returns undefined for semantic correctness', function (done) {
		// SUM on Date objects doesn't make semantic sense, so it returns undefined
		var res = alasql('SELECT id, SUM(DATETIME(date)) as sumTimestamps FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, sumTimestamps: undefined},
			{id: 2, sumTimestamps: undefined},
			{id: 3, sumTimestamps: undefined},
		];

		assert.deepEqual(res, expected);
		done();
	});

	it('AVG on DATETIME - returns undefined for semantic correctness', function (done) {
		// AVG on Date objects doesn't make semantic sense, so it returns undefined
		var res = alasql('SELECT id, AVG(DATETIME(date)) as avgTimestamp FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, avgTimestamp: undefined},
			{id: 2, avgTimestamp: undefined},
			{id: 3, avgTimestamp: undefined},
		];

		assert.deepEqual(res, expected);
		done();
	});
});
