// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 339 UNION EXTRACT INTERSECT', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test339;USE test339');
		alasql.options.modifier = 'COLUMN';
		done();
	});

	test.skip('2. CREATE TABLE', function (done) {
		var res = alasql(function () {
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

	test.skip('3. UNION', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      union
      select col from b;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [1, 2, 3, 4]);
		done();
	});

	test.skip('4. UNION ALL', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      union all
      select col from b;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [1, 1, 2, 2, 3, 4]);
		done();
	});

	test.skip('5. EXCEPT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      except
      select col from b;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [3]);
		done();
	});
	test.skip('6. INTERSECT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      intersect
      select col from b;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [1, 2]);
		done();
	});

	test.skip('7. INTERSECT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      intersect
      select col from b;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [1, 2]);
		done();
	});

	test.skip('8. UNION UNION', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      union
      select col from b
      union
      select col from c;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [1, 2, 3, 4, 5]);
		done();
	});

	test.skip('9. UNION EXCEPT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      union
      select col from b
      except
      select col from c;
    */
		});
		console.log(res);
		assert.deepEqual(res.sort(), [3]);
		done();
	});

	test.skip('10. UNION EXCEPT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      except
      select col from b
      union
      select col from c;
    */
		});
		console.log(res);
		assert.deepEqual(res.sort(), [1, 2, 3, 5]);
		done();
	});

	test.skip('11. UNION INTERSECT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      union
      select col from b
      intersect
      select col from c;
    */
		});
		console.log(res);
		assert.deepEqual(res.sort(), [1, 2, 3]);
		done();
	});

	test.skip('12. INTERSECT UNION', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      intersect
      select col from b
      union
      select col from c;
    */
		});
		console.log(res);
		assert.deepEqual(res.sort(), [1, 2, 3]);
		done();
	});

	test.skip('13. UNION INTERSECT', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      except
      select col from b
      intersect
      select col from c;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), [3]);
		done();
	});

	test.skip('14. INTERSECT UNION', function (done) {
		var res = alasql(function () {
			/*
      select col from a
      intersect
      select col from b
      except
      select col from c;
    */
		});
		//    console.log(res);
		assert.deepEqual(res.sort(), []);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test339');
		done();
	});
});
