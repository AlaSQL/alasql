// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window === 'object' && false) {

describe('Test 168a - read XLSX', function () {
	test('1. Read XLSX file', function (done) {
		var res = alasql(
			'select * from xlsx("' + __dirname + '/test168.xlsx",{headers:false})',
			[],
			function (res) {
				assert(res.length == 6);
				//			console.log(res);
				done();
			}
		);
	});

	test('2. Read XLSX file with Headers', function (done) {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				assert.deepEqual(res, ['Mexico', 'Moscow']);
				done();
			}
		);
	});

	test('3. Read XLSX file with Headers and range', function (done) {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true, range:"A1:B3"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				assert.deepEqual(res, ['Moscow']);
				done();
			}
		);
	});

	test('4. Read XLSX file with Headers and sheet', function (done) {
		var res = alasql(
			'select column City from xlsx("' +
				__dirname +
				'/test168.xlsx",{headers:true, sheetid: "USA", range:"A1:B6"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				assert.deepEqual(res, ['New York']);
				done();
			}
		);
	});
});

describe('Test 168b - read XLS', function () {
	test('1. Read XLS file', function (done) {
		var res = alasql(
			'select * from xls("' + __dirname + '/test168.xls",{headers:false})',
			[],
			function (res) {
				assert(res.length == 6);
				//			console.log(res);
				done();
			}
		);
	});

	test('2. Read XLS file with Headers', function (done) {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				assert.deepEqual(res, ['Mexico', 'Moscow']);
				done();
			}
		);
	});

	test('3. Read XLS file with Headers and range', function (done) {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true, range:"A1:B3"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				assert.deepEqual(res, ['Moscow']);
				done();
			}
		);
	});

	test('4. Read XLS file with Headers and sheet', function (done) {
		var res = alasql(
			'select column City from xls("' +
				__dirname +
				'/test168.xls",{headers:true, sheetid: "USA", range:"A1:B6"})\
				where Population > 10000000 order by City',
			[],
			function (res) {
				//					console.log(res);
				assert.deepEqual(res, ['New York']);
				done();
			}
		);
	});
});
//}
