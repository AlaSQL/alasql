//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 110: LEFT JOIN', () => {
	test('Left join of two tables', done => {
		alasql.exec('DROP TABLE IF EXISTS test');
		alasql.exec('CREATE TABLE test (a int, b int)');
		alasql.exec('INSERT INTO test VALUES (1,1)');
		alasql.exec('INSERT INTO test VALUES (1,7)');
		alasql.exec('INSERT INTO test VALUES (2,2)');
		alasql.exec('INSERT INTO test VALUES (3,3)');

		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('CREATE TABLE test1 (a int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,5)');
		alasql.exec('INSERT INTO test1 VALUES (2,6)');

		var res = alasql.exec(
			'SELECT SUM(b) AS sb,test1.a,test1.c\
		 FROM test LEFT JOIN test1 ON test.a = test1.a GROUP BY c,test.a'
		);

		expect(8).toEqual(res[0].sb);
		expect(2).toEqual(res[1].sb);
		expect(3).toEqual(res[2].sb);
		done();
	});
});

describe('INNER JOIN', () => {
	test('Inner join of three tables', done => {
		alasql.exec('DROP TABLE IF EXISTS test');

		alasql.exec('CREATE TABLE test (a int, b int)');
		alasql.exec('INSERT INTO test VALUES (1,1)');
		alasql.exec('INSERT INTO test VALUES (1,7)');
		alasql.exec('INSERT INTO test VALUES (2,2)');
		alasql.exec('INSERT INTO test VALUES (3,3)');

		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('CREATE TABLE test1 (a int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,5)');
		alasql.exec('INSERT INTO test1 VALUES (2,6)');

		alasql.exec('DROP TABLE IF EXISTS test2');
		alasql.exec('CREATE TABLE test2 (c int, d int)');
		alasql.exec('INSERT INTO test2 VALUES (5,50)');
		alasql.exec('INSERT INTO test2 VALUES (6,60)');

		var res = alasql.exec(
			'SELECT test1.a, test2.d FROM test ' +
				' JOIN test1 ON test.a = test1.a ' +
				' JOIN test2 ON test1.c = test2.c '
		);

		expect(3).toEqual(res.length);
		done();
	});

	test('Inner join and aggregate of three tables', done => {
		alasql.exec('DROP TABLE IF EXISTS test');
		alasql.exec('CREATE TABLE test (a int, b int)');
		alasql.exec('INSERT INTO test VALUES (1,1)');
		alasql.exec('INSERT INTO test VALUES (1,7)');
		alasql.exec('INSERT INTO test VALUES (1,9)');
		alasql.exec('INSERT INTO test VALUES (2,2)');
		alasql.exec('INSERT INTO test VALUES (3,3)');

		alasql.exec('DROP TABLE IF EXISTS test1');
		alasql.exec('CREATE TABLE test1 (a int, c int)');
		alasql.exec('INSERT INTO test1 VALUES (1,5)');
		alasql.exec('INSERT INTO test1 VALUES (2,6)');

		alasql.exec('DROP TABLE IF EXISTS test2');
		alasql.exec('CREATE TABLE test2 (c int, d int)');
		alasql.exec('INSERT INTO test2 VALUES (5,50)');
		alasql.exec('INSERT INTO test2 VALUES (6,60)');

		var res = alasql.exec(
			'SELECT SUM(test.b) AS sumb, test2.d FROM test ' +
				' JOIN test1 ON test.a = test1.a ' +
				' JOIN test2 ON test1.c = test2.c ' +
				' GROUP BY d'
		);

		expect(17).toEqual(res[0].sumb);
		expect(2).toEqual(res.length);
		done();
	});
});
