// @ts-ignore
import {describe, test, expect, beforeAll} from 'bun:test';
import alasql from '..';

describe('Test 2147 - Aggregate functions on DATETIME', () => {
	beforeAll(() => {
		alasql.options.errorlog = true;
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

	test('MAX on DATETIME', done => {
		var res = alasql(
			'SELECT id, MAX(DATETIME(date)) as maxDate, COUNT(*) as cnt FROM ? GROUP BY id;',
			[data]
		);

		var expected = [
			{id: 1, maxDate: new Date('2025-01-03T01:00:00.000Z'), cnt: 3},
			{id: 2, maxDate: new Date('2025-02-02T01:00:00.000Z'), cnt: 2},
			{id: 3, maxDate: new Date('2025-03-01T01:00:00.000Z'), cnt: 1},
		];

		expect(res).toEqual(expected);
		done();
	});

	test('MIN on DATETIME', done => {
		var res = alasql(
			'SELECT id, MIN(DATETIME(date)) as minDate, COUNT(*) as cnt FROM ? GROUP BY id;',
			[data]
		);

		var expected = [
			{id: 1, minDate: new Date('2025-01-01T01:00:00.000Z'), cnt: 3},
			{id: 2, minDate: new Date('2025-02-01T01:00:00.000Z'), cnt: 2},
			{id: 3, minDate: new Date('2025-03-01T01:00:00.000Z'), cnt: 1},
		];

		expect(res).toEqual(expected);
		done();
	});

	test('MIN and MAX together on DATETIME', done => {
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

		expect(res).toEqual(expected);
		done();
	});

	test('COUNT on DATETIME - natural behavior', done => {
		// COUNT should work naturally with dates
		var res = alasql('SELECT id, COUNT(DATETIME(date)) as dateCount FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, dateCount: 3},
			{id: 2, dateCount: 2},
			{id: 3, dateCount: 1},
		];

		expect(res).toEqual(expected);
		done();
	});

	test('SUM on DATETIME - returns undefined for semantic correctness', done => {
		// SUM on Date objects doesn't make semantic sense, so it returns undefined
		var res = alasql('SELECT id, SUM(DATETIME(date)) as sumTimestamps FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, sumTimestamps: undefined},
			{id: 2, sumTimestamps: undefined},
			{id: 3, sumTimestamps: undefined},
		];

		expect(res).toEqual(expected);
		done();
	});

	test('AVG on DATETIME - returns undefined for semantic correctness', done => {
		// AVG on Date objects doesn't make semantic sense, so it returns undefined
		var res = alasql('SELECT id, AVG(DATETIME(date)) as avgTimestamp FROM ? GROUP BY id;', [data]);

		var expected = [
			{id: 1, avgTimestamp: undefined},
			{id: 2, avgTimestamp: undefined},
			{id: 3, avgTimestamp: undefined},
		];

		expect(res).toEqual(expected);
		done();
	});
});
