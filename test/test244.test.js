// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 244 Case-insensitive LIKE', function () {
	test('1. LIKE', function (done) {
		var data = [
			{a: 'one', b: 'first'},
			{a: 'two', b: 'second'},
			{a: 'THREE', b: 'THIRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE a LIKE "T%"', [data]);

		//console.log(res);
		assert.deepEqual(res, [{b: 'second'}, {b: 'THIRD'}]);
		done();
	});

	test('2. LIKE', function (done) {
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
		assert.deepEqual(res, [{a: 'MOSCOW'}, {a: 'MINSK'}]);
		done();
	});
});
