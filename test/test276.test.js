// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 276 INFORMATION_SCHEMA', function () {
	test('1. Prepare databases', function (done) {
		alasql('CREATE DATABASE test276; USE test276');
		alasql('CREATE TABLE one (a INT, b NVARCHAR(10))');
		alasql('INSERT INTO one VALUES (1,"One"), (2,"Two"), (3,"Three"), (4,"Four")');

		alasql('CREATE VIEW view_one AS SELECT * FROM one WHERE a > 2');
		var res = alasql('SELECT * FROM INFORMATION_SCHEMA.[VIEWS] WHERE TABLE_CATALOG = "test276"');
		assert.deepEqual(res, [{TABLE_CATALOG: 'test276', TABLE_NAME: 'view_one'}]);
		//    console.log(res);
		done();
	});

	test('2. INFORMATION_SCHEMA', function (done) {
		assert(alasql.databases.test276.tables.view_one);
		alasql.options.modifier = 'RECORDSET';
		alasql(
			'  IF EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS \
               WHERE TABLE_NAME = "view_one") DROP VIEW view_one'
		);
		//    console.log(Object.keys(alasql.databases.test276.tables).length);
		assert(!alasql.databases.test276.tables.view_one);
		done();
	});

	test('99. Drop databases', function (done) {
		alasql.options.modifier = undefined;

		alasql('DROP DATABASE test276');
		done();
	});
});
