if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// IndexedDB tests only run in a browser environment
if (typeof exports != 'object') {
	describe('Test 861 - AUTOINCREMENT for IndexedDB', function () {
		it('1. AUTOINCREMENT column should be populated on INSERT', async () => {
			const sql = alasql.promise;

			await sql(`
				CREATE INDEXEDDB DATABASE IF NOT EXISTS test861;
				ATTACH INDEXEDDB DATABASE test861;
				USE test861;
				DROP TABLE IF EXISTS autoinctab;
				CREATE TABLE IF NOT EXISTS autoinctab (aid INT AUTOINCREMENT, aname STRING);
			`);

			await sql('INSERT INTO autoinctab (aname) VALUES ("bar1"),("bar2")');

			const res = await sql('SELECT * FROM autoinctab');

			assert.strictEqual(res.length, 2);
			assert.strictEqual(res[0].aid, 1);
			assert.strictEqual(res[0].aname, 'bar1');
			assert.strictEqual(res[1].aid, 2);
			assert.strictEqual(res[1].aname, 'bar2');

			await sql('DROP INDEXEDDB DATABASE test861');
		});

		it('2. AUTOINCREMENT continues incrementing across multiple INSERTs', async () => {
			const sql = alasql.promise;

			await sql(`
				CREATE INDEXEDDB DATABASE IF NOT EXISTS test861b;
				ATTACH INDEXEDDB DATABASE test861b;
				USE test861b;
				DROP TABLE IF EXISTS autoinctab2;
				CREATE TABLE IF NOT EXISTS autoinctab2 (aid INT AUTOINCREMENT, aname STRING);
			`);

			await sql('INSERT INTO autoinctab2 (aname) VALUES ("row1")');
			await sql('INSERT INTO autoinctab2 (aname) VALUES ("row2")');

			const res = await sql('SELECT * FROM autoinctab2');

			assert.strictEqual(res.length, 2);
			assert.strictEqual(res[0].aid, 1);
			assert.strictEqual(res[1].aid, 2);

			await sql('DROP INDEXEDDB DATABASE test861b');
		});
	});
}
