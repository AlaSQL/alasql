// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
describe('Test 431 error in 8 and 108 convert formats', () => {
	test('1. Should format time correctly', done => {
		var date = new Date(2016, 0, 1, 0, 0, 0);
		var correctTime = '00:00:00';
		var res = alasql('SELECT VALUE CONVERT(STRING, ?, 108)', [date]);
		expect(res).toEqual(correctTime);
		res = alasql('SELECT VALUE CONVERT(STRING, ?, 8)', [date]);
		expect(res).toEqual(correctTime);

		done();
	});
});
