// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 209 SELECT FROM @localvar', function () {
	test('1. FROM @localvar', function (done) {
		alasql('SET @one = @[{a:1},{a:2},{a:3}]');
		alasql('SELECT * FROM @one ORDER BY a DESC', [], function (res) {
			assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 1}]);
			done();
		});
	});

	test('2. FROM @localvar', function (done) {
		alasql('SELECT * INTO @two FROM @one ORDER BY a DESC');
		alasql('SELECT * FROM @two', [], function (res) {
			assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 1}]);
			done();
		});
	});
});
