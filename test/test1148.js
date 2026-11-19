if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1148 - UNIQUE / PRIMARY KEY in FILESTORAGE and LOCALSTORAGE', function () {
	const test = '1148';

	describe('A) FILESTORAGE database', function () {
		const file = require('path').join(__dirname, 'test' + test + '-fs.json');

		before(function () {
			alasql.options.autocommit = true;
		});

		after(function () {
			alasql('USE alasql');
			try {
				alasql('DETACH DATABASE fs' + test);
			} catch (e) {
				/* ignore */
			}
			try {
				require('fs').unlinkSync(file);
			} catch (e) {
				/* ignore */
			}
		});

		it('1. UNIQUE column rejects a duplicate value', function (done) {
			const sql = s => new Promise(resolve => alasql(s, resolve));
			(async function () {
				await sql('CREATE FILESTORAGE DATABASE fs' + test + '("' + file + '")');
				await sql('ATTACH FILESTORAGE DATABASE fs' + test + '("' + file + '")');
				await sql('USE fs' + test);
				await sql('CREATE TABLE usersTable (id INT UNIQUE, name NVARCHAR(255))');
				await sql('INSERT INTO usersTable VALUES (1,"Andrey")');
				await sql('INSERT INTO usersTable VALUES (2,"Kate")');

				assert.throws(function () {
					alasql('INSERT INTO usersTable VALUES (2,"Kate2")');
				}, /already exists in unique index/);

				const rows = await sql('SELECT * FROM usersTable ORDER BY id');
				assert.deepStrictEqual(rows, [
					{id: 1, name: 'Andrey'},
					{id: 2, name: 'Kate'},
				]);
			})().then(done, done);
		});

		it('2. PRIMARY KEY column rejects a duplicate key', function (done) {
			const sql = s => new Promise(resolve => alasql(s, resolve));
			(async function () {
				await sql('DROP TABLE IF EXISTS pkTable');
				await sql('CREATE TABLE pkTable (id INT PRIMARY KEY, name STRING)');
				await sql('INSERT INTO pkTable VALUES (1,"a")');

				assert.throws(function () {
					alasql('INSERT INTO pkTable VALUES (1,"b")');
				}, /already exists in primary key index/);
			})().then(done, done);
		});
	});

	describe('B) LOCALSTORAGE database', function () {
		if (typeof exports === 'object') {
			var DOMStorage = require('dom-storage');
			global.localStorage = new DOMStorage(null, {strict: false});
		}

		before(function () {
			alasql.options.autocommit = true;
			alasql('DROP LOCALSTORAGE DATABASE IF EXISTS ls' + test);
			alasql('CREATE LOCALSTORAGE DATABASE ls' + test);
			alasql('ATTACH LOCALSTORAGE DATABASE ls' + test);
			alasql('USE ls' + test);
		});

		after(function () {
			alasql('USE alasql');
			alasql('DROP LOCALSTORAGE DATABASE IF EXISTS ls' + test);
		});

		it('1. UNIQUE column rejects a duplicate value, insert keeps working after', function () {
			alasql('CREATE TABLE usersTable (id INT UNIQUE, name STRING)');
			alasql('INSERT INTO usersTable VALUES (1,"Andrey")');
			alasql('INSERT INTO usersTable VALUES (2,"Kate")');

			assert.throws(function () {
				alasql('INSERT INTO usersTable VALUES (2,"Kate2")');
			}, /already exists in unique index/);

			// A table with no unique/pk constraint must still insert fine after the above (#1148 fix
			// must not disturb the plain engine insert path)
			alasql('CREATE TABLE plain (a STRING)');
			alasql('INSERT INTO plain VALUES (\'x\'),(\'y\')');
			const rows = alasql('SELECT * FROM plain ORDER BY a');
			assert.deepStrictEqual(rows, [{a: 'x'}, {a: 'y'}]);
		});
	});
});
