import {describe, expect, test} from 'bun:test';
import {Database, registerDatabase} from '../../src/database/Database.js';

describe('Database class', () => {
	test('creates database with id', () => {
		const db = new Database('testdb');
		expect(db.databaseid).toBe('testdb');
		expect(db.tables).toStrictEqual({});
		expect(db.views).toStrictEqual({});
		expect(db.triggers).toStrictEqual({});
		expect(db.indices).toStrictEqual({});
	});

	test('initializes with empty cache', () => {
		const db = new Database('testdb');
		expect(db.sqlCache).toStrictEqual({});
		expect(db.sqlCacheSize).toBe(0);
		expect(db.astCache).toStrictEqual({});
	});

	test('resetSqlCache clears caches', () => {
		const db = new Database('testdb');
		db.sqlCache['SELECT 1'] = 'compiled';
		db.sqlCacheSize = 1;
		db.astCache['SELECT 1'] = {ast: true};

		db.resetSqlCache();

		expect(db.sqlCache).toStrictEqual({});
		expect(db.sqlCacheSize).toBe(0);
		expect(db.astCache).toStrictEqual({});
	});

	test('exec throws before registration', () => {
		const db = new Database('testdb');
		expect(() => db.exec('SELECT 1')).toThrow();
	});

	test('registerDatabase attaches Database to alasql', () => {
		const mockAlasql = {
			dexec: () => 'result',
			autoval: () => 1,
			Transaction: function () {},
		};
		registerDatabase(mockAlasql);
		expect(mockAlasql.Database).toBe(Database);
	});

	test('exec works after registration', () => {
		const mockAlasql = {
			dexec: (dbid, sql, params, cb) => ({dbid, sql}),
		};
		registerDatabase(mockAlasql);

		const db = new Database('testdb');
		const result = db.exec('SELECT 1');
		expect(result.dbid).toBe('testdb');
		expect(result.sql).toBe('SELECT 1');
	});
});
