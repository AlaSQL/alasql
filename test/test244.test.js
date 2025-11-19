// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 244 Case-insensitive LIKE', () => {
	test('1. LIKE', done => {
		var data = [
			{a: 'one', b: 'first'},
			{a: 'two', b: 'second'},
			{a: 'THREE', b: 'THIRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE a LIKE "T%"', [data]);

		//console.log(res);
		expect(res).toEqual([{b: 'second'}, {b: 'THIRD'}]);
		done();
	});

	test('2. LIKE', done => {
		var data = [
			{a: 'Warsaw'},
			{a: 'Berlin'},
			{a: 'Paris'},
			{a: 'London'},
			{a: 'MOSCOW'},
			{a: 'KYIV'},
			{a: 'MINSK'},
		];

		var res = alasql('SELECT * FROM ? WHERE a LIKE "m%"', [data]);
		//console.log(res);
		expect(res).toEqual([{a: 'MOSCOW'}, {a: 'MINSK'}]);
		done();
	});
});
