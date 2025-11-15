// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 184 - SELECT INDEX', () => {
	test('0.test _', done => {
		var data = [1, 2, 3, 4, 1, 2, 2, 3];
		var res = alasql('SELECT _, ARRAY(_) FROM ? GROUP BY _', [data]);
		// console.log(res);
		expect(res).toEqual([
			{_: 1, 'ARRAY(_)': [1, 1]},
			{_: 2, 'ARRAY(_)': [2, 2, 2]},
			{_: 3, 'ARRAY(_)': [3, 3]},
			{_: 4, 'ARRAY(_)': [4]},
		]);
		done();
	});

	// test('0.test _',function(done){
	//   var data = [1,2,3,4,1,2,2,3];
	//   var res = alasql('SELECT one._, ARRAY(_) FROM ? one GROUP BY one._',[data]);
	//   console.log(res);
	//   expect(false).toBe(true);
	//   done();
	// });

	test('1. SELECT INDEX', done => {
		var data = [1, 2, 3, 4, 1, 2, 2, 3];
		var res = alasql('SELECT INDEX _,ARRAY(_) FROM ? GROUP BY _', [data]);
		//      console.log(res);
		expect(res).toEqual({1: [1, 1], 2: [2, 2, 2], 3: [3, 3], 4: [4]});
		//      console.log(res);

		var res = alasql('SELECT INDEX _,COUNT(*) FROM ? GROUP BY _', [data]);
		//      console.log(res);
		expect(res).toEqual({1: 2, 2: 3, 3: 2, 4: 1});
		//      console.log(res);
		//      var res = alasql('SELECT TEXT COUNT(*),ARRAY(_) FROM ? GROUP BY _',[data]);
		//      expect(res = '').toBe(true)
		//      console.log(res);
		done();
	});
});
