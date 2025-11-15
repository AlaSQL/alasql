// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 247 UNARY PLUS', () => {
	test('1. Simple tests', done => {
		var res = alasql('SELECT VALUE + -1');
		expect(res).toEqual(-1);
		var res = alasql('SELECT VALUE 70 * +1');
		expect(res).toEqual(70);

		var data = [
			{col0: 10, col1: 1, col2: 100},
			{col0: 20, col1: 2, col2: 200},
		];
		var res = alasql('SELECT COLUMN + col1 + 4 FROM ?', [data]);
		expect(res).toEqual([5, 6]);

		var res = alasql('SELECT COLUMN - col1 + 4 FROM ?', [data]);
		expect(res).toEqual([3, 2]);

		var res = alasql('SELECT COLUMN col1 - + - col0 FROM ?', [data]);
		expect(res).toEqual([11, 22]);

		var res = alasql('SELECT COLUMN col1 * + col2 FROM ?', [data]);
		expect(res).toEqual([100, 400]);

		var res = alasql('SELECT COLUMN DISTINCT + col1 * + 5 FROM ?', [data]);
		expect(res).toEqual([5, 10]);

		var res = alasql('SELECT VALUE + 36 * + ( + 16 )');
		expect(res).toEqual(36 * 16);

		done();
	});
});
