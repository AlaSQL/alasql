// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (false) {
	describe('Test 135 a la NoSQL', () => {
		var test135;
		test('1. Insert NoSQL', done => {
			var test135 = alasql.create('test135');
			var one = test135.create('one');
			one.insert({a: 1, b: 2}, function (res) {
				expect(res == 1).toBe(true);
				one.find({a: 1}, function (res) {
					expect(res).toEqual({a: 1, b: 2});
					done();
				});
			});
		});

		test('99. Clear database', done => {
			test135.drop();
			done();
		});
	});
}
