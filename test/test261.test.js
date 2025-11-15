// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 261 SqlLogic Parser Test #4', () => {
	test('1. Sqllogic', done => {
		alasql('CREATE DATABASE test261; USE test261');
		done();
	});

	test('2. CREATE TABLE', done => {
		var res = alasql('CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER)');
		expect(res == 1).toBe(true);
		done();
	});

	test('3. INSERT', done => {
		var res = alasql('INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245)');
		expect(res == 1).toBe(true);
		done();
	});

	test('4. SELECT CASE', done => {
		var res = alasql(
			'SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1'
		);
		done();
	});

	test('5. SELECT', done => {
		var res = alasql(' SELECT a+b*2+c*3+d*4+e*5, (a+b+c+d+e)/5 FROM t1');
		//    console.log(res);
		done();
	});

	test('6. SELECT', done => {
		var res = alasql(`
		      SELECT a+b*2+c*3+d*4+e*5,
             CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222
              WHEN a<b+3 THEN 333 ELSE 444 END,
             abs(b-c),
             (a+b+c+d+e)/5,
             a+b*2+c*3
        FROM t1
       WHERE (e>c OR e<d)
         AND d>e
         AND EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b)
  `);
		//    console.log(res);
		done();
	});

	test('7. SELECT', done => {
		var res = alasql(`
      SELECT CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END
        FROM t1
       WHERE e+d BETWEEN a+b-10 AND c+130
         AND c>d
		 `);
		//    console.log(res);

		done();
	});

	test('99. Drop Database', done => {
		alasql('DROP DATABASE test261');
		done();
	});
});
