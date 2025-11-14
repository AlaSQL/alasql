// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 153 - Async test1...', function () {
		test('1. Create database', function (done) {
			alasql('CREATE DATABASE IF NOT EXISTS test153');
			alasql('CREATE TABLE test153.one (a int)');
			var getfn = function (i, cb) {
				if (i > 3) return;
				var res = {a: i};
				//cb(res);
				return res;
			};
			var res = alasql('SELECT * FROM ?', [getfn]);
			assert(res.length == 4);

			var res = alasql('SELECT * FROM ?', [getfn], function (res) {
				assert(res.length == 4);
				done();
			});

			// No params
			var res = alasql('VALUE OF SELECT 123', function (res) {
				assert.equal(123, res);
				done();
			});
		});

		test('99. Detach database', function (done) {
			alasql('DROP DATABASE test153');
			done();
		});
	});
}
