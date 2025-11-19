// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 615 - Read empty and non-empty excel files', () => {
	test('A) Load empty excel file', done => {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test615.xlsx")', [], function (res) {
			expect(res.length).toEqual(0);
			done();
		});
	});

	test('B) Load non-empty excel file', done => {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
			var dataPresent = res.length > 0;
			expect(dataPresent).toBe(true);
			done();
		});
	});
});
