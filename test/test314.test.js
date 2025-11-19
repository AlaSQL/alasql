// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 314 SEARCH with null values', () => {
	test('1. Traverse with null', done => {
		var data = [{a: 1}, null];

		var res = alasql('SEARCH / a FROM ?', [data]);
		expect(res).toEqual([1]);
		done();
	});
});
