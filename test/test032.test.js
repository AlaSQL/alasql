// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 32', () => {
	var db = new alasql.Database('db');

	test('LIKE, NOT LIKE and aliases', () => {
		db.exec('CREATE TABLE test (a STRING, b INT, t DATETIME)');
		db.exec("INSERT INTO test (a) VALUES ('a')");
		db.exec("INSERT INTO test (a) VALUES ('ab')");
		db.exec("INSERT INTO test (a) VALUES ('abc')");
		db.exec("INSERT INTO test (a) VALUES ('abcd')");
		db.exec("INSERT INTO test (a) VALUES ('abcde')");

		var sql = 'UPDATE test SET b = LEN(a), t = NOW()';
		expect(db.exec(sql)).toEqual(5);

		var sql = "SELECT COLUMN b FROM test WHERE a LIKE '%bc%'";
		expect(db.exec(sql)).toEqual([3, 4, 5]);

		var sql = "SELECT COLUMN b FROM test WHERE a NOT LIKE '%bc%'";
		expect(db.exec(sql)).toEqual([1, 2]);

		var sql = "SELECT COLUMN b FROM test WHERE a NOT     LIKE '%bc%'";
		expect(db.exec(sql)).toEqual([1, 2]);

		var likeAliases = ['like', 'ilike', '~~', '~~*'],
			notLikeAliases = ['not like', 'not      like', 'not     ilike', '!~~', '!~~*'];

		// caseinsensetive
		for (var i in likeAliases) {
			var sql = 'SELECT COLUMN b FROM test WHERE a ' + likeAliases[i] + " '%BC%'";
			expect(db.exec(sql)).toEqual([3, 4, 5]);
		}

		// caseinsensetive
		for (var i in notLikeAliases) {
			var sql = 'SELECT COLUMN b FROM test WHERE a ' + notLikeAliases[i] + " '%BC%'";
			expect(db.exec(sql)).toEqual([1, 2]);
		}
	});

	test('2. Can do LIKE on numbers', () => {
		db.exec('CREATE TABLE test32 (a int)');
		db.exec('INSERT INTO test32 (a) VALUES (4)');
		db.exec('INSERT INTO test32 (a) VALUES (44)');
		db.exec('INSERT INTO test32 (a) VALUES (404)');
		db.exec('INSERT INTO test32 (a) VALUES (444)');
		db.exec('INSERT INTO test32 (a) VALUES (1234)');

		var sql = "value of SELECT COUNT(a) FROM test32 WHERE a LIKE '4%'";
		expect(db.exec(sql)).toEqual(4);

		var sql = "value of SELECT a FROM test32 WHERE a LIKE '_4_'";
		// expect(444).toEqual(db.exec(sql));

		var sql = "value of SELECT a FROM test32 WHERE a LIKE '%2_4'";
		expect(db.exec(sql)).toEqual(1234);
	});
});
