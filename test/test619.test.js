// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// Test for issue #917

describe('Test 619 calling aggregate functions on empty sets', () => {
	var testId = 619;

	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Should always return undefined', () => {
		var res = alasql('SELECT STDDEV(col) AS Result FROM ? WHERE 1=0', [[{col: 1}, {col: 2}]]);
		expect(res[0]['Result']).toEqual(undefined);
	});
});
