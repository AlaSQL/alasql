// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 205 SET Local variables', () => {
	test('1. @var expression', done => {
		alasql.vars.one = 100;
		var res = alasql('SELECT VALUE @one');
		expect(res === 100).toBe(true);
		done();
	});

	test('2. SET @var = expression', done => {
		alasql('SET @two = @one+200');
		var res = alasql('SELECT VALUE @two');
		expect(res === 300).toBe(true);
		done();
	});

	test('3. SET @var->prop = expression', done => {
		alasql('SET @obj = {}; SET @obj->one = 100');
		var res = alasql('SELECT VALUE @obj');
		expect(res).toEqual({one: 100});
		done();
	});
	test('4. SET @var->prop = expression', done => {
		alasql('SET @obj = {}; SET @obj->("two") = 100;');
		//SET @obj->("two")->(1-1)=100
		var res = alasql('SELECT VALUE @obj');
		//        console.log(res);
		expect(res).toEqual({two: 100});
		done();
	});
});
