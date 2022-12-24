if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

var dbFile = __dirname + '/test_db_fs.json';

(alasql.utils.isNode ? describe : describe.skip)(
	'Test 808 - Filestorage: Basic Operations and Drop Database',
	() => {
		const sql = alasql.promise;

		before(async () => {
			alasql('SET AUTOCOMMIT ON');
		});

		// after(async () => {});

		it('A. Create a Filestorage DB', async () => {
			await sql('CREATE FILESTORAGE DATABASE testDBFS("' + dbFile + '")');
			await sql('ATTACH FILESTORAGE DATABASE testDBFS("' + dbFile + '")');
			await sql('USE testDBFS');
		});

		it('B. Basic Operations on a Filestorage DB table ', async () => {
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

		it('C. Detach and Drop a Filestorage DB', async () => {
			await sql('DETACH DATABASE testDBFS');
			await sql('DROP FILESTORAGE DATABASE testDBFS');
		});
	}
);
