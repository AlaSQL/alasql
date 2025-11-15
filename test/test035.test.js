// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 35 - LIMIT OFFSET', () => {
	test('1. Test 1', () => {
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

	test('2. Test 1', () => {
		alasql('CREATE DATABASE test35; use test35');
		alasql('CREATE TABLE test1 (a int)');

		for (var i = 1; i < 1000; i++) {
			alasql('INSERT INTO test1 VALUES (?)', [i]);
		}

		var sql = 'SELECT COLUMN TOP 2 a FROM test1';
		var res = alasql(sql);
		expect(res).toEqual([1, 2]);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 5';
		var res = alasql(sql);
		expect(res).toEqual([1, 2, 3, 4, 5]);

		var sql = 'SELECT COLUMN a FROM test1 LIMIT 5 OFFSET 2';
		var res = alasql(sql);
		expect(res).toEqual([3, 4, 5, 6, 7]);

		alasql('drop database test35');
	});
});
