// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 182 - ARRAY aggregator', () => {
	test('1. ARRAY()', done => {
		var data = [
			{
				userId: 1,
				userName: 'bob',
				category: 'shoes',
				count: 2,
			},
			{
				userId: 1,
				userName: 'bob',
				category: 'rocks',
				count: 4,
			},
			{
				userId: 1,
				userName: 'bob',
				category: 'bags',
				count: 3,
			},
			{
				userId: 2,
				userName: 'sue',
				category: 'shoes',
				count: 1,
			},
			{
				userId: 2,
				userName: 'sue',
				category: 'rocks',
				count: 7,
			},
			{
				userId: 2,
				userName: 'sue',
				category: 'bags',
				count: 4,
			},
		];

		var res = alasql(
			'SELECT userId, userName, \
      ARRAY({category:category,[count]:[count]}) AS purchases, SUM([count]) AS totalCount \
      FROM ? GROUP BY userId, userName',
			[data]
		);

		expect(res.length == 2).toBe(true);
		//     console.log(res);
		//      expect(res).toEqual([1,2,3,4,5,6,7,8,9,10]);
		done();
	});
});
