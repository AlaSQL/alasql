// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 207 WHILE', function () {
	test('1. FALSE WHILE', function (done) {
		var res = alasql('WHILE FALSE SELECT VALUE 1; SELECT VALUE 2');
		//        console.log(res);
		assert.deepEqual(res, [[], 2]);
		done();
	});

	test('2. ONE WHILE ASYNC', function (done) {
		alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            ',
			[],
			function (res) {
				//                console.log("ASYNC:",res);
				assert.deepEqual(res, [1, [1, 1, 1]]);
				done();
			}
		);
	});

	test('3. ONE WHILE SYNC', function (done) {
		var res = alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            '
		);
		// console.log("SYNC:",res);
		assert.deepEqual(res, [1, [1, 1, 1]]);
		done();
	});
});
