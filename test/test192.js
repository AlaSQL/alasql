// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 192 - ORDER BY formula', function () {
	test('1. ORDER BY column', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a FROM ? ORDER BY 1-a', [data]);
		assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 2}, {a: 1}, {a: 1}, {a: 1}]);
		done();
	});
	test('2. ORDER BY column', function (done) {
		var data = [{a: 'One'}, {a: 'Two'}, {a: 'Three'}, {a: 'Four'}];
		var res = alasql('SELECT a FROM ? ORDER BY MID(a,2,1)', [data]);
		assert.deepEqual(res, [{a: 'Three'}, {a: 'One'}, {a: 'Four'}, {a: 'Two'}]);
		done();
	});
});
