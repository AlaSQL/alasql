// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 817 IFNULL bug', function () {
	test('1. Does return 0', function (done) {
		var data = [
			{
				a: 0,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: 0,
			},
		]);
		done();
	});

	test('1. Does return false', function (done) {
		var data = [
			{
				a: false,
			},
		];
		var res = alasql('SELECT IFNULL(a, true) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: false,
			},
		]);
		done();
	});

	test('1. Does return 100', function (done) {
		var data = [
			{
				a: null,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: 100,
			},
		]);
		done();
	});
});
