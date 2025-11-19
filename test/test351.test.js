// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 351 CALL PROCEDURE', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test351;USE test351');
		done();
	});

	test('2. CREATE TABLE', done => {
		alasql.fn.myfn = function (a, b) {
			//      console.log(a,b);
			expect([a, b]).toEqual([1, 2]);
			done();
		};
		var res = alasql('CALL myfn(1,2)');
		//    expect(res).toEqual(1);
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test351');
		done();
	});
});
