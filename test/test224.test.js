// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 224 Mix JavaScript and SQL', function () {
	test('1. JavaScript Expression', function (done) {
		var res = alasql('SELECT VALUE ``1+1``');
		assert(res == 2);
		done();
	});

	test('2. JavaScript Expression', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT COLUMN ``p.one.a`` AS aa FROM ? one', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('3. JavaScript Operator', function (done) {
		alasql.fn.done = done;
		var res = alasql('``setTimeout(function(){alasql.fn.done()},100);``');
	});
});
