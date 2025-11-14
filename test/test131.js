// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (false) {
	describe('Test 131 CAST and CONVERT', function () {
		test('1. CAST', function (done) {
			alasql('source "' + __dirname + '/test131.sql"');
			done();
		});

		test('2. CAST dates', function (done) {
			alasql.options.datetimeformat = 'javascript';
			var res = alasql.value('select cast("1998-01-01" as date)');
			assert.equal(typeof res, 'object');
			assert(res instanceof Date);
			assert(res.valueOf(), new Date('1998-01-01').valueOf());

			alasql.options.datetimeformat = 'sql';
			var res = alasql.value('select cast("1998-01-01" as date)');
			assert.equal(res, '1998-01-01');
			done();
		});
	});
}
