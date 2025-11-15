// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	// Test only for browsers

	describe('Test 280 XLS.XML tests', () => {
		var data = [
			{city: 'London', population: 5000000},
			{city: 'Moscow', population: 12000000},
			{city: 'Mexico', population: 20000000},
			{city: 'New York', population: 20000000},
		];

		test('1. Save XLS', done => {
			alasql(
				'SELECT * INTO XLS("' + __dirname + '/restest280a.xls",{headers:true}) FROM ?',
				[data],
				() => {
					done();
				}
			);
		});

		test('2. Save XLSXML', done => {
			var opts = {
				headers: true,
				column: {style: {Font: {Bold: '1'}}},
				rows: {1: {style: {Font: {Color: '#FF0077'}}}},
				cells: {
					1: {
						1: {
							style: {Font: {Color: '#00FFFF'}},
						},
					},
				},
			};
			alasql(
				'SELECT * INTO XLSXML("' + __dirname + '/restest280b.xls",?) FROM ?',
				[opts, data],
				() => {
					done();
				}
			);
		});

		test('3. Save complex XLSXML', done => {
			var outfile = __dirname + '/restest280c.xls';
			var data2 = [
				{pet: 'dog', legs: 4},
				{pet: 'bird', legs: 2},
			];
			alasql(
				'SELECT * INTO XLSXML(?,{headers:true, sheets:{Sheet1:{},Sheet2:{}}}) FROM ?',
				[outfile, [data, data2]],
				() => {
					alasql('SEARCH XML Worksheet %[ss:Name] FROM XML(?)', [outfile], function (res) {
						expect(res).toEqual(['Sheet1', 'Sheet2']);
						alasql('SEARCH XML / * Data$ FROM XML(?)', [outfile], function (res) {
							expect(res.length).toEqual(12);
							done();
						});
					});
				}
			);
		});

		test('4. Save XLSXML with headers array', done => {
			var outfile = __dirname + '/restest280d.xls';
			alasql(
				'SELECT * INTO XLSXML(?,{headers: ?}) FROM ?',
				[outfile, ['City', 'Population'], data],
				() => {
					alasql('SEARCH XML / * Data$ FROM XML(?)', [outfile], function (res) {
						expect(res.length).toEqual(10);
						expect(res[0]).toEqual('City');
						expect(res[1]).toEqual('Population');
						done();
					});
				}
			);
		});
	});
}
