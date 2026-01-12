import {describe, expect, test} from 'bun:test';
import {Table, registerTable} from '../../src/database/Table.js';

describe('Table class', () => {
	test('creates empty table', () => {
		const table = new Table();
		expect(table.columns).toStrictEqual([]);
		expect(table.data).toStrictEqual([]);
		expect(table.xcolumns).toStrictEqual({});
	});

	test('creates table with params', () => {
		const table = new Table({tableid: 'users'});
		expect(table.tableid).toBe('users');
	});

	test('initializes indices structures', () => {
		const table = new Table();
		expect(table.indices).toStrictEqual({});
		expect(table.inddefs).toStrictEqual({});
		expect(table.uniqs).toStrictEqual({});
	});

	test('initializes trigger structures', () => {
		const table = new Table();
		expect(table.beforeinsert).toStrictEqual({});
		expect(table.afterinsert).toStrictEqual({});
		expect(table.beforedelete).toStrictEqual({});
		expect(table.afterdelete).toStrictEqual({});
		expect(table.beforeupdate).toStrictEqual({});
		expect(table.afterupdate).toStrictEqual({});
	});

	test('addColumn adds to columns and xcolumns', () => {
		const table = new Table();
		table.addColumn({columnid: 'name', dbtypeid: 'STRING'});
		expect(table.columns).toHaveLength(1);
		expect(table.xcolumns.name).toBeDefined();
		expect(table.xcolumns.name.dbtypeid).toBe('STRING');
	});

	test('insert adds record', () => {
		const table = new Table();
		const result = table.insert({id: 1, name: 'Test'});
		expect(result).toBe(1);
		expect(table.data).toHaveLength(1);
		expect(table.data[0]).toStrictEqual({id: 1, name: 'Test'});
	});

	test('indexColumns builds xcolumns from columns', () => {
		const table = new Table();
		table.columns = [{columnid: 'id'}, {columnid: 'name'}];
		table.indexColumns();
		expect(table.xcolumns.id).toBeDefined();
		expect(table.xcolumns.name).toBeDefined();
	});

	test('registerTable attaches Table to alasql', () => {
		const mockAlasql = {};
		registerTable(mockAlasql);
		expect(mockAlasql.Table).toBe(Table);
	});
});
