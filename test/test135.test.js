// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (false) {
	describe('Test 135 a la NoSQL', function () {
		var test135;
		test('1. Insert NoSQL', function (done) {
			var test135 = alasql.create('test135');
			var one = test135.create('one');
			one.insert({a: 1, b: 2}, function (res) {
				assert(res == 1);
				one.find({a: 1}, function (res) {
					assert.deepEqual(res, {a: 1, b: 2});
					done();
				});
			});
		});

		test('99. Clear database', function (done) {
			test135.drop();
			done();
		});
	});
}
