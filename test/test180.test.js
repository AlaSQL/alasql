// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 180 - Array as a source', () => {
	var array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
	var array2 = [0, 1, 2, 3];

	test('1. SELECT', done => {
		var res = alasql('SELECT COLUMN * FROM [?] ORDER BY [0]', [array]);
		//      console.log(res);
		expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		done();
	});

	test('2. JOIN', done => {
		var res = alasql('SELECT COLUMN * FROM [?] AS a OUTER JOIN [?] AS b ON a.[0] = b.[0]', [
			array,
			array2,
		]);
		//      console.log(res);
		//      expect(res).toEqual([1,2,3,4,5,6,7,8,9,10]);
		done();
	});
});
