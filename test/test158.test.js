// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 158 - INSERT/DELETE/UPDATE in IndexedDB', function () {
		test('1. Create table and INSERT', async () => {
			const sql = alasql.promise;

			const res = await sql(`
				create indexeddb database if not exists test158;
				attach indexeddb database test158;
				use test158;
				drop table if exists cities;
				create table cities (city string);
			`);

			res[0] = 1;
			res[3] = 1;

			assert.deepEqual(res, [1, 1, 1, 1, 1]);

			const res2 = await sql(
				"insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')"
			);
			assert(res2 === 5);

			const res3 = await sql("select column * from cities where city like 'M%' order by city");
			assert.deepEqual(res3, ['Minsk', 'Moscow']);

			const res4 = await sql('delete from cities where city in ("Riga","Tallinn","Moscow")');
			assert(res4 === 3);

			const res5 = await sql('select column * from cities order by city');
			assert.deepEqual(res5, ['Minsk', 'Paris']);

			const res6 = await sql("update cities set city = 'Vilnius' where city = 'Minsk'");
			assert(res6 === 1);

			const res7 = await sql('select column * from cities order by city');
			assert.deepEqual(res7, ['Paris', 'Vilnius']);

			const res8 = await sql('detach database test158');
			assert(res8 === 1);

			const res9 = await sql('drop indexeddb database test158');
			assert(res9 === 1);
		});
	});
}
