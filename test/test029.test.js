// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 29', () => {
	test('JOIN USING', () => {
		var db = alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT COLUMN a FROM test1 WHERE a IN (2,3,4) AND a NOT IN (3)';
		var res = db.exec(sql);
		expect(res).toEqual([2, 4]);

		var sql = 'SELECT COLUMN a FROM test1 WHERE a = ANY (2,3,4)';
		var res = db.exec(sql);
		expect(res).toEqual([2, 3, 4]);

		// Postgres notation
		var sql = 'SELECT COLUMN a FROM test1 WHERE a = ANY (ARRAY[2,3,4])';
		var res = db.exec(sql);
		expect(res).toEqual([2, 3, 4]);
	});
});
