// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//
describe('Test 336 SLT test #4', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test336;USE test336');

		done();
	});

	test.skip('2. Create table', done => {
		var res = alasql(() => {
			/*
    CREATE TABLE t1(
      a1 INTEGER,
      b1 INTEGER,
      c1 INTEGER,
      d1 INTEGER,
      e1 INTEGER,
      x1 VARCHAR(30)
    )
   */
		});
		expect(res).toEqual(1);
		done();
	});

	test.skip('3. INSERT some data', done => {
		var res = alasql(() => {
			/*
      INSERT INTO t1 VALUES(382,414,67,992,483,'table tn1 row 1');
--      INSERT INTO t1 VALUES(231,468,97,414,795,'table tn1 row 2');
--      INSERT INTO t1 VALUES(810,355,805,274,858,'table tn1 row 3');
--      INSERT INTO t1 VALUES(536,956,417,418,381,'table tn1 row 4');
    */
		});
		//    console.log(res);
		expect(res).toEqual([1, 1, 1, 1]);

		done();
	});

	test.skip('3. CREATE INDEX', done => {
		var res = alasql(() => {
			/*
      CREATE INDEX t1i0 ON t1(a1,b1,c1,d1,e1,x1);
      CREATE INDEX t1i1 ON t1(b1,c1,d1,e1,x1);
      CREATE INDEX t1i2 ON t1(c1,d1,e1,x1);
      CREATE INDEX t1i3 ON t1(d1,e1,x1);
      CREATE INDEX t1i4 ON t1(e1,x1);
    */
		});
		//    console.log(res);
		expect(res).toEqual([1, 1, 1, 1, 1]);

		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test336');
		done();
	});
});
