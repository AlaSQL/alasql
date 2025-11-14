// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 173 - SELECT Short Syntax', function () {
	if (false) {
		test('1. FROM without select', function (done) {
			var data = [{a: 1}, {a: 2}, {a: 3}];
			alasql('FROM ?', [data], function (res) {
				/// console.log(res);
				assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}]);
				done();
			});
		});
	}
});

//};
