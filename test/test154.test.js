// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 154 - IndexedDB test', () => {
		test('1. Create Database and Table', async () => {
			const sql = alasql.promise;

			const res1 = await sql('DROP IndexedDB DATABASE IF EXISTS ag154');
			expect(res1 === 1 || res1 === 0).toBe(true);

			const res2 = await sql('CREATE IndexedDB DATABASE ag154');
			expect(res2 === 1).toBe(true);

			if (globalThis.indexedDB.databases) {
				const res3 = await sql('SHOW IndexedDB DATABASES');
				const found = res3.some(d => d.databaseid === 'ag154');
				expect(found).toBe(true);
			}

			const res4 = await sql('ATTACH IndexedDB DATABASE ag154');
			expect(res4 === 1).toBe(true);

			const res5 = await sql('CREATE TABLE ag154.one');
			expect(res5 === 1).toBe(true);

			const res6 = await sql('SHOW TABLES FROM ag154');
			expect(res6.length === 1).toBe(true);
			expect(res6[0].tableid === 'one').toBe(true);

			const res7 = await sql('DROP TABLE ag154.one');
			expect(res7 === 1).toBe(true);

			const res8 = await sql('SHOW TABLES FROM ag154');
			expect(res8.length === 0).toBe(true);

			const res9 = await sql('DETACH DATABASE ag154;DROP IndexedDB DATABASE ag154');
			expect(res9[0] === 1).toBe(true);
			expect(res9[1] === 1).toBe(true);
		});
	});
}
