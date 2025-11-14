// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 213 CONVERT data types', function () {
	test('1. INT', function (done) {
		alasql('SELECT VALUE CONVERT(INT,123.45)', [], function (res) {
			assert(res === 123);
			done();
		});
	});

	test('2. NUMBER', function (done) {
		alasql('SELECT VALUE CONVERT(NUMBER,"123.45")', [], function (res) {
			assert(res === 123.45);
			done();
		});
	});

	test('3. STRING', function (done) {
		alasql('SELECT VALUE CONVERT(STRING,123.45)', [], function (res) {
			assert(res === '123.45');
			done();
		});
	});

	test('4. BOOLEAN', function (done) {
		alasql('SELECT VALUE CONVERT(BOOLEAN,0)', [], function (res) {
			assert(res === false);
			done();
		});
	});

	test('5. VARCHAR', function (done) {
		var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abcdefghijklmnopqrstuvwxyz")');
		assert(res === 'abcde');
		var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abc")');
		assert(res === 'abc');
		done();
	});

	test('6. CHAR', function (done) {
		alasql('SELECT VALUE CONVERT(CHAR(5),"abc")', [], function (res) {
			assert(res === 'abc  ');
			done();
		});
	});
});
