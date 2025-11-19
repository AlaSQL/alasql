// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 33', () => {
	test('WHERE IN list of values', () => {
		var db = new alasql.Database('db');
		db.exec('drop table if exists test1');
		db.exec('CREATE TABLE test1 (a int, b int)');
		db.exec('INSERT INTO test1 VALUES (1,1), (2,2), (3,3), (4,4), (5,5), (6,6)');
		var sql = 'SELECT COLUMN a FROM test1 WHERE b IN (3,5)';
		var res = db.exec(sql);
		expect(res).toEqual([3, 5]);
	});
});
