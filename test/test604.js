// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/test604.json', {
		strict: false,
		ws: '',
	});
}

describe.skip('Test 604 - CREATE VIEW error with localStorage engine #604', function () {
	afterAll(function () {
		localStorage.clear();
	});

	test('* Create database', function (done) {
		alasql('SET AUTOCOMMIT OFF');
		assert(!alasql.options.autocommit);
		alasql
			.promise('DROP localStorage DATABASE IF EXISTS db604ls')
			.then(function (res) {
				assert(!localStorage['db604ls']);
				assert(!localStorage['db604ls.one']);
				return alasql.promise('CREATE localStorage DATABASE IF NOT EXISTS db604ls');
			})
			.then(function (res) {
				assert(localStorage['db604ls']);
				done();
			})
			.catch(function (err) {
				setTimeout(function () {
					throw err;
				});
			});
	});

	test('* Show databases', function (done) {
		var res = alasql('SHOW localStorage DATABASES', function (res) {
			var found = false;
			res.forEach(function (d) {
				found = found || d.databaseid == 'db604ls';
			});
			assert(found);
			done();
		});
	});

	test('* Attach localStorage database', function (done) {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604', function () {
			assert(alasql.databases.db604);
			assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
			done();
		});
	});

	test('* Create table', function (done) {
		alasql('CREATE TABLE db604.t1 (a int, b string)', function (res) {
			assert(localStorage['db604ls.t1']);
			assert(JSON.parse(localStorage['db604ls']).tables.t1);
			done();
		});
	});

	test('* Insert values into table', function (done) {
		alasql
			.promise('insert into db604.t1 VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")')
			.then(function (rows) {
				assert.deepEqual(alasql.databases.db604.tables.t1.data, [
					{a: 1, b: 'Moscow'},
					{a: 2, b: 'Kyiv'},
					{a: 3, b: 'Minsk'},
				]);
				done();
			});
	});

	test('* Select from table', function () {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
	});

	test('* Create view', function (done) {
		alasql('CREATE VIEW db604.v1 AS SELECT a,b FROM db604.t1', function (res) {
			assert(localStorage['db604ls.v1']);
			assert(JSON.parse(localStorage['db604ls']).tables.v1);
			done();
		});
	});

	test('* Select from view', function () {
		var res = alasql('SELECT * FROM db604.v1');
		assert(res.length == 3);
	});

	test.skip('* Detach database', function () {
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
	});

	test.skip('* Reattach database', function () {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
		assert(alasql.databases.db604);
		assert(alasql.databases.db604.engineid == 'LOCALSTORAGE');
	});

	test.skip('* Reselect from table', function () {
		var res = alasql('SELECT * FROM db604.t1');
		assert(res.length == 3);
	});

	test.skip('* Reselect from view', function (done) {
		alasql.promise('SELECT * FROM db604.v1').then(function (res) {
			assert(res.length == 3);
			done();
		});
	});

	test('* Drop table', function () {
		var res = alasql('DROP TABLE db604.t1');
		assert(!localStorage['db604.t1']);
	});

	test('* Drop view', function () {
		var res = alasql('DROP VIEW db604.v1');
		assert(!localStorage['db604.v1']);
	});

	test('* Detachch database', function () {
		alasql('DETACH DATABASE db604');
		assert(!alasql.databases.db604);
	});

	test('* Drop database', function () {
		alasql('DROP LOCALSTORAGE DATABASE db604ls');
		assert(!localStorage['db605ls']);
	});
});
