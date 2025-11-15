// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 817 IFNULL bug', () => {
	test('1. Does return 0', done => {
		var data = [
			{
				a: 0,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		expect(res).toEqual([
			{
				result: 0,
			},
		]);
		done();
	});

	test('1. Does return false', done => {
		var data = [
			{
				a: false,
			},
		];
		var res = alasql('SELECT IFNULL(a, true) as result FROM ?', [data]);
		expect(res).toEqual([
			{
				result: false,
			},
		]);
		done();
	});

	test('1. Does return 100', done => {
		var data = [
			{
				a: null,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		expect(res).toEqual([
			{
				result: 100,
			},
		]);
		done();
	});
});
