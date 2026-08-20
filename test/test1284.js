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

	it('rejects when async sql.js initialization fails', async function () {
		delete global.SQL;
		global.initSqlJs = function () {
			return Promise.reject(new Error('sql.js init failed'));
		};

		await assert.rejects(function () {
			return alasql(['ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")']);
		}, /sql\.js init failed/);
	});

	it('retries sql.js initialization after a failure', async function () {
		delete global.SQL;
		var shouldFail = true;
		global.initSqlJs = function () {
			if (shouldFail) {
				return Promise.reject(new Error('sql.js init failed'));
			}
			return Promise.resolve({Database: FakeSqlDatabase});
		};

		await assert.rejects(function () {
			return alasql(['ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")']);
		}, /sql\.js init failed/);

		shouldFail = false;

		const res = await alasql([
			'ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")',
			'USE inscriptions',
			'SELECT * FROM signatures',
		]);

		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});

	it('rejects invalid async sql.js module shapes', async function () {
		delete global.SQL;
		global.initSqlJs = function () {
			return Promise.resolve({});
		};

		await assert.rejects(function () {
			return alasql(['ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")']);
		}, /did not expose a Database constructor/);
	});

	it('rejects when the SQLite file cannot be loaded', async function () {
		alasql.utils.loadBinaryFile = function (path, runAsync, success, error) {
			setTimeout(function () {
				error(new Error('load failed'));
			}, 0);
		};

		await assert.rejects(
			function () {
				return alasql(['ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")']);
			},
			function (err) {
				assert.match(err.message, /Cannot open SQLite database file "mydb\.sqlite3"/);
				assert.strictEqual(err.cause.message, 'load failed');
				return true;
			}
		);
	});
});
