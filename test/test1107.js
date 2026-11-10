if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test1107.json', {
		strict: false,
		ws: '',
	});
}

var test = '1107';

describe('Test 1107 - ALTER TABLE ADD COLUMN', function () {
	describe('A) In-memory database', function () {
		before(function () {
			alasql('CREATE DATABASE test' + test);
			alasql('USE test' + test);
		});

		after(function () {
			alasql('DROP DATABASE test' + test);
		});

		it('1. ADD COLUMN updates schema and accepts values on INSERT', function () {
			alasql('CREATE TABLE test (language INT, hello STRING)');
			alasql("INSERT INTO test VALUES (1,'Hello!')");
			alasql("INSERT INTO test VALUES (2,'Aloha!')");
			alasql("INSERT INTO test VALUES (3,'Bonjour!')");

			var alterRes = alasql('ALTER TABLE test ADD COLUMN aaa STRING');
			assert.equal(alterRes, 1);
			assert(alasql.tables.test.xcolumns.aaa, 'new column should exist in xcolumns');
			assert.deepStrictEqual(
				alasql.tables.test.columns.map(function (c) {
					return c.columnid;
				}),
				['language', 'hello', 'aaa']
			);

			var insertRes = alasql("INSERT INTO test VALUES (4,'Hello!','xxxx')");
			assert.equal(insertRes, 1);

			var res = alasql('SELECT * FROM test WHERE language > 1 ORDER BY language');
			assert.deepStrictEqual(res, [
				{language: 2, hello: 'Aloha!', aaa: undefined},
				{language: 3, hello: 'Bonjour!', aaa: undefined},
				{language: 4, hello: 'Hello!', aaa: 'xxxx'},
			]);
		});
	});

	describe('B) localStorage database (issue reproduction)', function () {
		before(function () {
			// Clear any leftover keys from previous runs
			if (typeof localStorage !== 'undefined' && localStorage.clear) {
				localStorage.clear();
			}
			alasql.options.autocommit = true;
			alasql('DROP localStorage DATABASE IF EXISTS Main' + test);
			alasql('CREATE localStorage DATABASE IF NOT EXISTS Main' + test);
			alasql('ATTACH localStorage DATABASE Main' + test + ' AS Main' + test);
			alasql('USE Main' + test);
		});

		after(function () {
			try {
				alasql('DETACH DATABASE Main' + test);
			} catch (e) {
				/* ignore */
			}
			alasql('DROP localStorage DATABASE IF EXISTS Main' + test);
			if (typeof localStorage !== 'undefined' && localStorage.clear) {
				localStorage.clear();
			}
		});

		it('1. ADD COLUMN persists schema and values with autocommit', function () {
			alasql('CREATE TABLE test (language INT, hello STRING)');
			alasql("INSERT INTO test VALUES (1,'Hello!')");
			alasql("INSERT INTO test VALUES (2,'Aloha!')");
			alasql("INSERT INTO test VALUES (3,'Bonjour!')");

			var alterRes = alasql('ALTER TABLE test ADD COLUMN aaa STRING');
			assert.equal(alterRes, 1);

			// Schema must be visible immediately
			var cols = alasql('SHOW COLUMNS FROM test');
			assert.deepStrictEqual(
				cols.map(function (c) {
					return c.columnid;
				}),
				['language', 'hello', 'aaa']
			);

			var insertRes = alasql("INSERT INTO test VALUES (4,'Hello!','xxxx')");
			assert.equal(insertRes, 1);

			var res = alasql('SELECT * FROM test WHERE language > 1 ORDER BY language');
			assert.deepStrictEqual(res, [
				{language: 2, hello: 'Aloha!', aaa: undefined},
				{language: 3, hello: 'Bonjour!', aaa: undefined},
				{language: 4, hello: 'Hello!', aaa: 'xxxx'},
			]);
		});

		it('2. ADD COLUMN schema survives re-ATTACH', function () {
			try {
				alasql('DETACH DATABASE Main' + test);
			} catch (e) {
				/* ignore */
			}
			alasql('ATTACH localStorage DATABASE Main' + test + ' AS Main' + test);
			alasql('USE Main' + test);

			var cols = alasql('SHOW COLUMNS FROM test');
			assert.deepStrictEqual(
				cols.map(function (c) {
					return c.columnid;
				}),
				['language', 'hello', 'aaa']
			);

			var res = alasql('SELECT * FROM test WHERE language = 4');
			assert.deepStrictEqual(res, [{language: 4, hello: 'Hello!', aaa: 'xxxx'}]);
		});

		it('3. ADD COLUMN after UPDATE does not wipe existing rows', function () {
			// UPDATE with autocommit clears in-memory table.data via saveTableData();
			// ALTER must reload data before persisting the new schema.
			alasql('DROP TABLE IF EXISTS t');
			alasql('CREATE TABLE t (a INT)');
			alasql('INSERT INTO t VALUES (1),(2),(3)');
			alasql('UPDATE t SET a = a + 1');
			assert.equal(alasql('ALTER TABLE t ADD COLUMN b STRING'), 1);

			var res = alasql('SELECT * FROM t ORDER BY a');
			assert.deepStrictEqual(res, [
				{a: 2, b: undefined},
				{a: 3, b: undefined},
				{a: 4, b: undefined},
			]);

			var cols = alasql('SHOW COLUMNS FROM t');
			assert.deepStrictEqual(
				cols.map(function (c) {
					return c.columnid;
				}),
				['a', 'b']
			);
		});
	});

	describe('C) localStorage database attached under another name', function () {
		const columns = t => alasql('SHOW COLUMNS FROM ' + t).map(c => c.columnid + ':' + c.dbtypeid);

		before(function () {
			alasql.options.autocommit = true;
			alasql('DROP localStorage DATABASE IF EXISTS ls' + test);
			alasql('CREATE localStorage DATABASE ls' + test);
			alasql('ATTACH localStorage DATABASE ls' + test + ' AS other' + test);
			alasql('USE other' + test);
		});

		after(function () {
			alasql('USE alasql');
			alasql('DETACH DATABASE other' + test);
			alasql('DROP localStorage DATABASE IF EXISTS ls' + test);
		});

		it('1. MODIFY, RENAME and DROP COLUMN and an UPDATE survive re-ATTACH', function () {
			alasql('CREATE TABLE t (a INT, b STRING, c INT)');
			alasql("INSERT INTO t VALUES (1,'x',7),(2,'y',8)");
			assert.equal(alasql('ALTER TABLE t MODIFY COLUMN c STRING'), 1);
			assert.equal(alasql('ALTER TABLE t RENAME COLUMN b TO bb'), 2);
			assert.equal(alasql('ALTER TABLE t DROP COLUMN a'), 2);
			assert.equal(alasql("UPDATE t SET bb = 'z' WHERE c = 8"), 1);

			alasql('USE alasql');
			alasql('DETACH DATABASE other' + test);
			alasql('ATTACH localStorage DATABASE ls' + test + ' AS other' + test);
			alasql('USE other' + test);

			assert.deepStrictEqual(columns('t'), ['bb:STRING', 'c:STRING']);
			assert.deepStrictEqual(alasql('SELECT * FROM t'), [
				{bb: 'x', c: 7},
				{bb: 'z', c: 8},
			]);
		});
	});

	describe('D) FILESTORAGE database', function () {
		const file = require('path').join(__dirname, 'test' + test + '-fs.json');

		after(function () {
			alasql('USE alasql');
			alasql('DETACH DATABASE fs' + test);
			try {
				require('fs').unlinkSync(file);
			} catch (e) {
				/* ignore */
			}
		});

		it('1. ADD COLUMN is saved to the file and survives re-ATTACH', function (done) {
			const sql = s => new Promise(resolve => alasql(s, resolve));
			(async function () {
				alasql.options.autocommit = true;
				await sql('CREATE FILESTORAGE DATABASE fs' + test + '("' + file + '")');
				await sql('ATTACH FILESTORAGE DATABASE fs' + test + '("' + file + '")');
				await sql('USE fs' + test);
				await sql('CREATE TABLE t (a INT, b STRING)');
				await sql("INSERT INTO t VALUES (1,'x')");
				assert.equal(await sql('ALTER TABLE t ADD COLUMN c INT'), 1);
				await sql("INSERT INTO t VALUES (2,'y',9)");
				await new Promise(resolve => setTimeout(resolve, 200));

				await sql('USE alasql');
				await sql('DETACH DATABASE fs' + test);
				await sql('ATTACH FILESTORAGE DATABASE fs' + test + '("' + file + '")');
				await sql('USE fs' + test);
				const cols = await sql('SHOW COLUMNS FROM t');
				assert.deepStrictEqual(
					cols.map(c => c.columnid),
					['a', 'b', 'c']
				);
				assert.deepStrictEqual(await sql('SELECT * FROM t WHERE a = 2'), [{a: 2, b: 'y', c: 9}]);
			})().then(done, done);
		});
	});

	describe('E) In-memory MODIFY and RENAME COLUMN', function () {
		before(function () {
			alasql('CREATE DATABASE testE' + test);
			alasql('USE testE' + test);
		});

		after(function () {
			alasql('USE alasql');
			alasql('DROP DATABASE testE' + test);
		});

		it('1. MODIFY COLUMN sets the new type, RENAME COLUMN calls the callback', function (done) {
			alasql('CREATE TABLE m (a INT, b INT)');
			alasql('INSERT INTO m VALUES (1, 2)');
			alasql('ALTER TABLE m MODIFY COLUMN b STRING');
			assert.equal(alasql.databases['testE' + test].tables.m.xcolumns.b.dbtypeid, 'STRING');
			alasql('ALTER TABLE m RENAME COLUMN a TO aa', function (res) {
				assert.equal(res, 1);
				assert.deepStrictEqual(alasql('SELECT * FROM m'), [{aa: 1, b: 2}]);
				done();
			});
		});
	});
});
