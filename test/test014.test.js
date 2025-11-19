// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 014', () => {
	test('Indices', () => {
		var db = new alasql.Database('db');
		db.exec('DROP TABLE IF EXISTS test1');
		db.exec('DROP TABLE IF EXISTS test2');

		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (1,7)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');

		db.exec('CREATE TABLE test2 (a int, c int)');
		db.exec('INSERT INTO test2 VALUES (1,5)');
		db.exec('INSERT INTO test2 VALUES (2,6)');

		var res = db.exec(
			'SELECT test1.a,b,test2.c FROM test1 LEFT JOIN test2 ON test1.a = test2.a ' +
				' WHERE test1.a = 1'
		);
		expect(res).toEqual([
			{a: 1, b: 1, c: 5},
			{a: 1, b: 7, c: 5},
		]);
		//		expect(1).toEqual(Object.keys(db.tables.test1.indices).length);
		expect(Object.keys(db.tables.test2.indices).length).toEqual(1);
		//console.log(db.tables.test1.indices);

		var res = db.exec(
			'SELECT test1.a,b,test2.c FROM test1 LEFT JOIN test2 ON test1.a = test2.a ' +
				' WHERE test1.a = 2'
		);
		expect(res).toEqual([{a: 2, b: 2, c: 6}]);
		//		expect(1).toEqual(Object.keys(db.tables.test1.indices).length);
		expect(Object.keys(db.tables.test2.indices).length).toEqual(1);
	});
});
