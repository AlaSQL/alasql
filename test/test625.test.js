// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 625', function () {
	test('1. Get sheet by position 0', function (done) {
		alasql
			.promise(`select * from xlsx("${__dirname}/test625.xlsx",{sheetid:0})`)
			.then(function (data) {
				assert.equal(data[0]['Data'], 'In.Sheet1');
				done();
			});
	});
	test('2. Get sheet by position 3', function (done) {
		alasql
			.promise(`select * from xlsx("${__dirname}/test625.xlsx",{sheetid:3})`)
			.then(function (data) {
				assert.equal(data[0]['Data'], 'In.Unknown');
				done();
			});
	});
});
