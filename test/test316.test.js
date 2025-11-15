// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 316 UNION ALL', () => {
	test.skip('1. SEARCH DISTINCT', done => {
		var data = [{a: 10}, {a: 100}, {a: 10}, {a: 100}, {a: 10}];

		var res = alasql('SEARCH DISTINCT(/ a) FROM ?', [data]);
		expect(res).toEqual([10, 100]);

		done();
	});

	test.skip('2. Simple UNION ALL', done => {
		var data = [{a: 10}, {b: 100}, {a: 5}];

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY() FROM ?', [data]);
		expect(res).toEqual([5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY() FROM ?', [data]);
		//    console.log(res);
		expect(res).toEqual([5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY(ASC) FROM ?', [data]);
		expect(res).toEqual([5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY(DESC) FROM ?', [data]);
		expect(res).toEqual([100, 10, 5]);

		done();
	});
});
