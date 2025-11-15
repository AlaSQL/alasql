// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 242 Multi-columns Excel file', () => {
	test('1. Read multi-column file', done => {
		alasql(
			'select * from xlsx("' + __dirname + '/test242.xlsx",{headers:false})',
			[],
			function (data) {
				//      console.log(data[0]);
				expect(data[0].CV == 100).toBe(true);
				done();
			}
		);
	});

	test('2. Read multi-column file', done => {
		alasql(
			'select * from xlsx("' + __dirname + '/test242.xlsx", {headers:true,sheetid:"Sheet2"})',
			[],
			function (data) {
				//      console.log(data[3]);
				expect(data[3].five == 800).toBe(true);
				done();
			}
		);
	});
});
