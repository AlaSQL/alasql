if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '406'; // MySQL index prefix: UNIQUE (a(N)) uses the first N characters of a

describe(`Test ${testId} B - index column prefix length`, function () {
	before(function () {
		alasql('create database test406b');
		alasql('use test406b');
	});

	after(function () {
		alasql('drop database test406b');
	});

	const duplicate = /already exists in unique index/;

	it('A) UNIQUE (a(1)) from the issue checks the first character only', function () {
		alasql('CREATE TABLE t7(a TEXT, UNIQUE (a(1)))');
		alasql("INSERT INTO t7 VALUES ('ab')");
		assert.throws(() => alasql("INSERT INTO t7 VALUES ('ac')"), duplicate);
		alasql("INSERT INTO t7 VALUES ('bc')");
		assert.deepStrictEqual(alasql('SELECT * FROM t7'), [{a: 'ab'}, {a: 'bc'}]);
	});

	it('B) Several columns, with and without a prefix', function () {
		alasql('CREATE TABLE t8(a TEXT, b TEXT, UNIQUE (a(1), b(2)))');
		alasql("INSERT INTO t8 VALUES ('ab', 'xyz')");
		assert.throws(() => alasql("INSERT INTO t8 VALUES ('ac', 'xyw')"), duplicate);
		alasql("INSERT INTO t8 VALUES ('ac', 'xzw')");

		alasql('CREATE TABLE t9(a TEXT, b INT, UNIQUE KEY k (a(2), b))');
		alasql("INSERT INTO t9 VALUES ('abc', 1)");
		assert.throws(() => alasql("INSERT INTO t9 VALUES ('abd', 1)"), duplicate);
		alasql("INSERT INTO t9 VALUES ('abd', 2)");

		assert.deepStrictEqual(alasql('SELECT * FROM t8 ORDER BY b; SELECT * FROM t9 ORDER BY b'), [
			[
				{a: 'ab', b: 'xyz'},
				{a: 'ac', b: 'xzw'},
			],
			[
				{a: 'abc', b: 1},
				{a: 'abd', b: 2},
			],
		]);
	});

	it('C) CREATE UNIQUE INDEX and CREATE INDEX with a prefix', function () {
		alasql('CREATE TABLE t10(a TEXT)');
		alasql('CREATE UNIQUE INDEX ux10 ON t10 (a(2))');
		alasql("INSERT INTO t10 VALUES ('abc')");
		assert.throws(() => alasql("INSERT INTO t10 VALUES ('abd')"), duplicate);

		alasql('CREATE TABLE t11(a TEXT)');
		alasql("INSERT INTO t11 VALUES ('abc'), ('abd')");
		alasql('CREATE INDEX ix11 ON t11 (a(2))');
		alasql("INSERT INTO t11 VALUES ('abe')");

		assert.deepStrictEqual(alasql("SELECT * FROM t10; SELECT * FROM t11 WHERE a LIKE 'ab%'"), [
			[{a: 'abc'}],
			[{a: 'abc'}, {a: 'abd'}, {a: 'abe'}],
		]);
	});

	it('D) NULL and numbers in a prefixed column', function () {
		alasql('CREATE TABLE t12(a TEXT, UNIQUE (a(2)))');
		alasql("INSERT INTO t12 VALUES (NULL), ('abc'), (12345)");
		assert.throws(() => alasql('INSERT INTO t12 VALUES (12999)'), duplicate);
		assert.deepStrictEqual(alasql('SELECT * FROM t12'), [{a: undefined}, {a: 'abc'}, {a: 12345}]);
	});

	it('E) Functions in a UNIQUE constraint still work', function () {
		alasql('CREATE TABLE t13(a TEXT, UNIQUE (UPPER(a)))');
		alasql("INSERT INTO t13 VALUES ('x')");
		assert.throws(() => alasql("INSERT INTO t13 VALUES ('X')"), duplicate);

		alasql('CREATE TABLE t14(a TEXT, UNIQUE (MID(a, 1, 2)))');
		alasql("INSERT INTO t14 VALUES ('abc')");
		assert.throws(() => alasql("INSERT INTO t14 VALUES ('abd')"), duplicate);

		assert.deepStrictEqual(alasql('SELECT * FROM t13; SELECT * FROM t14'), [
			[{a: 'x'}],
			[{a: 'abc'}],
		]);
	});

	it('F) PRIMARY KEY with a prefix', function () {
		alasql('CREATE TABLE t15(a TEXT, PRIMARY KEY (a(2)))');
		alasql("INSERT INTO t15 VALUES ('abc')");
		const duplicateKey = /already exists in primary key index/;
		assert.throws(() => alasql("INSERT INTO t15 VALUES ('abd')"), duplicateKey);

		alasql('CREATE TABLE t16(a TEXT, b INT, CONSTRAINT pk16 PRIMARY KEY (a(1), b))');
		alasql("INSERT INTO t16 VALUES ('ab', 1), ('ac', 2)");
		assert.throws(() => alasql("INSERT INTO t16 VALUES ('ad', 1)"), duplicateKey);

		assert.deepStrictEqual(alasql('SELECT * FROM t15; SELECT * FROM t16'), [
			[{a: 'abc'}],
			[
				{a: 'ab', b: 1},
				{a: 'ac', b: 2},
			],
		]);
	});

	it('G) INDEX in CREATE TABLE with a prefix', function () {
		alasql('CREATE TABLE t17(a TEXT, b TEXT, INDEX k17 (a(1), b))');
		alasql("INSERT INTO t17 VALUES ('ab', 'x'), ('ab', 'x')");
		assert.deepStrictEqual(alasql('SELECT * FROM t17'), [
			{a: 'ab', b: 'x'},
			{a: 'ab', b: 'x'},
		]);
	});
});
