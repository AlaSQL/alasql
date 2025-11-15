// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window === 'object' && false) {

describe('Test 168a - read XLSX', () => {
	test('1. Read XLSX file', done => {
		var res = alasql(
			'select * from xlsx("' + __dirname + '/test168.xlsx",{headers:false})',
			[],
			function (res) {
				expect(res.length == 6).toBe(true);
				//			console.log(res);
				done();
			}
		);
	});

	test('2. Read XLSX file with Headers', done => {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				expect(res).toEqual(['Mexico', 'Moscow']);
				done();
			}
		);
	});

	test('3. Read XLSX file with Headers and range', done => {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true, range:"A1:B3"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				expect(res).toEqual(['Moscow']);
				done();
			}
		);
	});

	test('4. Read XLSX file with Headers and sheet', done => {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true, sheetid: "USA", range:"A1:B6"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				expect(res).toEqual(['New York']);
				done();
			}
		);
	});
});

describe('Test 168b - read XLS', () => {
	test('1. Read XLS file', done => {
		var res = alasql(
			'select * from xls("' + __dirname + '/test168.xls",{headers:false})',
			[],
			function (res) {
				expect(res.length == 6).toBe(true);
				//			console.log(res);
				done();
			}
		);
	});

	test('2. Read XLS file with Headers', done => {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				expect(res).toEqual(['Mexico', 'Moscow']);
				done();
			}
		);
	});

	test('3. Read XLS file with Headers and range', done => {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true, range:"A1:B3"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				expect(res).toEqual(['Moscow']);
				done();
			}
		);
	});

	test('4. Read XLS file with Headers and sheet', done => {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true, sheetid: "USA", range:"A1:B6"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				expect(res).toEqual(['New York']);
				done();
			}
		);
	});
});
//}
