// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 300 SEARCH', () => {
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

	test('1. Search fruits', done => {
		var res = alasql('SEARCH Europe FROM ?', [catalog]);
		expect(res).toEqual([
			{
				fruits: [{fruit: 'Apple'}, {fruit: 'Peach'}],
			},
		]);
		done();
	});

	test('2. Search fruits 2', done => {
		var res = alasql('SEARCH /fruits/ FROM ?', [catalog]);
		expect(res).toEqual([{fruit: 'Apple'}, {fruit: 'Peach'}]);

		var res = alasql('SEARCH /fruits/fruit FROM ?', [catalog]);
		expect(res).toEqual(['Apple', 'Peach']);

		done();
	});

	test('3. Search fruits', done => {
		var res = alasql('SEARCH /fruits/WHERE(fruit="Apple") FROM ?', [catalog]);
		expect(res).toEqual([{fruit: 'Apple'}]);

		var res = alasql('SEARCH ///WHERE(fruit="Apple") FROM ?', [catalog]);
		expect(res).toEqual([{fruit: 'Apple'}]);
		done();
	});
	if (false) {
		test('4. Search fruits', done => {
			var res = alasql('SEARCH /// WHERE(fruit="Apple") FROM ?', [catalog]);
			expect(res).toEqual([{fruit: 'Apple'}]);
			done();
		});
	}
});
