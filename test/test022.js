// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 22', function () {
	test('EXCEPT and INTERSECT', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');
		db.exec('INSERT INTO test VALUES (4,4)');
		db.exec('INSERT INTO test VALUES (5,5)');
		db.exec('INSERT INTO test VALUES (6,6)');

		var res = db.exec('SELECT COLUMN a FROM test WHERE a<5 INTERSECT SELECT a FROM test WHERE a>2');

		assert.deepEqual([3, 4], res);

		var res = db.exec('SELECT COLUMN a FROM test WHERE a<5 EXCEPT SELECT a FROM test WHERE a>2');
		assert.deepEqual([1, 2], res);

		done();
	});
});
