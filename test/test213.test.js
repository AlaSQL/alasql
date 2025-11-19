// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 213 CONVERT data types', () => {
	test('1. INT', done => {
		alasql('SELECT VALUE CONVERT(INT,123.45)', [], function (res) {
			expect(res === 123).toBe(true);
			done();
		});
	});

	test('2. NUMBER', done => {
		alasql('SELECT VALUE CONVERT(NUMBER,"123.45")', [], function (res) {
			expect(res === 123.45).toBe(true);
			done();
		});
	});

	test('3. STRING', done => {
		alasql('SELECT VALUE CONVERT(STRING,123.45)', [], function (res) {
			expect(res === '123.45').toBe(true);
			done();
		});
	});

	test('4. BOOLEAN', done => {
		alasql('SELECT VALUE CONVERT(BOOLEAN,0)', [], function (res) {
			expect(res === false).toBe(true);
			done();
		});
	});

	test('5. VARCHAR', done => {
		var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abcdefghijklmnopqrstuvwxyz")');
		expect(res === 'abcde').toBe(true);
		var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abc")');
		expect(res === 'abc').toBe(true);
		done();
	});

	test('6. CHAR', done => {
		alasql('SELECT VALUE CONVERT(CHAR(5),"abc")', [], function (res) {
			expect(res === 'abc  ').toBe(true);
			done();
		});
	});
});
