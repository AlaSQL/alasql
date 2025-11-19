// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 24', () => {
	test('IN (select) and NOT IN (select)', () => {
		var db = new alasql.Database('test24');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1)');
		db.exec('INSERT INTO test1 VALUES (2,2)');
		db.exec('INSERT INTO test1 VALUES (3,3)');
		db.exec('INSERT INTO test1 VALUES (4,4)');
		db.exec('INSERT INTO test1 VALUES (5,5)');
		db.exec('INSERT INTO test1 VALUES (6,6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (2,2)');
		db.exec('INSERT INTO test2 VALUES (3,3)');

		var res = db.exec('SELECT * FROM test1 WHERE a IN (SELECT a FROM test2)');
		expect(res.length).toEqual(2);
		//		console.log(res);
	});
});
