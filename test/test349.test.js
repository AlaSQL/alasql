// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 349 VALUE OF', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test349;USE test349');
		done();
	});

	test('2. VALUE OF', function (done) {
		var res = alasql('VALUE OF SELECT SUM(a*b) FROM @[{a:1,b:10},{a:2,b:20}]');
		assert.deepEqual(res, 50);
		done();
	});

	test('3. ROW OF', function (done) {
		var res = alasql('ROW OF SELECT a,b FROM @[{a:1,b:10},{a:2,b:20}]');
		assert.deepEqual(res, [1, 10]);
		done();
	});

	test('4. COLUMN OF', function (done) {
		var res = alasql('COLUMN OF SELECT a,b FROM @[{a:1,b:10},{a:2,b:20}]');
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test('5. MATRIX OF', function (done) {
		var res = alasql('MATRIX OF SELECT a,b FROM @[{a:1,b:10},{a:2,b:20}]');
		assert.deepEqual(res, [
			[1, 10],
			[2, 20],
		]);
		done();
	});

	test('6. RECORDSET OF', function (done) {
		var res = alasql('RECORDSET OF SELECT a,b FROM @[{a:1,b:10},{a:2,b:20}]');
		assert.deepEqual(res.data, [
			{a: 1, b: 10},
			{a: 2, b: 20},
		]);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test349');
		done();
	});
});
