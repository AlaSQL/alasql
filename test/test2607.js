if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2607';

describe(`Test ${testId} - INDEX name (...) inside CREATE TABLE creates an index`, function () {
	let db;

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		db = alasql.databases['test' + testId];
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// Number of rows under each key of each index of the table
	function indexContents(table) {
		return Object.values(table.indices).map(function (ix) {
			const counts = {};
			for (const addr in ix) counts[addr] = ix[addr].length;
			return counts;
		});
	}

	it('A) The index is registered like CREATE INDEX does', function () {
		alasql('CREATE TABLE t1 (a INT, b INT, INDEX k1 (a))');
		assert.strictEqual(alasql('SHOW INDEX FROM t1').length, 1);
		assert.strictEqual(db.indices.k1, 't1');
		assert.deepStrictEqual(Object.keys(db.tables.t1.inddefs), ['k1']);
	});

	it('B) Rows inserted after CREATE TABLE are found through the index', function () {
		alasql('CREATE TABLE t2 (a INT, b INT, INDEX k2 (a))');
		alasql('INSERT INTO t2 VALUES (1,10),(2,20),(1,30)');
		const table = db.tables.t2;
		const ix = table.indices[table.inddefs.k2.hh];
		assert.deepStrictEqual(
			ix[1].map(r => r.b),
			[10, 30]
		);
		assert.deepStrictEqual(
			ix[2].map(r => r.b),
			[20]
		);
	});

	it('C) Same index definition and contents as CREATE INDEX, with several columns and a prefix length', function () {
		alasql('CREATE TABLE t3 (a INT, b STRING, INDEX k3 (a, b(2)))');
		alasql('CREATE TABLE t4 (a INT, b STRING)');
		alasql('CREATE INDEX k3 ON t4 (a, b(2))');

		const rows = "(1,'xyz'),(1,'xyw'),(2,'q')";
		alasql('INSERT INTO t3 VALUES ' + rows);
		alasql('INSERT INTO t4 VALUES ' + rows);

		assert.deepStrictEqual(db.tables.t3.inddefs, db.tables.t4.inddefs);
		assert.deepStrictEqual(indexContents(db.tables.t3), [{'1`xy': 2, '2`q': 1}]);
		assert.deepStrictEqual(indexContents(db.tables.t3), indexContents(db.tables.t4));
	});

	it('D) Several indexes and other constraints in one CREATE TABLE', function () {
		alasql('CREATE TABLE t5 (a INT, b INT, c INT, PRIMARY KEY (a), INDEX k5b (b), INDEX k5c (c))');
		alasql('INSERT INTO t5 VALUES (1,2,3),(2,2,4)');
		assert.strictEqual(alasql('SHOW INDEX FROM t5').length, 2);
		assert.strictEqual(db.indices.k5b, 't5');
		assert.strictEqual(db.indices.k5c, 't5');
		assert.throws(function () {
			alasql('INSERT INTO t5 VALUES (1,9,9)');
		}, /primary key/i);
	});
});
