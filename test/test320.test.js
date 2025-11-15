// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe.concurrent('Test 320 DISTINCT', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test320; USE test320');
		done();
	});

	test('2. SEARCH DISTINCT', done => {
		var data = [{a: 1}, {a: 2}, {a: 2}, {a: 1}];

		var res = alasql('SEARCH FROM ?', [data]);
		expect(res).toEqual([{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / FROM ?', [data]);
		expect(res).toEqual([{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / a FROM ?', [data]);
		expect(res).toEqual([1, 2, 2, 1]);
		var res = alasql('SEARCH DISTINCT(/) FROM ?', [data]);
		expect(res).toEqual([{a: 1}, {a: 2}]);
		var res = alasql('SEARCH DISTINCT(/a) FROM ?', [data]);
		expect(res).toEqual([1, 2]);
		var res = alasql('SEARCH / PROP(a) FROM ?', [data]);
		expect(res).toEqual([1, 2, 2, 1]);

		//   console.log(res);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test320');
		done();
	});
});
