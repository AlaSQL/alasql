// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 246 ORDER BY 1,2', function () {
	test('1. ORDER BY 1', function (done) {
		var data = [
			{a: 1, b: 20},
			{a: 2, b: 30},
			{a: 3, b: 10},
		];
		var res = alasql('SELECT a,b FROM ? ORDER BY 1', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 20},
			{a: 2, b: 30},
			{a: 3, b: 10},
		]);
		done();
	});

	test('2. ORDER BY 2', function (done) {
		var data = [
			{a: 1, b: 20},
			{a: 2, b: 30},
			{a: 3, b: 10},
		];
		var res = alasql('SELECT a,b FROM ? ORDER BY 2', [data]);
		assert.deepEqual(res, [
			{a: 3, b: 10},
			{a: 1, b: 20},
			{a: 2, b: 30},
		]);
		done();
	});

	test('2. ORDER BY 2,1', function (done) {
		var data = [
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 3, b: 10},
		];
		var res = alasql('SELECT a,b FROM ? ORDER BY 2,1', [data]);
		assert.deepEqual(res, [
			{a: 3, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
		]);
		done();
	});

	test('2. ORDER BY 1 DESC,2 DESC', function (done) {
		var data = [
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 3, b: 10},
		];
		var res = alasql('SELECT a,b FROM ? ORDER BY 1 DESC,2 DESC', [data]);
		assert.deepEqual(res, [
			{a: 3, b: 10},
			{a: 2, b: 30},
			{a: 2, b: 20},
		]);
		done();
	});
});
