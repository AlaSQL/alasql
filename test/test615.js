// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 615 - Read empty and non-empty excel files', function () {
	test('A) Load empty excel file', function (done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test615.xlsx")', [], function (res) {
			assert.equal(res.length, 0);
			done();
		});
	});

	test('B) Load non-empty excel file', function (done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
			var dataPresent = res.length > 0;
			assert.ok(dataPresent);
			done();
		});
	});
});
