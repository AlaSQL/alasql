// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 34', function () {
	test('INSERT INTO VALUES', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a STRING)');
		db.exec("INSERT INTO test (a) VALUES ('a'), ('b'), ('c')");

		var sql = 'SELECT COLUMN * FROM test';
		assert.deepEqual(['a', 'b', 'c'], db.exec(sql));

		done();
	});
});
