// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 245 Square brackets and JavaScript', function () {
	test('1. Square brackets', function (done) {
		var data = [{'[one]': 1}, {'[one]': 2}];

		var res = alasql('SELECT COLUMN `[one]` FROM ?', [data]);

		//console.log(res);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('2. JavaScript', function (done) {
		var data = [
			{a: 'Warsaw'},
			{a: 'Berlin'},
			{a: 'Paris'},
			{a: 'London'},
			{a: 'MOSCOW'},
			{a: 'KYIV'},
			{a: 'MINSK'},
		];

		var res = alasql('SELECT VALUE ``1+1``', [data]);
		//console.log(res);

		assert.equal(res, 2);
		done();
	});
});
