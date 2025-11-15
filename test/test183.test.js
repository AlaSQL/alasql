// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 183 - [] column', () => {
	if (false) {
		test('1. ARRAY()', done => {
			var arr = [];
			var day, month, year;
			for (var i = 0; i < 10000; i++) {
				day = Math.round(Math.random() * 30);
				month = Math.round(Math.random() * 12);
				year = Math.round(Math.random() * 3 + 2009);
				arr.push(month + '/' + day + '/' + year);
			}

			var max = 0;
			var group = {};
			var value,
				n,
				len = arr.length;
			for (var i = len; --i >= 0; ) {
				value = arr[i];
				n = group[value] = 1 - -(group[value] | 0);
				if (n > max) {
					max = n;
				}
			}

			var max1 = alasql(
				'SELECT VALUE MAX(cnt) FROM (SELECT COUNT([0]) AS cnt FROM [?] GROUP BY [0])',
				[arr]
			);

			var max2 = alasql('SELECT VALUE MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM ? GROUP BY _)', [
				arr,
			]);
			/// console.log(max,max1,max2);
			//      expect(res).toEqual([1,2,3,4,5,6,7,8,9,10]);
			done();
		});
	}
	test('1. ARRAY()', done => {
		/*    
        var res = alasql('SELECT [0],FIRST(_) FROM ? GROUP BY [0]',[[[1,10],[2,20],[3,30]]);
/// console.log(res);

        var res = alasql('SELECT _ AS one, COUNT(*) AS cnt FROM ? GROUP BY one',[[1,2,3,1]);
/// console.log(res);

        var res = alasql('SELECT _, SUM(_), COUNT(*) FROM ? GROUP BY _',[[1,2,3,1]);
/// console.log(res);
*/
		var res = alasql('SELECT COLUMN SUM(_) FROM ? GROUP BY _', [[1, 2, 3, 1]]);
		expect(res).toEqual([2, 2, 3]);
		//        console.log(1,res);

		var res = alasql('SELECT COLUMN LEN(_) FROM ?', [['aaa', 'aabbb', 'sssd']]);
		expect(res).toEqual([3, 5, 4]);
		//        console.log(res);

		var res = alasql('SELECT _, LEN(_) FROM ?', ['aaa\naabbb\nsssd']);
		expect(res).toEqual([
			{_: 'aaa', 'LEN(_)': 3},
			{_: 'aabbb', 'LEN(_)': 5},
			{_: 'sssd', 'LEN(_)': 4},
		]);
		//        console.log(res);

		// var res = alasql('SELECT column _*2 FROM ?',[[1,2,3,1]);
		// console.log(res);

		done();
	});
});
