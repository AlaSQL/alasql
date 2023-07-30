if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'object') {
	describe('Test 154 - IndexedDB test', function () {
		it('1. Create Database and Table', async () => {
			const sql = alasql.promise;

			const res1 = await sql('DROP IndexedDB DATABASE IF EXISTS ag154');
			assert(res1 === 1 || res1 === 0);

			const res2 = await sql('CREATE IndexedDB DATABASE ag154');
			assert(res2 === 1);

			if (globalThis.indexedDB.databases) {
				const res3 = await sql('SHOW IndexedDB DATABASES');
				const found = res3.some(d => d.databaseid === 'ag154');
				assert(found);
			}

			const res4 = await sql('ATTACH IndexedDB DATABASE ag154');
			assert(res4 === 1);

			const res5 = await sql('CREATE TABLE ag154.one');
			assert(res5 === 1);

			const res6 = await sql('SHOW TABLES FROM ag154');
			assert(res6.length === 1);
			assert(res6[0].tableid === 'one');

			const res7 = await sql('DROP TABLE ag154.one');
			assert(res7 === 1);

			const res8 = await sql('SHOW TABLES FROM ag154');
			assert(res8.length === 0);

			const res9 = await sql('DETACH DATABASE ag154;DROP IndexedDB DATABASE ag154');
			assert(res9[0] === 1);
			assert(res9[1] === 1);
		});
	});
}
