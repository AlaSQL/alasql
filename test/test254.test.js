// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 254 UNION of two tables with different columns', () => {
	test('1. Create database', done => {
		alasql('CREATE DATABASE test254;USE test254');
		alasql(
			'CREATE TABLE t1(a int,b int);  \
            INSERT INTO t1 VALUES(1,1);  \
            INSERT INTO t1 VALUES(1,2);  \
            INSERT INTO t1 VALUES(1,3);  \
            CREATE TABLE t2(a int,b int);  \
            INSERT INTO t2 VALUES(1,2);  \
            INSERT INTO t2 VALUES(1,5);  \
      '
		);
		done();
	});

	test('2. UNION ALL CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 UNION ALL CORRESPONDING SELECT b, a FROM t1');
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
			{b: 1, a: 1},
			{b: 2, a: 1},
			{b: 3, a: 1},
		]);
		done();
	});

	test('3. UNION ALL not CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 UNION ALL SELECT b, a FROM t1');
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
			{a: 1, b: 1},
			{a: 2, b: 1},
			{a: 3, b: 1},
		]);
		done();
	});

	test('4. UNION CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 UNION CORRESPONDING SELECT b, a FROM t1');
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
		done();
	});

	test('5. UNION non CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 UNION SELECT b, a FROM t1');
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 2, b: 1},
			{a: 3, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
		done();
	});

	test('6. INTERSECT CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 INTERSECT CORRESPONDING SELECT b, a FROM t1');
		//    console.log(res);
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
		done();
	});

	test('7. INTERSECT non CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 INTERSECT SELECT b, a FROM t1');
		//    console.log(res);
		expect(res).toEqual([{a: 1, b: 1}]);
		done();
	});

	test('8. EXCEPT CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 EXCEPT CORRESPONDING SELECT b, a FROM t1');
		//    console.log(res);
		expect(res).toEqual([]);
		done();
	});

	test('9. EXCEPT non CORRESPONDING', done => {
		var res = alasql('SELECT a, b FROM t1 EXCEPT SELECT b, a FROM t1');
		//    console.log(res);
		expect(res).toEqual([
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
		done();
	});

	test('99. Drop database', done => {
		alasql('DROP DATABASE test254');
		done();
	});
});
