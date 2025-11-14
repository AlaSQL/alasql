// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 277 NVARCHAR(precision) - issue #150', function () {
	test('1. Prepare databases', function (done) {
		alasql('CREATE DATABASE test277; USE test277');
		done();
	});

	test('2. INFORMATION_SCHEMA', function (done) {
		alasql('CREATE TABLE one (a INT, b NVARCHAR(10), c CHAR(12), d FIXED(1,2))');
		alasql(
			'INSERT INTO one VALUES (1,"One","one",1.1), (2,"Two","two",1.2), (3,"Three","three",1.3)'
		);
		var res = alasql('SELECT RECORDSET * FROM one');
		assert.deepEqual(
			res.columns,

			[
				{
					columnid: 'a',
					dbtypeid: 'INT',
					dbsize: undefined,
					dbprecision: undefined,
					dbenum: undefined,
				},
				{
					columnid: 'b',
					dbtypeid: 'NVARCHAR',
					dbsize: 10,
					dbprecision: undefined,
					dbenum: undefined,
				},
				{
					columnid: 'c',
					dbtypeid: 'CHAR',
					dbsize: 12,
					dbprecision: undefined,
					dbenum: undefined,
				},
				{
					columnid: 'd',
					dbtypeid: 'FIXED',
					dbsize: 1,
					dbprecision: 2,
					dbenum: undefined,
				},
			]
		);

		//    console.log(res.columns);
		//    console.log(alasql.databases.test277.tables.one.columns);
		//    assert(!alasql.databases.test276.tables.view_one);
		done();
	});

	test('99. Drop databases', function (done) {
		alasql('DROP DATABASE test277');
		done();
	});
});
