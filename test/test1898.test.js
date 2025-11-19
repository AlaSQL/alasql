// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1898 - group concat', () => {
	let data;
	let res;

	test('A) int concat', () => {
		data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 1, b: 30},
		];
		res = alasql('SELECT a, group_concat(b) AS b FROM ? GROUP BY a', [data]);
		expect(res[0].b).toEqual('10,30');
		expect(res[1].b).toEqual('20');
	});

	test('B) string values', () => {
		data = [
			{a: 1, b: 'x'},
			{a: 2, b: 'y'},
			{a: 1, b: 'z'},
		];
		res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a', [data]);
		expect(res[0].b).toEqual('x,z');
		expect(res[1].b).toEqual('y');
	});
});
