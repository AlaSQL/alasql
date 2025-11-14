// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	// Test only for browsers

	describe('Test 279 IE9 tests', function () {
		test('1. Detect if it is IE9', function (done) {
			var data = [
				{city: 'London', population: 5000000},
				{city: 'Moscow', population: 12000000},
			];
			//    alasql('SELECT * INTO TSV("aaa.txt",{headers:true}) FROM ?',[data]);
			//    alasql('SELECT * INTO XLS("aaa.xls",{headers:true}) FROM ?',[data]);
			alasql('SELECT * INTO XLSXML("' + __dirname + '/restest279.xls",{headers:true}) FROM ?', [
				data,
			]);
			done();
		});
	});
}
