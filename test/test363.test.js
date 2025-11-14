// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 363 -> with undefined', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test363;USE test363');
		done();
	});

	test('2. TEST', function (done) {
		var res = alasql('VALUE OF SELECT a->name FROM ?', [[{a: {name: 'hello'}}]]);
		assert.deepEqual(res, 'hello');
		var res = alasql('VALUE OF SELECT a->name FROM ?', [{}]);
		assert.deepEqual(res, undefined);
		var res = alasql('VALUE OF SELECT {}->name');
		assert.deepEqual(res, undefined);
		var res = alasql('VALUE OF SELECT {amt:10}->amt');
		assert.deepEqual(res, 10);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test363');
		done();
	});
});
