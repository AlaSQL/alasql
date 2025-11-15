// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var db;

describe('Test 19', () => {
	test('1. Create tables', () => {
		db = new alasql.Database('db');
		db.exec('CREATE TABLE test1 (a int)');
		db.exec('INSERT INTO test1 VALUES (1)');
		db.exec('INSERT INTO test1 VALUES (2)');
		db.exec('INSERT INTO test1 VALUES (3)');
		db.exec('INSERT INTO test1 VALUES (4)');
		db.exec('INSERT INTO test1 VALUES (5)');
		db.exec('INSERT INTO test1 VALUES (6)');

		db.exec('CREATE TABLE test2 (a int, b int)');
		db.exec('INSERT INTO test2 VALUES (1, 1)');
		db.exec('INSERT INTO test2 VALUES (1, 2)');
		db.exec('INSERT INTO test2 VALUES (1, 3)');
		db.exec('INSERT INTO test2 VALUES (2, 4)');
	});

	test('2. EXISTS', () => {
		var res = db.exec(
			'SELECT COLUMN a FROM test1 WHERE EXISTS ' + '(SELECT * FROM test2 WHERE test1.a = test2.b)'
		);
		expect(res).toEqual([1, 2, 3, 4]);
	});

	test('3. NOT EXISTS', () => {
		var res = db.exec(
			'SELECT COLUMN a FROM test1 WHERE NOT EXISTS ' +
				'(SELECT * FROM test2 WHERE test1.a = test2.a)'
		);
		expect(res).toEqual([3, 4, 5, 6]);
	});
});
