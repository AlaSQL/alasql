// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 153 - Async test1...', () => {
		test('1. Create database', done => {
			alasql('CREATE DATABASE IF NOT EXISTS test153');
			alasql('CREATE TABLE test153.one (a int)');
			var getfn = function (i, cb) {
				if (i > 3) return;
				var res = {a: i};
				//cb(res);
				return res;
			};
			var res = alasql('SELECT * FROM ?', [getfn]);
			expect(res.length == 4).toBe(true);

			var res = alasql('SELECT * FROM ?', [getfn], function (res) {
				expect(res.length == 4).toBe(true);
				done();
			});

			// No params
			var res = alasql('VALUE OF SELECT 123', function (res) {
				expect(123).toEqual(res);
				done();
			});
		});

		test('99. Detach database', done => {
			alasql('DROP DATABASE test153');
			done();
		});
	});
}
