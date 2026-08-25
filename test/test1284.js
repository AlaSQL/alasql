if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1284 - ATTACH SQLITE DATABASE with async sql.js initialization', function () {
	var hostGlobals = alasql.utils.global;
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

	function resetSqliteEngineState() {
		if (alasql.databases.inscriptions) {
			alasql('DETACH DATABASE inscriptions');
		}
		alasql.engines.SQLITE.sqljs = null;
		alasql.engines.SQLITE.sqljsPromise = null;
	}

	function restoreGlobal(name, value) {
		if (typeof value === 'undefined') {
			delete hostGlobals[name];
		} else {
			hostGlobals[name] = value;
		}
	}

	function mockSqliteFileLoad() {
		alasql.utils.loadBinaryFile = function (path, runAsync, success) {
			setTimeout(function () {
				success('fake sqlite data');
			}, 0);
		};
	}

	function resolveFakeSqlJsModule() {
		return Promise.resolve({Database: FakeSqlDatabase});
	}

	function useAsyncSqlGlobal() {
		hostGlobals.SQL = resolveFakeSqlJsModule;
		delete hostGlobals.initSqlJs;
	}

	function useBrowserStyleInitSqlJs(initSqlJs) {
		delete hostGlobals.SQL;
		hostGlobals.initSqlJs = initSqlJs;
	}

	function attachDatabase() {
		return alasql(['ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")']);
	}

	function attachUseAndSelect() {
		return alasql([
			'ATTACH SQLITE DATABASE inscriptions("mydb.sqlite3")',
			'USE inscriptions',
			'SELECT * FROM signatures',
		]);
	}

	beforeEach(function () {
		originalLoadBinaryFile = alasql.utils.loadBinaryFile;
		originalSQL = hostGlobals.SQL;
		originalInitSqlJs = hostGlobals.initSqlJs;
		resetSqliteEngineState();
		mockSqliteFileLoad();
		useAsyncSqlGlobal();
	});

	afterEach(function () {
		alasql.utils.loadBinaryFile = originalLoadBinaryFile;
		restoreGlobal('SQL', originalSQL);
		restoreGlobal('initSqlJs', originalInitSqlJs);
		resetSqliteEngineState();
	});

	it('supports promise-based sql.js initialization for ATTACH/USE/SELECT', async function () {
		const res = await attachUseAndSelect();

		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});

	it('supports initSqlJs globals used by browser builds', async function () {
		useBrowserStyleInitSqlJs(resolveFakeSqlJsModule);

		const res = await attachUseAndSelect();

		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});

	it('rejects when async sql.js initialization fails', async function () {
		useBrowserStyleInitSqlJs(function () {
			return Promise.reject(new Error('sql.js init failed'));
		});

		await assert.rejects(attachDatabase, /sql\.js init failed/);
	});

	it('retries sql.js initialization after a failure', async function () {
		var attempt = 0;
		useBrowserStyleInitSqlJs(function () {
			attempt += 1;
			if (attempt === 1) {
				return Promise.reject(new Error('sql.js init failed'));
			}
			return resolveFakeSqlJsModule();
		});

		await assert.rejects(attachDatabase, /sql\.js init failed/);
		assert.strictEqual(attempt, 1);

		const res = await attachUseAndSelect();

		assert.strictEqual(attempt, 2);
		assert.deepStrictEqual(res, [1, 1, [{name: 'Ada'}]]);
	});

	it('rejects invalid async sql.js module shapes', async function () {
		useBrowserStyleInitSqlJs(function () {
			return Promise.resolve({});
		});

		await assert.rejects(attachDatabase, /did not expose a Database constructor/);
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
