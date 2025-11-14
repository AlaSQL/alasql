// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 300 SEARCH', function () {
	var catalog = {
		Europe: {
			fruits: [{fruit: 'Apple'}, {fruit: 'Peach'}],
		},
		Asia: {
			fruit: 'Pineapple',
		},
		Africa: {
			fruit: 'Banana',
		},
	};

	test('1. Search fruits', function (done) {
		var res = alasql('SEARCH Europe FROM ?', [catalog]);
		assert.deepEqual(res, [
			{
				fruits: [{fruit: 'Apple'}, {fruit: 'Peach'}],
			},
		]);
		done();
	});

	test('2. Search fruits 2', function (done) {
		var res = alasql('SEARCH /fruits/ FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}, {fruit: 'Peach'}]);

		var res = alasql('SEARCH /fruits/fruit FROM ?', [catalog]);
		assert.deepEqual(res, ['Apple', 'Peach']);

		done();
	});

	test('3. Search fruits', function (done) {
		var res = alasql('SEARCH /fruits/WHERE(fruit="Apple") FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}]);

		var res = alasql('SEARCH ///WHERE(fruit="Apple") FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}]);
		done();
	});
	if (false) {
		test('4. Search fruits', function (done) {
			var res = alasql('SEARCH /// WHERE(fruit="Apple") FROM ?', [catalog]);
			assert.deepEqual(res, [{fruit: 'Apple'}]);
			done();
		});
	}
});
