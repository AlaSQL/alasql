// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 342 Expression Statement', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test342;USE test342');
		done();
	});

	test('2. Expression', function (done) {
		var res = alasql('=2*2');
		assert.deepEqual(res, 4);
		done();
	});

	test('3. Expression with SELECT', function (done) {
		var res = alasql('=2*(SELECT VALUE 2)');
		assert.deepEqual(res, 4);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test342');
		done();
	});
});
