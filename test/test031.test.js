// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 31', () => {
	test('ALTER TABLE RENAME', () => {
		var db = new alasql.Database('db');
		db.exec('DROP TABLE IF EXISTS test1');
		db.exec('DROP TABLE IF EXISTS test2');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		var sql = 'SELECT a FROM test1';
		expect(db.exec(sql).length).toEqual(6);

		var sql = 'ALTER TABLE test1 RENAME TO test2';
		db.exec(sql);

		var sql = 'SELECT a FROM test2 ';
		expect(db.exec(sql).length).toEqual(6);
	});
});
