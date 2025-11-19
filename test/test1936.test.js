// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1936 - Check CURDATE', () => {
	test('CURDATE in SELECT - as Date', () => {
		alasql.options.dateAsString = false;
		let result = alasql(
			'SELECT CURDATE AS date1, CURRENT_DATE AS date2, CURDATE(), CURRENT_DATE()'
		);

		expect(result[0]['date1'] instanceof Date).toBe(true);
		expect(result[0]['date1'].getHours()).toBe(0);
		expect(result[0]['date1'].getMinutes()).toBe(0);
		expect(result[0]['date1'].getSeconds()).toBe(0);

		expect(result[0]['date2'] instanceof Date).toBe(true);
		expect(result[0]['date2'].getHours()).toBe(0);
		expect(result[0]['date2'].getMinutes()).toBe(0);
		expect(result[0]['date2'].getSeconds()).toBe(0);

		expect(result[0]['CURDATE()'] instanceof Date).toBe(true);
		expect(result[0]['CURDATE()'].getHours()).toBe(0);
		expect(result[0]['CURDATE()'].getMinutes()).toBe(0);
		expect(result[0]['CURDATE()'].getSeconds()).toBe(0);

		expect(result[0]['CURRENT_DATE()'] instanceof Date).toBe(true);
		expect(result[0]['CURRENT_DATE()'].getHours()).toBe(0);
		expect(result[0]['CURRENT_DATE()'].getMinutes()).toBe(0);
		expect(result[0]['CURRENT_DATE()'].getSeconds()).toBe(0);
	});

	test('CURDATE in SELECT - as String', () => {
		alasql.options.dateAsString = true;
		let result = alasql(
			'SELECT CURDATE AS date1, CURRENT_DATE AS date2, CURDATE(), CURRENT_DATE()'
		);

		expect(typeof result[0]['date1'] === 'string').toBe(true);
		expect(!result[0]['date1'].includes('00:00:00')).toBe(true);

		expect(typeof result[0]['date2'] === 'string').toBe(true);
		expect(!result[0]['date2'].includes('00:00:00')).toBe(true);

		expect(typeof result[0]['CURDATE()'] === 'string').toBe(true);
		expect(!result[0]['CURDATE()'].includes('00:00:00')).toBe(true);

		expect(typeof result[0]['CURRENT_DATE()'] === 'string').toBe(true);
		expect(!result[0]['CURRENT_DATE()'].includes('00:00:00')).toBe(true);
	});
});
