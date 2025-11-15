// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 344 Multisheet export', () => {
	if (typeof window === 'object') {
		test('1. CREATE DATABASE', done => {
			alasql('CREATE DATABASE test344;USE test344');
			done();
		});

		test('2. SELECT FROM', done => {
			var data1 = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			var res = alasql('SELECT FROM ?', [data1]);
			expect(res).toEqual([
				{a: 1, b: 10},
				{a: 2, b: 20},
			]);
			done();
		});

		test('2. XLSX multisheet export', done => {
			var data1 = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			var data2 = [
				{a: 100, b: 10},
				{a: 200, b: 20},
			];
			var opts = [
				{sheetid: 'One', header: true},
				{sheetid: 'Two', header: false},
			];
			alasql.into.XLSX(__dirname + '/restest344.xlsx', opts, [data1, data2], undefined, () => {
				done();
			});
		});

		test('3. XLSX multisheet export', done => {
			var data1 = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			var data2 = [
				{a: 100, b: 10},
				{a: 200, b: 20},
			];
			var opts = [
				{sheetid: 'One', header: true},
				{sheetid: 'Two', header: false},
			];
			var res = alasql(
				'SELECT INTO XLSX("' + __dirname + '/restest344b.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				() => {
					done();
				}
			);
		});

		test('3b. XLSX multisheet export using SELECT *', done => {
			var data1 = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			var data2 = [
				{a: 100, b: 10},
				{a: 200, b: 20},
			];
			var opts = [
				{sheetid: 'One', header: true},
				{sheetid: 'Two', header: false},
			];
			var res = alasql(
				'SELECT * INTO XLSX("' + __dirname + '/restest344c.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				() => {
					done();
				}
			);
		});

		test('3c. XLSX multisheet export with custom columns', done => {
			var data1 = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			var data2 = [
				{a: 100, b: 10},
				{a: 200, b: 20},
			];
			var opts = [
				{sheetid: 'One', header: true},
				{sheetid: 'Two', header: false},
			];
			var res = alasql(
				'SELECT a AS alpha, b as beta INTO XLSX("' + __dirname + '/restest344d.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				() => {
					done();
				}
			);
		});

		/*
  test('3. XLSXML multisheet export',function(done){
    var res = alasql('=2*2');
    expect(res).toEqual(1);
    done();
  });
*/

		test('99. DROP DATABASE', done => {
			alasql.options.modifier = undefined;
			alasql('DROP DATABASE test344');
			done();
		});
	}
});
