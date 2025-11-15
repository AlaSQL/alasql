// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 224 Mix JavaScript and SQL', () => {
	test('1. JavaScript Expression', done => {
		var res = alasql('SELECT VALUE ``1+1``');
		expect(res == 2).toBe(true);
		done();
	});

	test('2. JavaScript Expression', done => {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT COLUMN ``p.one.a`` AS aa FROM ? one', [data]);
		expect(res).toEqual([1, 2]);
		done();
	});

	test('3. JavaScript Operator', done => {
		alasql.fn.done = done;
		var res = alasql('``setTimeout(function(){alasql.fn.done()},100);``');
	});
});
