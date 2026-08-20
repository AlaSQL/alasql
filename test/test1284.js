if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1284 - ATTACH SQLITE DATABASE with async sql.js initialization', function () {
	var originalLoadBinaryFile;
	var originalSQL;
	var originalInitSqlJs;

	class FakeSqlDatabase {
		constructor(data) {
			this.data = data;
		}

		exec(sql) {
			if (sql === "SELECT * FROM sqlite_master WHERE type='table'") {
				return [
					{
						values: [[null, 'signatures', null, null, 'CREATE TABLE signatures (name TEXT)']],
					},
				];
			}

			if (sql === 'SELECT * FROM signatures') {
				return [
					{
						columns: ['name'],
						values: [['Ada']],
					},
				];
			}

			throw new Error('Unexpected SQL: ' + sql);
		}
	}

	beforeEach(function () {
		originalLoadBinaryFile = alasql.utils.loadBinaryFile;
		originalSQL = global.SQL;
		originalInitSqlJs = global.initSqlJs;
		alasql.engines.SQLITE.sqljs = null;
		alasql.engines.SQLITE.sqljsPromise = null;

		alasql.utils.loadBinaryFile = function (path, runAsync, success) {
			setTimeout(function () {
				success('fake sqlite data');
			}, 0);
		};

		global.SQL = function () {
			return Promise.resolve({Database: FakeSqlDatabase});
		};
		delete global.initSqlJs;
	});

	afterEach(function () {
		alasql.utils.loadBinaryFile = originalLoadBinaryFile;

		if (typeof originalSQL === 'undefined') {
			delete global.SQL;
		} else {
			global.SQL = originalSQL;
		}

		if (typeof originalInitSqlJs === 'undefined') {
			delete global.initSqlJs;
		} else {
			global.initSqlJs = originalInitSqlJs;
		}

		if (alasql.databases.inscriptions) {
			alasql('DETACH DATABASE inscriptions');
		}
		alasql.engines.SQLITE.sqljs = null;
		alasql.engines.SQLITE.sqljsPromise = null;
	});

	it('supports promise-based sql.js initialization for ATTACH/USE/SELECT', async function () {
		const res = await alasql([
			'ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")',
			'USE inscriptions',
			'SELECT * FROM signatures',
		]);

		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});

	it('supports initSqlJs globals used by browser builds', async function () {
		delete global.SQL;
		global.initSqlJs = function () {
			return Promise.resolve({Database: FakeSqlDatabase});
		};

		const res = await alasql([
			'ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")',
			'USE inscriptions',
			'SELECT * FROM signatures',
		]);

		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});
});
