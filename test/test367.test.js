// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 367 NOT and = predecessing', function () {
	test('NOT over =', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT * FROM ? WHERE NOT a = 1', [data]);
		assert.deepEqual(res, [{a: 2}, {a: 3}]);
		done();
	});
});
