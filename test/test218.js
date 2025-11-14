// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 218 N string and PRINT "a"', function () {
	test("1. N'String' ", function (done) {
		var res = alasql("SELECT VALUE N'This is a string'"); // N' added for compatibility with MSSQL - the N can be avoided.
		//        console.log(res);
		assert(res == 'This is a string');
		done();
	});
});
