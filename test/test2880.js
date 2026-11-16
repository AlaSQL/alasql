if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2880'; // Regular indexes are kept in step on DELETE and UPDATE

describe(`Test ${testId} - regular indexes follow INSERT, DELETE and UPDATE`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// The rows of an index as {key: [b of each row]}
	function index(tableid, indexid) {
		var table = alasql.databases['test' + testId].tables[tableid];
		var ix = table.indices[table.inddefs[indexid].hh];
		var res = {};
		Object.keys(ix).forEach(function (key) {
			res[key] = ix[key].map(function (r) {
				return r.b;
			});
		});
		return res;
	}

	it('A) An inline INDEX after DELETE and UPDATE', function () {
		alasql('CREATE TABLE t (a INT, b INT, INDEX ia (a))');
		alasql('INSERT INTO t VALUES (1,1),(2,2),(3,3),(3,4)');
		alasql('DELETE FROM t WHERE a = 2');
		alasql('UPDATE t SET a = 10 WHERE b = 3');
		assert.deepStrictEqual(index('t', 'ia'), {1: [1], 3: [4], 10: [3]});
	});

	it('B) CREATE INDEX after DELETE and UPDATE', function () {
		alasql('CREATE TABLE t2 (a INT, b INT)');
		alasql('INSERT INTO t2 VALUES (1,1),(2,2),(3,3)');
		alasql('CREATE INDEX ia2 ON t2 (a)');
		alasql('DELETE FROM t2 WHERE b = 1');
		alasql('UPDATE t2 SET a = 2 WHERE b = 3');
		alasql('INSERT INTO t2 VALUES (5,5)');
		assert.deepStrictEqual(index('t2', 'ia2'), {2: [2, 3], 5: [5]});
	});

	it('C) INSERT OR REPLACE moves the row in the index', function () {
		alasql('CREATE TABLE t3 (id INT PRIMARY KEY, a INT, b INT, INDEX ia3 (a))');
		alasql('INSERT INTO t3 VALUES (1,1,1),(2,1,2)');
		alasql('INSERT OR REPLACE INTO t3 VALUES (1,7,1)');
		assert.deepStrictEqual(index('t3', 'ia3'), {1: [2], 7: [1]});
	});

	it('D) INSERT of many rows fills the index', function () {
		alasql('CREATE TABLE t4 (a INT, b INT, INDEX ia4 (a))');
		var rows = [];
		for (var i = 0; i < 100; i++) rows.push({a: i % 4, b: i});
		alasql('INSERT INTO t4 SELECT * FROM ?', [rows]);
		var ix = index('t4', 'ia4');
		assert.deepStrictEqual(
			Object.keys(ix).map(function (key) {
				return ix[key].length;
			}),
			[25, 25, 25, 25]
		);
	});

	it('E) TRUNCATE, DELETE of a whole key and an UPDATE that keeps the key', function () {
		alasql('CREATE TABLE t5 (a INT, b INT, INDEX ia5 (a))');
		alasql('INSERT INTO t5 VALUES (1,1),(2,2)');
		alasql('TRUNCATE TABLE t5');
		alasql('INSERT INTO t5 VALUES (3,3),(4,4),(4,5)');
		alasql('DELETE FROM t5 WHERE a = ?', [3]);
		alasql('UPDATE t5 SET b = b + 10 WHERE a = 4');
		assert.deepStrictEqual(index('t5', 'ia5'), {4: [14, 15]});
	});

	it('G) UPDATE and DELETE of most rows', function () {
		alasql('CREATE TABLE t7 (a INT, b INT, INDEX ia7 (a))');
		alasql('INSERT INTO t7 VALUES (1,1),(1,2),(2,3),(3,4)');
		alasql('UPDATE t7 SET a = 5 WHERE b < 4');
		assert.deepStrictEqual(index('t7', 'ia7'), {3: [4], 5: [1, 2, 3]});
		alasql('DELETE FROM t7 WHERE a = 5');
		assert.deepStrictEqual(index('t7', 'ia7'), {3: [4]});
	});

	it('H) A row that keeps its key keeps its place in the bucket', function () {
		alasql('CREATE TABLE t8 (a INT, b INT, INDEX ia8 (a))');
		alasql('INSERT INTO t8 VALUES (1,1),(1,2),(1,3)');
		alasql('UPDATE t8 SET b = 20 WHERE b = 2');
		assert.deepStrictEqual(index('t8', 'ia8'), {1: [1, 20, 3]});
	});

	it('I) An UPDATE that fails on a later row', function () {
		alasql('CREATE TABLE t9 (a INT, b INT, CHECK (a < 3), INDEX ia9 (a))');
		alasql('INSERT INTO t9 VALUES (1,1),(1,2),(2,3)');
		assert.throws(function () {
			alasql('UPDATE t9 SET a = a + 1');
		});
		assert.deepStrictEqual(alasql('SELECT a, b FROM t9 ORDER BY b'), [
			{a: 2, b: 1},
			{a: 2, b: 2},
			{a: 2, b: 3},
		]);
		assert.deepStrictEqual(index('t9', 'ia9'), {2: [3, 1, 2]});
	});

	it('F) An index on several columns with a prefix', function () {
		alasql('CREATE TABLE t6 (a INT, b STRING, INDEX ia6 (a, b(2)))');
		alasql("INSERT INTO t6 VALUES (1,'xyz'),(1,'xyw'),(2,'q')");
		alasql("UPDATE t6 SET b = 'qq' WHERE b = 'xyw'");
		alasql('DELETE FROM t6 WHERE a = 2');
		var table = alasql.databases['test' + testId].tables.t6;
		var ix = table.indices[table.inddefs.ia6.hh];
		assert.deepStrictEqual(
			Object.keys(ix).map(function (key) {
				return key + ':' + ix[key].length;
			}),
			['1`xy:1', '1`qq:1']
		);
	});
});
