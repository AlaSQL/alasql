// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 1415 - UNION Expression with empty query columns bug', function () {
	test('1. should not insert empty objects in results when using UNION Expression', function (done) {
		var data1 = [{a: 'abc'}, {a: 'xyz'}];
		var data2 = [{a: '123'}, {a: '987'}];

		var res = alasql('SELECT * FROM :a UNION SELECT * FROM :b', {a: data1, b: data2});
		assert.deepEqual(res, [{a: '123'}, {a: '987'}, {a: 'abc'}, {a: 'xyz'}]);

		var res = alasql(
			'SELECT * FROM @[{x: true}, {x: 3}] UNION SELECT * FROM @[{x: false}, {x: 9}]'
		);
		assert.deepEqual(res, [{x: false}, {x: 9}, {x: true}, {x: 3}]);

		done();
	});
});
