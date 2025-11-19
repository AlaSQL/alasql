// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 433 - read csv from variable', () => {
	test('works from csv variable', () => {
		var res = alasql('SELECT * FROM CSV(?, {"headers": true, "fromString": true})', [
			'A,B,C\n10,20,30\n20,30,40',
		]);

		expect(res).toEqual([
			{A: 10, B: 20, C: 30},
			{A: 20, B: 30, C: 40},
		]);
	});

	test('works from csv variable - async', done => {
		var sql = 'SELECT * FROM CSV(?, {"headers": false, "fromString": true})';
		alasql(sql, ['a,b,c\nd,e,f\none,two,three\n'], function (res) {
			expect(res).toEqual([
				{0: 'a', 1: 'b', 2: 'c'},
				{0: 'd', 1: 'e', 2: 'f'},
				{0: 'one', 1: 'two', 2: 'three'},
			]);
			done();
		});
	});
});
