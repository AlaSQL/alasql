// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 202 GETTIME and CAST', () => {
	test('1a. GETDATE() as String', done => {
		let res = alasql('SELECT ROW NOW(),GETDATE()');
		//console.log(res);
		expect(res[0].toString().substr(0, 20) === res[1].toString().substr(0, 20)).toBe(true);
		done();
	});

	test('1b. GETDATE() as Date', done => {
		alasql.options.dateAsString = false;
		let res = alasql('SELECT ROW NOW(),GETDATE()');
		//        console.log(res);
		expect(res[0] instanceof Date).toBe(true);
		expect(res[1] instanceof Date).toBe(true);
		expect(res[1].toISOString() === res[0].toISOString()).toBe(true);
		done();
	});

	test('2. CONVERT(,,110) as String', done => {
		let res = alasql('SELECT VALUE CONVERT(NVARCHAR(10),GETDATE(),110)');
		//        console.log(res);
		expect(res.substr(-4) == new Date().getFullYear()).toBe(true);
		//        expect(res[0].substr(0,20).toBe(true)==res[1].substr(0,20));
		done();
	});
});
