// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 804 - alasql.use on non-existant DB', function () {
	test("Don't set alasql.useid to non-existant DB", function () {
		try {
			alasql.use('NotRealDatabase');
		} catch (error) {}
		assert.notEqual(alasql.useid, 'NotRealDatabase');
	});
});
