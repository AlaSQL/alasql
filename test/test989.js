if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '989';

describe(`Test ${testId} - CREATE TABLE with double-quoted identifiers`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Double-quoted table and column names', function () {
		let res = alasql(
			'CREATE TABLE "signatures" ("id" integer NOT NULL PRIMARY KEY, "name" varchar(10));' +
				"INSERT INTO signatures VALUES (1, 'x');" +
				'SELECT * FROM signatures'
		);
		assert.deepStrictEqual(res, [1, 1, [{id: 1, name: 'x'}]]);
	});

	it('B) Only column names double-quoted', function () {
		let res = alasql('CREATE TABLE t3 ("id" INT); INSERT INTO t3 VALUES (5); SELECT * FROM t3');
		assert.deepStrictEqual(res, [1, 1, [{id: 5}]]);
	});

	it('C) IF NOT EXISTS and AUTOINCREMENT as written by SQLite', function () {
		let res = alasql(
			'CREATE TABLE IF NOT EXISTS "auto" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(10) NOT NULL);' +
				'CREATE TABLE IF NOT EXISTS "auto" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(10) NOT NULL);' +
				"INSERT INTO auto (name) VALUES ('a'), ('b');" +
				'SELECT * FROM auto'
		);
		assert.deepStrictEqual(res, [
			1,
			0,
			2,
			[
				{id: 1, name: 'a'},
				{id: 2, name: 'b'},
			],
		]);
	});

	it('D) Parsed identifiers are unquoted and keep their case', function () {
		let ast = alasql.parse('CREATE TABLE "Mixed Case" ("Full Name" text, id integer)');
		assert.strictEqual(ast.statements[0].table.tableid, 'Mixed Case');
		assert.deepStrictEqual(
			ast.statements[0].columns.map(c => c.columnid),
			['Full Name', 'id']
		);

		ast = alasql.parse('CREATE TABLE "a""b" ("c""d" INT)');
		assert.strictEqual(ast.statements[0].table.tableid, 'a"b');
		assert.strictEqual(ast.statements[0].columns[0].columnid, 'c"d');
	});

	it('E) Double quotes outside CREATE TABLE are still strings', function () {
		let res = alasql(
			'CREATE TABLE people (name STRING);' +
				'INSERT INTO people VALUES ("Andrey");' +
				'SELECT "name" AS a, name FROM people'
		);
		assert.deepStrictEqual(res, [1, 1, [{a: 'name', name: 'Andrey'}]]);
	});

	it('F) Single-quoted strings are not accepted as identifiers', function () {
		assert.throws(function () {
			alasql("CREATE TABLE 'single' (a INT)");
		}, /Single-quoted string cannot be used as an identifier/);
		assert.throws(function () {
			alasql("CREATE TABLE single2 ('a' INT)");
		}, /Single-quoted string cannot be used as an identifier/);
		assert.strictEqual(alasql.databases['test' + testId].tables.single, undefined);
		assert.strictEqual(alasql.databases['test' + testId].tables.single2, undefined);
	});

	it('G) Bracket and backtick identifiers still work', function () {
		let res = alasql(
			'CREATE TABLE [br] ([id] INT, `name` STRING);' +
				"INSERT INTO br VALUES (1, 'z');" +
				'SELECT * FROM br'
		);
		assert.deepStrictEqual(res, [1, 1, [{id: 1, name: 'z'}]]);
	});
});

describe(`Test ${testId} - ATTACH SQLITE DATABASE with double-quoted identifiers`, function () {
	var originalLoadBinaryFile;
	var originalSQL;
	var originalInitSqlJs;

	// sqlite_master.sql exactly as stored by SQLite 3.46.1 (Python sqlite3)
	var SIGNATURES_DDL =
		'CREATE TABLE "signatures" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(10) NOT NULL)';

	class FakeSqlDatabase {
		exec(sql) {
			if (sql === "SELECT * FROM sqlite_master WHERE type='table'") {
				return [
					{
						values: [
							['table', 'signatures', 'signatures', 2, SIGNATURES_DDL],
							[
								'table',
								'sqlite_sequence',
								'sqlite_sequence',
								3,
								'CREATE TABLE sqlite_sequence(name,seq)',
							],
						],
					},
				];
			}
			if (sql === 'SELECT * FROM signatures') {
				return [{columns: ['id', 'name'], values: [[1, 'Ada']]}];
			}
			throw new Error('Unexpected SQL: ' + sql);
		}
	}

	beforeEach(function () {
		originalLoadBinaryFile = alasql.utils.loadBinaryFile;
		originalSQL = alasql.utils.global.SQL;
		originalInitSqlJs = alasql.utils.global.initSqlJs;
		alasql.engines.SQLITE.sqljs = null;
		alasql.engines.SQLITE.sqljsPromise = null;
		alasql.utils.loadBinaryFile = function (path, runAsync, success) {
			setTimeout(function () {
				success('fake sqlite data');
			}, 0);
		};
		alasql.utils.global.SQL = function () {
			return Promise.resolve({Database: FakeSqlDatabase});
		};
		delete alasql.utils.global.initSqlJs;
	});

	afterEach(function () {
		if (alasql.databases.db989) {
			alasql('DETACH DATABASE db989');
		}
		alasql.utils.loadBinaryFile = originalLoadBinaryFile;
		if (typeof originalSQL === 'undefined') {
			delete alasql.utils.global.SQL;
		} else {
			alasql.utils.global.SQL = originalSQL;
		}
		if (typeof originalInitSqlJs === 'undefined') {
			delete alasql.utils.global.initSqlJs;
		} else {
			alasql.utils.global.initSqlJs = originalInitSqlJs;
		}
		alasql.engines.SQLITE.sqljs = null;
		alasql.engines.SQLITE.sqljsPromise = null;
	});

	it('H) Attaches a SQLite database whose DDL uses double quotes', async function () {
		const res = await alasql([
			'ATTACH SQLITE DATABASE db989("my989.sqlite3")',
			'USE db989',
			'SELECT * FROM signatures',
		]);
		assert.deepStrictEqual(res, [1, 1, [{id: 1, name: 'Ada'}]]);
		assert.deepStrictEqual(
			alasql.databases.db989.tables.signatures.columns.map(c => c.columnid),
			['id', 'name']
		);
	});
});
