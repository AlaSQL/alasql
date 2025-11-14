// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 351 CALL PROCEDURE', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test351;USE test351');
		done();
	});

	test('2. CREATE TABLE', function (done) {
		alasql.fn.myfn = function (a, b) {
			//      console.log(a,b);
			assert.deepEqual([a, b], [1, 2]);
			done();
		};
		var res = alasql('CALL myfn(1,2)');
		//    assert.deepEqual(res,1);
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test351');
		done();
	});
});
