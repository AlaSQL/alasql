// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 313 SEARCH ORDER BY', function () {
	test('1. ORDER BY', function (done) {
		var data = [{a: 1}, {a: 10}, {a: 2}];
		var res = alasql('SEARCH ORDER BY (a) FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 10}]);
		done();
	});
	test('2. ORDER BY', function (done) {
		var data = [1, 10, 2];
		var res = alasql('SEARCH ORDER BY (_) FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 10]);
		done();
	});
	test('3. ORDER BY', function (done) {
		var data = [{a: 1}, {a: 10}, {a: 2}];
		var res = alasql('SEARCH ORDER BY (a DESC) a  FROM ?', [data]);
		assert.deepEqual(res, [10, 2, 1]);
		done();
	});
	test('4. ORDER BY', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 10, b: 0},
			{a: 2, b: 7},
		];
		var res = alasql('SEARCH ORDER BY (a+b) FROM ?', [data]);
		assert.deepEqual(res, [
			{a: 2, b: 7},
			{a: 10, b: 0},
			{a: 1, b: 10},
		]);

		done();
	});
});
