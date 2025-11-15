// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 1820 - SELECT query (a AS b, b AS c)', () => {
	test('1. Select query where alias of one column is also a column name in the result set', done => {
		let item1 = {a: 1, b: 'hello'};
		let item2 = {a: 2, b: ''};

		var res = alasql('SELECT a as b, b as c FROM ? GROUP BY a,b', [[item1, item2]]);

		expect(res).toEqual([
			{
				b: 1,
				c: 'hello',
			},
			{
				b: 2,
				c: '',
			},
		]);

		done();
	});
});
