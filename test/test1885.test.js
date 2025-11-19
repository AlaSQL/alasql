// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1885 - consistent error messages for missing tables', () => {
	const testNum = '1885'; // insert test file number

	beforeAll(() => {
		alasql.options.errorlog = false; // Ensure errors are thrown, not just logged
		alasql('create database test' + testNum);
		alasql('use test' + testNum);
		alasql('CREATE TABLE validTable (a INT, b INT, PRIMARY KEY (a,b))');
	});

	afterAll(() => {
		alasql('drop database test' + testNum);
	});

	test('SELECT returns standard error message', () => {
		expect(() => alasql('select * from invalidTable')).toThrow({
			message: 'Table does not exist: invalidTable',
		});
	});

	test('JOIN ON returns standard error message', () => {
		expect(() =>
			alasql('select * from validTable JOIN invalidTable ON validTable.a = invalidTable.b')
		).toThrow({
			message: 'Table does not exist: invalidTable',
		});
	});

	test('JOIN USING returns standard error message', () => {
		expect(() => alasql('select * from validTable JOIN invalidTable USING a')).toThrow({
			message: 'Table does not exist: invalidTable',
		});
	});
});
