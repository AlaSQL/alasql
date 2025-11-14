// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 205 SET Local variables', function () {
	test('1. @var expression', function (done) {
		alasql.vars.one = 100;
		var res = alasql('SELECT VALUE @one');
		assert(res === 100);
		done();
	});

	test('2. SET @var = expression', function (done) {
		alasql('SET @two = @one+200');
		var res = alasql('SELECT VALUE @two');
		assert(res === 300);
		done();
	});

	test('3. SET @var->prop = expression', function (done) {
		alasql('SET @obj = {}; SET @obj->one = 100');
		var res = alasql('SELECT VALUE @obj');
		assert.deepEqual(res, {one: 100});
		done();
	});
	test('4. SET @var->prop = expression', function (done) {
		alasql('SET @obj = {}; SET @obj->("two") = 100;');
		//SET @obj->("two")->(1-1)=100
		var res = alasql('SELECT VALUE @obj');
		//        console.log(res);
		assert.deepEqual(res, {two: 100});
		done();
	});
});
