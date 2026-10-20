if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '989';

// signatures table from myDb.sqlite3 attached to issue #989, as stored in sqlite_master
var REPORTER_DDL =
	'CREATE TABLE "signatures" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "signature_text" varchar(200) NOT NULL, "meta_id" integer NULL REFERENCES "meta_information" ("id") DEFERRABLE INITIALLY DEFERRED, "parent_id" integer NULL REFERENCES "signatures" ("id") DEFERRABLE INITIALLY DEFERRED)';

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
	it('I) DDL from the database attached to issue #989', function () {
		let ast = alasql.parse(REPORTER_DDL);
		let cols = ast.statements[0].columns;
		assert.strictEqual(ast.statements[0].table.tableid, 'signatures');
		assert.deepStrictEqual(
			cols.map(c => c.columnid),
			['id', 'signature_text', 'meta_id', 'parent_id']
		);
		assert.deepStrictEqual(JSON.parse(JSON.stringify(cols[2].foreignkey)), {
			table: {tableid: 'meta_information'},
			columnid: 'id',
		});
		assert.deepStrictEqual(JSON.parse(JSON.stringify(cols[3].foreignkey)), {
			table: {tableid: 'signatures'},
			columnid: 'id',
		});
	});

	it('J) Double-quoted REFERENCES targets and DEFERRABLE clauses', function () {
		var plain = x => JSON.parse(JSON.stringify(x));
		let fk = alasql.parse('CREATE TABLE j1 (a INT REFERENCES "t3" ("a"))').statements[0].columns[0]
			.foreignkey;
		assert.deepStrictEqual(plain(fk), {table: {tableid: 't3'}, columnid: 'a'});

		let con = alasql.parse(
			'CREATE TABLE j2 (a INT, FOREIGN KEY ("a") REFERENCES "t3" ("a") DEFERRABLE INITIALLY IMMEDIATE)'
		).statements[0].constraints[0];
		assert.deepStrictEqual(plain(con), {
			type: 'FOREIGN KEY',
			columns: ['a'],
			fktable: {tableid: 't3'},
			fkcolumns: ['a'],
		});

		fk = alasql.parse('CREATE TABLE j3 (a INT REFERENCES t3 (a) ON DELETE CASCADE DEFERRABLE)')
			.statements[0].columns[0].foreignkey;
		assert.deepStrictEqual(plain(fk), {table: {tableid: 't3'}, columnid: 'a', ondelete: 'CASCADE'});

		assert.throws(function () {
			alasql.parse('CREATE TABLE j4 (a INT REFERENCES t3 (a) DEFERRABLE INITIALLY LATER)');
		}, /Expected DEFERRABLE \[INITIALLY DEFERRED\|IMMEDIATE\]/);
		assert.throws(function () {
			alasql.parse('CREATE TABLE j5 (a INT REFERENCES t3 (a) FOO)');
		}, /Unexpected FOO after REFERENCES clause/);
		assert.throws(function () {
			alasql.parse("CREATE TABLE j6 (a INT REFERENCES t3 ('a'))");
		}, /Single-quoted string cannot be used as an identifier/);
	});

	it('K) Double-quoted names in a PRIMARY KEY column list', function () {
		alasql('CREATE TABLE pk2 ("a" INT, "b" INT, PRIMARY KEY ("a", "b"))');
		alasql('INSERT INTO pk2 VALUES (1, 2), (1, 3)');
		assert.throws(function () {
			alasql('INSERT INTO pk2 VALUES (1, 3)');
		}, /primary key/);
		assert.deepStrictEqual(alasql('SELECT * FROM pk2'), [
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
	});

	it('L) Double-quoted names in the other statements that name a table or column', function () {
		const res = alasql(
			'CREATE TABLE "My T" ("id" INT, "name" STRING);' +
				'INSERT INTO "My T" VALUES (1, "a"), (2, "b");' +
				'UPDATE "My T" SET name = "z" WHERE id = 2;' +
				'DELETE FROM "My T" WHERE id = 1;' +
				'ALTER TABLE "My T" ADD COLUMN "extra" INT;' +
				'ALTER TABLE "My T" RENAME COLUMN "extra" TO "more";' +
				'ALTER TABLE "My T" DROP COLUMN "more";' +
				'CREATE INDEX ix_my_t ON "My T" (id);' +
				'SELECT * FROM [My T]'
		);
		assert.deepStrictEqual(res.pop(), [{id: 2, name: 'z'}]);

		alasql('TRUNCATE TABLE "My T"');
		assert.deepStrictEqual(alasql('SELECT * FROM [My T]'), []);
		alasql('DROP TABLE "My T"');
		assert.strictEqual(alasql.databases['test' + testId].tables['My T'], undefined);
	});

	it('M) In expressions and FROM, double quotes keep their meaning', function () {
		alasql('CREATE TABLE friends (name STRING); INSERT INTO friends VALUES ("Andrey")');
		assert.deepStrictEqual(alasql('SELECT * FROM friends WHERE name = "Andrey"'), [
			{name: 'Andrey'},
		]);
		assert.throws(() => alasql('SELECT * FROM "friends"'), /Unknown string in FROM clause/);
	});
});

describe(`Test ${testId} - ATTACH SQLITE DATABASE with double-quoted identifiers`, function () {
	var originalLoadBinaryFile;
	var originalSQL;
	var originalInitSqlJs;

	class FakeSqlDatabase {
		exec(sql) {
			if (sql === "SELECT * FROM sqlite_master WHERE type='table'") {
				return [
					{
						values: [
							['table', 'signatures', 'signatures', 2, REPORTER_DDL],
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
				return [
					{
						columns: ['id', 'signature_text', 'meta_id', 'parent_id'],
						values: [
							[1, 'first', null, null],
							[2, 'reply', null, 1],
						],
					},
				];
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

	it('H) Attaches the issue #989 database schema', async function () {
		const res = await alasql([
			'ATTACH SQLITE DATABASE db989("my989.sqlite3")',
			'USE db989',
			'SELECT * FROM signatures',
		]);
		assert.deepStrictEqual(res, [
			1,
			1,
			[
				{id: 1, signature_text: 'first', meta_id: null, parent_id: null},
				{id: 2, signature_text: 'reply', meta_id: null, parent_id: 1},
			],
		]);
		assert.deepStrictEqual(
			alasql.databases.db989.tables.signatures.columns.map(c => c.columnid),
			['id', 'signature_text', 'meta_id', 'parent_id']
		);
	});
});
