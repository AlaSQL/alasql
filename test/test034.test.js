// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 34', () => {
	test('INSERT INTO VALUES', () => {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a STRING)');
		db.exec("INSERT INTO test (a) VALUES ('a'), ('b'), ('c')");

		var sql = 'SELECT COLUMN * FROM test';
		expect(db.exec(sql)).toEqual(['a', 'b', 'c']);
	});
});
