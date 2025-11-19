// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

const testId = '1983'; // insert test file number

describe('Test 1983 - multiple statements', () => {
	beforeAll(() => {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE a (anything string);');
	});

	afterAll(() => {
		alasql('drop database test' + testId);
	});

	test('USING followed by name', () => {
		expect(() => alasql('SELECT * FROM a a1 JOIN a a2 USING c;')).not.toThrow();
	});

	test('USING followed by name in parathesis', () => {
		expect(() => alasql('SELECT * FROM a a1 JOIN a a2 USING (c);')).not.toThrow();
	});
});
