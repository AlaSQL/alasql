// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe.concurrent('Test 320 DISTINCT', () => {
	beforeAll('1. CREATE DATABASE', () => {
		alasql('CREATE DATABASE test320; USE test320');
	});

	test('2. SEARCH DISTINCT', () => {
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
	});

	afterAll('99. DROP DATABASE', () => {
		alasql('DROP DATABASE test320');
	});
});
