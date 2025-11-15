// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 368 OFFSET ... LIMIT', () => {
	var data = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];

	test('LIMIT', () => {
		var res = alasql('SELECT * FROM ? LIMIT 3', [data]);
		expect(res).toEqual([{a: 1}, {a: 2}, {a: 3}]);
	});


	test('OFFSET LIMIT', done => {
		var res = alasql('SELECT * FROM ? LIMIT 2 OFFSET 3', [data]);
		expect(res).toEqual([{a: 4}, {a: 5}]);
		done();
	});

	test('OFFSET FETCH', done => {
		var res = alasql('SELECT * FROM ? OFFSET 3 FETCH 2', [data]);
		expect(res).toEqual([{a: 4}, {a: 5}]);

		var res = alasql('SELECT * FROM ? OFFSET 3 ROWS FETCH NEXT 2 ROWS ONLY', [data]);
		expect(res).toEqual([{a: 4}, {a: 5}]);
		done();
	});
});
