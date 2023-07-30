if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 32', function () {
	var db = new alasql.Database('db');

	it('LIKE, NOT LIKE and aliases', function (done) {
		db.exec('CREATE TABLE test (a STRING, b INT, t DATETIME)');
		db.exec("INSERT INTO test (a) VALUES ('a')");
		db.exec("INSERT INTO test (a) VALUES ('ab')");
		db.exec("INSERT INTO test (a) VALUES ('abc')");
		db.exec("INSERT INTO test (a) VALUES ('abcd')");
		db.exec("INSERT INTO test (a) VALUES ('abcde')");

		var sql = 'UPDATE test SET b = LEN(a), t = NOW()';
		assert.equal(5, db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a LIKE '%bc%'";
		assert.deepEqual([3, 4, 5], db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a NOT LIKE '%bc%'";
		assert.deepEqual([1, 2], db.exec(sql));

		var sql = "SELECT COLUMN b FROM test WHERE a NOT     LIKE '%bc%'";
		assert.deepEqual([1, 2], db.exec(sql));

		var likeAliases = ['like', 'ilike', '~~', '~~*'],
			notLikeAliases = ['not like', 'not      like', 'not     ilike', '!~~', '!~~*'];

		// caseinsensetive
		for (var i in likeAliases) {
			var sql = 'SELECT COLUMN b FROM test WHERE a ' + likeAliases[i] + " '%BC%'";
			assert.deepEqual([3, 4, 5], db.exec(sql));
		}

		// caseinsensetive
		for (var i in notLikeAliases) {
			var sql = 'SELECT COLUMN b FROM test WHERE a ' + notLikeAliases[i] + " '%BC%'";
			assert.deepEqual([1, 2], db.exec(sql));
		}

		done();
	});

	it('2. Can do LIKE on numbers', function (done) {
		db.exec('CREATE TABLE test32 (a int)');
		db.exec('INSERT INTO test32 (a) VALUES (4)');
		db.exec('INSERT INTO test32 (a) VALUES (44)');
		db.exec('INSERT INTO test32 (a) VALUES (404)');
		db.exec('INSERT INTO test32 (a) VALUES (444)');
		db.exec('INSERT INTO test32 (a) VALUES (1234)');

		var sql = "value of SELECT COUNT(a) FROM test32 WHERE a LIKE '4%'";
		assert.deepEqual(4, db.exec(sql));

		var sql = "value of SELECT a FROM test32 WHERE a LIKE '_4_'";
		// assert.deepEqual(444,db.exec(sql));

		var sql = "value of SELECT a FROM test32 WHERE a LIKE '%2_4'";
		assert.deepEqual(1234, db.exec(sql));
		done();
	});
});
