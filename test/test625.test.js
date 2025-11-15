// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 625', () => {
	test('1. Get sheet by position 0', done => {
		alasql
			.promise(`select * from xlsx("${__dirname}/test625.xlsx",{sheetid:0})`)
			.then(function (data) {
				expect(data[0]['Data']).toEqual('In.Sheet1');
				done();
			});
	});
	test('2. Get sheet by position 3', done => {
		alasql
			.promise(`select * from xlsx("${__dirname}/test625.xlsx",{sheetid:3})`)
			.then(function (data) {
				expect(data[0]['Data']).toEqual('In.Unknown');
				done();
			});
	});
});
