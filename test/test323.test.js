// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 323 ANY() and ALL()', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test323; USE test323');
		done();
	});

	var data = [{a: 1}, {a: 2}];
	test('2. ALL', function (done) {
		var res = alasql('SEARCH ALL(/a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]); // To be checked
		done();
	});

	test('3. ANY', function (done) {
		var res = alasql('SEARCH ANY(/a) FROM ?', [data]);
		assert.deepEqual(res, [1]); // To be checked
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test323');
		done();
	});
});
