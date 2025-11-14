// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var dbFile = __dirname + '/test_db_fs.json';

(alasql.utils.isNode ? describe : describe.skip)(
	'Test 808 - Filestorage: Basic Operations and Drop Database',
	() => {
		const sql = alasql.promise;

		beforeAll(async () => {
			alasql('SET AUTOCOMMIT ON');
		});

		// afterAll(async () => {});

		test('A. Create a Filestorage DB', async () => {
			await sql('CREATE FILESTORAGE DATABASE testDBFS("' + dbFile + '")');
			await sql('ATTACH FILESTORAGE DATABASE testDBFS("' + dbFile + '")');
			await sql('USE testDBFS');
		});

		test('B. Basic Operations on a Filestorage DB table ', async () => {
			await sql('CREATE TABLE one (a VARCHAR, b INT)');
			await sql("INSERT INTO one VALUES ('A', 1), ('B', 2)");
			await sql("INSERT INTO one VALUES ('C', 3)");
			const res = await sql('SELECT * FROM one');
			const actual = [
				{a: 'A', b: 1},
				{a: 'B', b: 2},
				{a: 'C', b: 3},
			];

			assert.deepEqual(res, actual);
		});

		test('C. Detach and Drop a Filestorage DB', async () => {
			await sql('DETACH DATABASE testDBFS');
			await sql('DROP FILESTORAGE DATABASE testDBFS');
		});
	}
);
