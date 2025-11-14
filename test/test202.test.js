// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 202 GETTIME and CAST', function () {
	test('1a. GETDATE() as String', function (done) {
		let res = alasql('SELECT ROW NOW(),GETDATE()');
		//console.log(res);
		assert(res[0].toString().substr(0, 20) === res[1].toString().substr(0, 20));
		done();
	});

	test('1b. GETDATE() as Date', function (done) {
		alasql.options.dateAsString = false;
		let res = alasql('SELECT ROW NOW(),GETDATE()');
		//        console.log(res);
		assert(res[0] instanceof Date);
		assert(res[1] instanceof Date);
		assert(res[1].toISOString() === res[0].toISOString());
		done();
	});

	test('2. CONVERT(,,110) as String', function (done) {
		let res = alasql('SELECT VALUE CONVERT(NVARCHAR(10),GETDATE(),110)');
		//        console.log(res);
		assert(res.substr(-4) == new Date().getFullYear());
		//        assert(res[0].substr(0,20)==res[1].substr(0,20));
		done();
	});
});
