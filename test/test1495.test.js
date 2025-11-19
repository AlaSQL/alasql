// @ts-ignore
import {describe, test, expect, beforeEach} from 'bun:test';
import alasql from '..';

describe('mysql TIMESTAMPDIFF', () => {
	var res;

	beforeEach(() => {
		alasql.options.mysql = true;
	});

	test('should return the difference in months between 2 dates when called with month as a unit', () => {
		res = alasql("SELECT TIMESTAMPDIFF(MONTH, '2018-04-01', '2018-05-01') as result");

		expect(res[0].result).toEqual(1);
	});

	test('should return the difference in days between 2 dates when called with day as a unit', () => {
		res = alasql("SELECT TIMESTAMPDIFF(DAY, '2018-04-01', '2018-05-01') as result");

		expect(res[0].result).toEqual(30);
	});

	test('should return the difference in years between 2 dates when called with year as a unit', () => {
		res = alasql("SELECT TIMESTAMPDIFF(YEAR, '2018-04-01', '2018-05-01') as result");

		expect(res[0].result).toEqual(0);
	});
});
