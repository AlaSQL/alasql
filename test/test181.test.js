// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 181 - ARRAY aggregator', () => {
	test('1. ARRAY()', done => {
		var food = [
			{food: 'apple', type: 'fruit'},
			{food: 'potato', type: 'vegetable'},
			{food: 'banana', type: 'fruit'},
		];
		var res = alasql('SELECT ARRAY(food) AS foods FROM ? GROUP BY type', [food]);
		//      console.log(res);
		expect(res).toEqual([{foods: ['apple', 'banana']}, {foods: ['potato']}]);
		done();
	});
});
