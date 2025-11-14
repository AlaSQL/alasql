// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 248 IN ()', function () {
	test('1. IN ()', function (done) {
		var res = alasql('SELECT VALUE 1 IN ()');
		assert(res == false);

		done();
	});

	test('2. NOT IN ()', function (done) {
		var res = alasql('SELECT VALUE 1 NOT IN ()');
		assert(res == true);

		done();
	});
});
