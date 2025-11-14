// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 320 DISTINCT', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test320; USE test320');
		done();
	});

	test('2. SEARCH DISTINCT', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 2}, {a: 1}];

		var res = alasql('SEARCH FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / a FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 2, 1]);
		var res = alasql('SEARCH DISTINCT(/) FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}]);
		var res = alasql('SEARCH DISTINCT(/a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH / PROP(a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 2, 1]);

		//   console.log(res);

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test320');
		done();
	});
});
