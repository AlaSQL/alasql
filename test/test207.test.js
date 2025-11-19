// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 207 WHILE', () => {
	test('1. FALSE WHILE', done => {
		var res = alasql('WHILE FALSE SELECT VALUE 1; SELECT VALUE 2');
		//        console.log(res);
		expect(res).toEqual([[], 2]);
		done();
	});

	test('2. ONE WHILE ASYNC', done => {
		alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            ',
			[],
			function (res) {
				//                console.log("ASYNC:",res);
				expect(res).toEqual([1, [1, 1, 1]]);
				done();
			}
		);
	});

	test('3. ONE WHILE SYNC', done => {
		var res = alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            '
		);
		// console.log("SYNC:",res);
		expect(res).toEqual([1, [1, 1, 1]]);
		done();
	});
});
