// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 490 - PIVOT with SELECT *', () => {
	const testId = '490';

	// Define the test data once
	const data = [
		{VendorId: 'SPIKE', IncomeDay: 'FRI', IncomeAmount: 100},
		{VendorId: 'SPIKE', IncomeDay: 'MON', IncomeAmount: 300},
		{VendorId: 'FREDS', IncomeDay: 'SUN', IncomeAmount: 400},
		{VendorId: 'SPIKE', IncomeDay: 'WED', IncomeAmount: 500},
		{VendorId: 'SPIKE', IncomeDay: 'TUE', IncomeAmount: 200},
		{VendorId: 'JOHNS', IncomeDay: 'WED', IncomeAmount: 900},
		{VendorId: 'SPIKE', IncomeDay: 'FRI', IncomeAmount: 100},
		{VendorId: 'JOHNS', IncomeDay: 'MON', IncomeAmount: 300},
		{VendorId: 'SPIKE', IncomeDay: 'SUN', IncomeAmount: 400},
		{VendorId: 'JOHNS', IncomeDay: 'FRI', IncomeAmount: 300},
		{VendorId: 'FREDS', IncomeDay: 'TUE', IncomeAmount: 500},
		{VendorId: 'FREDS', IncomeDay: 'TUE', IncomeAmount: 200},
		{VendorId: 'SPIKE', IncomeDay: 'MON', IncomeAmount: 900},
		{VendorId: 'FREDS', IncomeDay: 'FRI', IncomeAmount: 900},
		{VendorId: 'FREDS', IncomeDay: 'MON', IncomeAmount: 500},
		{VendorId: 'JOHNS', IncomeDay: 'SUN', IncomeAmount: 600},
		{VendorId: 'SPIKE', IncomeDay: 'FRI', IncomeAmount: 300},
		{VendorId: 'SPIKE', IncomeDay: 'WED', IncomeAmount: 500},
		{VendorId: 'SPIKE', IncomeDay: 'FRI', IncomeAmount: 300},
		{VendorId: 'JOHNS', IncomeDay: 'THU', IncomeAmount: 800},
		{VendorId: 'JOHNS', IncomeDay: 'SAT', IncomeAmount: 800},
		{VendorId: 'SPIKE', IncomeDay: 'TUE', IncomeAmount: 100},
		{VendorId: 'SPIKE', IncomeDay: 'THU', IncomeAmount: 300},
		{VendorId: 'FREDS', IncomeDay: 'WED', IncomeAmount: 500},
		{VendorId: 'SPIKE', IncomeDay: 'SAT', IncomeAmount: 100},
		{VendorId: 'FREDS', IncomeDay: 'SAT', IncomeAmount: 500},
		{VendorId: 'FREDS', IncomeDay: 'THU', IncomeAmount: 800},
		{VendorId: 'JOHNS', IncomeDay: 'TUE', IncomeAmount: 600},
	];

	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId);
		alasql('USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('A) PIVOT with SELECT * and AVG aggregation', () => {
		var res = alasql('SELECT * FROM ? PIVOT (AVG(IncomeAmount) FOR IncomeDay)', [data]);

		var expectedResult = [
			{VendorId: 'SPIKE', FRI: 200, MON: 600, WED: 500, TUE: 150, SUN: 400, THU: 300, SAT: 100},
			{VendorId: 'FREDS', SUN: 400, TUE: 350, FRI: 900, MON: 500, WED: 500, SAT: 500, THU: 800},
			{VendorId: 'JOHNS', WED: 900, MON: 300, FRI: 300, SUN: 600, THU: 800, SAT: 800, TUE: 600},
		];

		expect(res).toEqual(
			expectedResult,
			'PIVOT with SELECT * and AVG should produce the correct aggregated table'
		);
	});

	test('B) PIVOT with SELECT * and SUM aggregation', () => {
		var res = alasql('SELECT * FROM ? PIVOT (SUM(IncomeAmount) FOR IncomeDay)', [data]);

		var expectedResult = [
			{VendorId: 'SPIKE', FRI: 800, MON: 1200, SUN: 400, WED: 1000, TUE: 300, THU: 300, SAT: 100},
			{VendorId: 'FREDS', SUN: 400, TUE: 700, FRI: 900, MON: 500, WED: 500, SAT: 500, THU: 800},
			{VendorId: 'JOHNS', WED: 900, MON: 300, FRI: 300, SUN: 600, THU: 800, SAT: 800, TUE: 600},
		];

		expect(res).toEqual(
			expectedResult,
			'PIVOT with SELECT * and SUM should produce the correct aggregated table'
		);
	});
});
