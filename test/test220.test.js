// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 220 WITH clause', function () {
	test('1. One WITH', function (done) {
		var sql =
			'WITH one AS (SELECT * FROM ?), \
    		two AS (SELECT * FROM ?) \
            SELECT * FROM one,two;SELECT * FROM ?';
		//        console.log(alasql.parse(sql).toString());
		var res = alasql(
			'WITH one AS (SELECT * FROM ?), two AS (SELECT * FROM ?)\
            SELECT * FROM one,two',
			[
				[{a: 1}, {a: 2}],
				[{b: 10}, {b: 20}],
			]
		);
		//        console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 1, b: 20},
			{a: 2, b: 10},
			{a: 2, b: 20},
		]);
		done();
	});
});
