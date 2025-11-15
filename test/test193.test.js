// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 193 - GROUP BY formula', () => {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	test('1. GROUP BY formula, SELECT with formula', done => {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT COUNT(a+1)+1 AS b FROM ? GROUP BY a%2', [data]);
		expect(res).toEqual([{b: 5}, {b: 3}]);
		//        console.log('Result:',res);
		done();
	});

	test('2. PI calculation #1', done => {
		var res = alasql(
			'SELECT VALUE COUNT(*)*4/$[0] FROM \
            (SELECT RANDOM() AS x, RANDOM() AS y FROM RANGE(1,$[0])) WHERE x*x+y*y<1',
			[100000]
		);
		/// console.log('PI=',res);
		expect(3.1 < res && res < 3.2).toBe(true);
		done();
	});

	test('3. PI calculation #2', done => {
		var res = alasql(
			'SELECT VALUE COUNT(*)*4/$[0] FROM RANGE(1,$[0]) WHERE POWER(RANDOM(),2)+POWER(RANDOM(),2)<1',
			[100000]
		);
		//        console.log(res);
		expect(3.1 < res && res < 3.2).toBe(true);
		//        console.log('PI=',res);
		done();
	});
});
