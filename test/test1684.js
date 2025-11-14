// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 1684 - UNION ALL still not returning correct results bug', function () {
	test('1. should not insert empty objects in results when using UNION ALL Expression', function (done) {
		var data = [
			{city: 'Madrid', population: 3041579},
			{city: 'Rome', population: 2863223},
			{city: 'Paris', population: 2249975},
		];
		var sql =
			"SELECT city FROM :data WHERE city = 'Madrid' \
                UNION ALL SELECT city FROM :data WHERE city = 'Rome' \
                UNION ALL SELECT city FROM :data WHERE city = 'Paris' \
                ";
		var res = alasql(sql, {data});
		assert.deepEqual(res, [{city: 'Madrid'}, {city: 'Rome'}, {city: 'Paris'}]);

		var sql =
			"SELECT * FROM :data WHERE city = 'Madrid' \
                UNION ALL SELECT * FROM :data WHERE city = 'Rome' \
                UNION ALL SELECT * FROM :data WHERE city = 'Paris' \
                ";
		var res = alasql(sql, {data});
		assert.deepEqual(res, [
			{city: 'Madrid', population: 3041579},
			{city: 'Rome', population: 2863223},
			{city: 'Paris', population: 2249975},
		]);

		done();
	});
});
