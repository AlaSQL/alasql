// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 201 SUM(DISTINCT), VAR(), STDDEV()', function () {
	test('1. different SUM()s', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		//        var res = alasql('SELECT ROW SUM(a), SUM(a) FROM ?',[data]);
		var res = alasql('SELECT ROW SUM(a), SUM(a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [7, 7]);
		done();
	});

	test('1a. different COUNT()s', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT ROW COUNT(a), COUNT(DISTINCT a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [4, 3]);
		done();
	});

	test('2. SUM() vs SUM(DISTINCT a)', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT ROW SUM(a), SUM(DISTINCT a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [7, 6]);
		done();
	});

	if (false) {
		test('3. VAR() and STDDEV(a)', function (done) {
			var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
			var res = alasql('SELECT ROW VAR(a), STDEV(a) FROM ?', [data]);
			/// console.log(res);
			assert.deepEqual(res, [1, 2]);
			done();
		});
	}
});
