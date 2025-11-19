// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 339 UNION EXTRACT INTERSECT', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test339;USE test339');
		alasql.options.modifier = 'COLUMN';
		done();
	});

	test.skip('2. CREATE TABLE', done => {
		var res = alasql(() => {
			/*

create table a (col int);
insert into a (col) values (1), (2), (3);

create table b (col int);
insert into b (col) values (1), (2), (4);

create table c (col int);
insert into c (col) values (1), (2), (5);

*/
		});
		//  console.log(res);

		done();
	});

	test.skip('3. UNION', done => {
		var res = alasql(() => {
			/*
      select col from a
      union
      select col from b;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([1, 2, 3, 4]);
		done();
	});

	test.skip('4. UNION ALL', done => {
		var res = alasql(() => {
			/*
      select col from a
      union all
      select col from b;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([1, 1, 2, 2, 3, 4]);
		done();
	});

	test.skip('5. EXCEPT', done => {
		var res = alasql(() => {
			/*
      select col from a
      except
      select col from b;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([3]);
		done();
	});
	test.skip('6. INTERSECT', done => {
		var res = alasql(() => {
			/*
      select col from a
      intersect
      select col from b;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([1, 2]);
		done();
	});

	test.skip('7. INTERSECT', done => {
		var res = alasql(() => {
			/*
      select col from a
      intersect
      select col from b;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([1, 2]);
		done();
	});

	test.skip('8. UNION UNION', done => {
		var res = alasql(() => {
			/*
      select col from a
      union
      select col from b
      union
      select col from c;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([1, 2, 3, 4, 5]);
		done();
	});

	test.skip('9. UNION EXCEPT', done => {
		var res = alasql(() => {
			/*
      select col from a
      union
      select col from b
      except
      select col from c;
    */
		});
		console.log(res);
		expect(res.sort()).toEqual([3]);
		done();
	});

	test.skip('10. UNION EXCEPT', done => {
		var res = alasql(() => {
			/*
      select col from a
      except
      select col from b
      union
      select col from c;
    */
		});
		console.log(res);
		expect(res.sort()).toEqual([1, 2, 3, 5]);
		done();
	});

	test.skip('11. UNION INTERSECT', done => {
		var res = alasql(() => {
			/*
      select col from a
      union
      select col from b
      intersect
      select col from c;
    */
		});
		console.log(res);
		expect(res.sort()).toEqual([1, 2, 3]);
		done();
	});

	test.skip('12. INTERSECT UNION', done => {
		var res = alasql(() => {
			/*
      select col from a
      intersect
      select col from b
      union
      select col from c;
    */
		});
		console.log(res);
		expect(res.sort()).toEqual([1, 2, 3]);
		done();
	});

	test.skip('13. UNION INTERSECT', done => {
		var res = alasql(() => {
			/*
      select col from a
      except
      select col from b
      intersect
      select col from c;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([3]);
		done();
	});

	test.skip('14. INTERSECT UNION', done => {
		var res = alasql(() => {
			/*
      select col from a
      intersect
      select col from b
      except
      select col from c;
    */
		});
		//    console.log(res);
		expect(res.sort()).toEqual([]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test339');
		done();
	});
});
