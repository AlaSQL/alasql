// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 609 - Insert into table ', function () {
	test('values', function () {
		alasql.parse('insert into abc values (1,2,3)');
	});

	test('value', function () {
		alasql.parse('insert into abc value (1,2,3)');
	});

	test('(skip values)', function () {
		alasql.parse('insert into abc (1,2,3)');
	});
});
