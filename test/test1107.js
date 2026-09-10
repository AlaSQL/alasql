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
	});
});
