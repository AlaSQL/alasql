// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 208 WebWorker', () => {
		test('1. WebWorker', done => {
			alasql.worker();
			alasql('SELECT VALUE 100', [], function (res) {
				expect(res == 100).toBe(true);
				alasql.worker(false);
				var res = alasql('SELECT VALUE 200');
				expect(res == 200).toBe(true);
				alasql.worker();
				// console.log(alasql.webworker)
				alasql('SELECT VALUE 300', [], function (res) {
					expect(res == 300).toBe(true);
					alasql.worker(false);
					done();
				});
			});
		});
	});
}
