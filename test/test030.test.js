// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 30', () => {
	test('JOIN USING', () => {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT COLUMN TOP 2 a FROM test1';
		var res = db.exec(sql);
		expect(res).toEqual([1, 2]);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 3';
		var res = db.exec(sql);
		expect(res).toEqual([1, 2, 3]);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 3 OFFSET 2';
		var res = db.exec(sql);
		expect(res).toEqual([3, 4, 5]);
	});
});
