// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 17', function () {
	test('UNION ', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a int)');
		db.exec('INSERT INTO test VALUES (1)');
		db.exec('INSERT INTO test VALUES (2)');
		db.exec('INSERT INTO test VALUES (3)');
		db.exec('INSERT INTO test VALUES (4)');
		db.exec('INSERT INTO test VALUES (5)');
		db.exec('INSERT INTO test VALUES (6)');
		db.exec('INSERT INTO test VALUES (7)');

		var res = db.exec('SELECT a FROM test WHERE a<4 UNION ALL SELECT a FROM test WHERE a>2');

		assert.equal(8, res.length);
		done();
	});

	test('UNION ALL', function (done) {
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (a int)');
		db.exec('INSERT INTO test VALUES (1)');
		db.exec('INSERT INTO test VALUES (2)');
		db.exec('INSERT INTO test VALUES (3)');
		db.exec('INSERT INTO test VALUES (4)');
		db.exec('INSERT INTO test VALUES (5)');
		db.exec('INSERT INTO test VALUES (6)');
		db.exec('INSERT INTO test VALUES (7)');

		var res = db.exec('SELECT a FROM test WHERE a<4 UNION SELECT a FROM test WHERE a>2 ORDER BY a');
		assert.equal(7, res.length);

		done();
	});
});
