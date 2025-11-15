// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 046', () => {
	describe('FROM as parameter', () => {
		var years = [
			{yearid: 2010},
			{yearid: 2011},
			{yearid: 2012},
			{yearid: 2013},
			{yearid: 2014},
			{yearid: 2015},
			{yearid: 2016},
			{yearid: 2017},
		];

		test('FROM array of objects', done => {
			var res = alasql('SELECT COLUMN * FROM ? AS t WHERE t.yearid>?', [years, 2014]);
			expect(res).toEqual([2015, 2016, 2017]);
			done();
		});

		var data = [
			[2014, 1, 1],
			[2015, 2, 1],
			[2016, 3, 1],
			[2017, 4, 2],
			[2018, 5, 3],
			[2019, 6, 3],
		];
		test('FROM array of arrays', done => {
			var res = alasql('SELECT VALUE SUM([1]) FROM ? d WHERE [0]>2016', [data]);
			expect(15).toEqual(res);
			done();
		});

		test('queryArrayOfArrays()', done => {
			var res = alasql('SELECT MATRIX [1] AS 0,[1]+[2] AS [1] FROM ? d WHERE [0]>2016', [data]);
			expect(res).toEqual([
				[4, 6],
				[5, 8],
				[6, 9],
			]);
			done();
		});

		test('queryArrayOfArrays and filter()', done => {
			var res1 = alasql('SELECT * FROM ? d WHERE [0]>2016', [data]);
			var res2 = data
				.filter(function (a) {
					return a[0] > 2016;
				})
				.map(function (d) {
					var res = {};
					for (var i = 0; i < d.length; i++) {
						res[i] = d[i];
					}
					return res;
				});
			expect(res1).toEqual(res2);
			done();
		});

		test('FROM array of arrays', done => {
			var res = alasql(
				'SELECT MATRIX [2] AS 0, SUM([1]) AS 1 \
				FROM ? d \
				WHERE [0]>2016 \
				GROUP BY [2] ',
				[data]
			);
			expect(res).toEqual([
				[2, 4],
				[3, 11],
			]);
			done();
		});
	});
});
