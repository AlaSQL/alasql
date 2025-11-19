// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (false) {
	describe('Test 131 CAST and CONVERT', () => {
		test('1. CAST', done => {
			alasql('source "' + __dirname + '/test131.sql"');
			done();
		});

		test('2. CAST dates', done => {
			alasql.options.datetimeformat = 'javascript';
			var res = alasql.value('select cast("1998-01-01" as date)');
			expect(typeof res).toEqual('object');
			expect(res instanceof Date).toBe(true);
			expect(res.valueOf().toBe(true), new Date('1998-01-01').valueOf());

			alasql.options.datetimeformat = 'sql';
			var res = alasql.value('select cast("1998-01-01" as date)');
			expect(res).toEqual('1998-01-01');
			done();
		});
	});
}
