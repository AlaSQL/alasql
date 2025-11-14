// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 181 - ARRAY aggregator', function () {
	test('1. ARRAY()', function (done) {
		var food = [
			{food: 'apple', type: 'fruit'},
			{food: 'potato', type: 'vegetable'},
			{food: 'banana', type: 'fruit'},
		];
		var res = alasql('SELECT ARRAY(food) AS foods FROM ? GROUP BY type', [food]);
		//      console.log(res);
		assert.deepEqual(res, [{foods: ['apple', 'banana']}, {foods: ['potato']}]);
		done();
	});
});
