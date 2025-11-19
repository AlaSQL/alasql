// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 264 SELECT RECORDSET', () => {
		test('1. Test', done => {
			var data = [
				{a: 1, b: 10},
				{b: 2, a: 45},
			];
			var res = alasql('SELECT RECORDSET * FROM ?', [data]);
			/// console.log(res);
			//    expect(res).toEqual([ { 'MAX(MAX(a),MIN(a))': 8, 'MIN(MAX(a),MIN(a))': 1 } ]);
			done();
		});
	});
}
