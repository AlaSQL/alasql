// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 804 - alasql.use on non-existant DB', () => {
	test("Don't set alasql.useid to non-existant DB", () => {
		try {
			alasql.use('NotRealDatabase');
		} catch (error) {}
		expect(alasql.useid).not.toEqual('NotRealDatabase');
	});
});
