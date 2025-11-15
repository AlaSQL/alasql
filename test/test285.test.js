// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 285 CREATE UNIQUE INDEX', () => {
	test('1. CREATE TABLE and FIRST INSERT', done => {
		var res = alasql(`
      CREATE DATABASE test285;
      USE DATABASE test285;

      CREATE TABLE One
      (      a INT ,
             b INT
      );

      CREATE UNIQUE INDEX ux_one ON One(a,b);

      INSERT INTO One VALUES(1,1);
      INSERT INTO One VALUES(1,2);
	  `);
		/// console.log(res);
		//    expect(res).toEqual([1,1,1,1,1,1]);

		done();
	});

	test('1. DROP DATABASE', done => {
		var res = alasql('DROP DATABASE test285');
		done();
	});
});
