// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// valid csv headers no data no newline character so should force a file read attempt
var TEST_NO_DATA = 'a, b, c, d';
var TEST_VALID_DATA = 'a, b, c, d\n1,2,3,4';
var BAD_FILE_PATH = '/tmp/largemargesentme.csv';
var BAD_URL = 'http://lzkdjf;zldkfj';

describe('Test PromiseExec', () => {
	var res;

	test('A) csvload with no csv data, expect rejected promise', () => {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_NO_DATA])
			.then(() => {
				//no-op, expect exception
			})
			.catch(function (e) {
				res = e;
				expect(res instanceof Error === true, 'Expected exception').toBe(true);
			});
	});
	test('B) csvload with valid data, expect array length 1', () => {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_VALID_DATA])
			.then(function (res) {
				expect(res.length === 1, 'Expected array of size 1 returned').toBe(true);
			})
			.catch(function (e) {
				throw e;
			});
	});
	test('C) csvload with bad file path, expect exception', () => {
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_FILE_PATH)
			.then(() => {
				//no-op, expect exception
			})
			.catch(function (e) {
				res = e;
				expect(res instanceof Error === true, 'Expected exception').toBe(true);
			});
	});
	test('D) csvload with bad URL, expect some kind of response', () => {
		// ISPs deal with bad URL's differently.  Some will return a 400, while others won't do anything.
		// This is testing that the promise functionality doesn't swallow errors, so it should be OK to just test for
		// a non null response.
		res = alasql
			.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_URL)
			.then(function (res) {
				expect(res !== undefined, 'Expected resppnse').toBe(true);
			})
			.catch(function (e) {
				expect(e instanceof Error === true, 'Expected exception').toBe(true);
			});
	});
});
