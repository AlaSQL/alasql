// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 609 - Insert into table ', () => {
	test('values', () => {
		alasql.parse('insert into abc values (1,2,3)');
	});

	test('value', () => {
		alasql.parse('insert into abc value (1,2,3)');
	});

	test('(skip values)', () => {
		alasql.parse('insert into abc (1,2,3)');
	});
});
