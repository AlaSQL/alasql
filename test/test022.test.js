// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 22', () => {
	test('EXCEPT and INTERSECT', () => {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');
		db.exec('INSERT INTO test VALUES (4,4)');
		db.exec('INSERT INTO test VALUES (5,5)');
		db.exec('INSERT INTO test VALUES (6,6)');

		var res = db.exec('SELECT COLUMN a FROM test WHERE a<5 INTERSECT SELECT a FROM test WHERE a>2');

		expect(res).toEqual([3, 4]);

		var res = db.exec('SELECT COLUMN a FROM test WHERE a<5 EXCEPT SELECT a FROM test WHERE a>2');
		expect(res).toEqual([1, 2]);
	});
});
