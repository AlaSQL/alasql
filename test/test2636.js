if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2636 - RECORDSET OF SELECT * over a join lists shared columns once', function () {
	before(function () {
		alasql('CREATE DATABASE test2636; USE test2636');
		alasql('CREATE TABLE t (a INT, b INT, c INT); CREATE TABLE u (a INT, d INT)');
		alasql('INSERT INTO t VALUES (1,2,3); INSERT INTO u VALUES (1,4)');
	});

	after(function () {
		alasql('DROP DATABASE test2636');
	});

	function columnids(sql) {
		return alasql(sql).columns.map(function (c) {
			return c.columnid;
		});
	}

	it('A) with rows', function () {
		assert.deepEqual(columnids('RECORDSET OF SELECT * FROM t JOIN u ON t.a = u.a'), [
			'a',
			'b',
			'c',
			'd',
		]);
	});

	it('B) without rows', function () {
		assert.deepEqual(columnids('RECORDSET OF SELECT * FROM t JOIN u ON t.a = u.a WHERE t.a = 5'), [
			'a',
			'b',
			'c',
			'd',
		]);
	});

	it('C) t.* is unchanged', function () {
		assert.deepEqual(columnids('RECORDSET OF SELECT t.* FROM t JOIN u ON t.a = u.a'), [
			'a',
			'b',
			'c',
		]);
	});
});
