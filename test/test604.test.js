// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window === 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/test604.json', {
		strict: false,
		ws: '',
	});
}

describe.skip('Test 604 - CREATE VIEW error with localStorage engine #604', () => {
	afterAll(() => {
		localStorage.clear();
	});

	test('* Create database', done => {
		alasql('SET AUTOCOMMIT OFF');
		expect(!alasql.options.autocommit).toBe(true);
		alasql
			.promise('DROP localStorage DATABASE IF EXISTS db604ls')
			.then(function (res) {
				expect(!localStorage['db604ls']).toBe(true);
				expect(!localStorage['db604ls.one']).toBe(true);
				return alasql.promise('CREATE localStorage DATABASE IF NOT EXISTS db604ls');
			})
			.then(function (res) {
				expect(localStorage['db604ls']).toBe(true);
				done();
			})
			.catch(function (err) {
				setTimeout(() => {
					throw err;
				});
			});
	});

	test('* Show databases', done => {
		var res = alasql('SHOW localStorage DATABASES', function (res) {
			var found = false;
			res.forEach(function (d) {
				found = found || d.databaseid == 'db604ls';
			});
			expect(found).toBe(true);
			done();
		});
	});

	test('* Attach localStorage database', done => {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604', () => {
			expect(alasql.databases.db604).toBe(true);
			expect(alasql.databases.db604.engineid == 'LOCALSTORAGE').toBe(true);
			done();
		});
	});

	test('* Create table', done => {
		alasql('CREATE TABLE db604.t1 (a int, b string)', function (res) {
			expect(localStorage['db604ls.t1']).toBe(true);
			expect(JSON.parse(localStorage['db604ls'].tables.t1));
			done();
		});
	});

	test('* Insert values into table', done => {
		alasql
			.promise('insert into db604.t1 VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")')
			.then(function (rows) {
				expect(alasql.databases.db604.tables.t1.data).toEqual([
					{a: 1, b: 'Moscow'},
					{a: 2, b: 'Kyiv'},
					{a: 3, b: 'Minsk'},
				]);
				done();
			});
	});

	test('* Select from table', () => {
		var res = alasql('SELECT * FROM db604.t1');
		expect(res.length == 3).toBe(true);
	});

	test('* Create view', done => {
		alasql('CREATE VIEW db604.v1 AS SELECT a,b FROM db604.t1', function (res) {
			expect(localStorage['db604ls.v1']).toBe(true);
			expect(JSON.parse(localStorage['db604ls'].tables.v1));
			done();
		});
	});

	test('* Select from view', () => {
		var res = alasql('SELECT * FROM db604.v1');
		expect(res.length == 3).toBe(true);
	});

	test.skip('* Detach database', () => {
		alasql('DETACH DATABASE db604');
		expect(!alasql.databases.db604).toBe(true);
	});

	test.skip('* Reattach database', () => {
		alasql('ATTACH LOCALSTORAGE DATABASE db604ls AS db604');
		expect(alasql.databases.db604).toBe(true);
		expect(alasql.databases.db604.engineid == 'LOCALSTORAGE').toBe(true);
	});

	test.skip('* Reselect from table', () => {
		var res = alasql('SELECT * FROM db604.t1');
		expect(res.length == 3).toBe(true);
	});

	test.skip('* Reselect from view', done => {
		alasql.promise('SELECT * FROM db604.v1').then(function (res) {
			expect(res.length == 3).toBe(true);
			done();
		});
	});

	test('* Drop table', () => {
		var res = alasql('DROP TABLE db604.t1');
		expect(!localStorage['db604.t1']).toBe(true);
	});

	test('* Drop view', () => {
		var res = alasql('DROP VIEW db604.v1');
		expect(!localStorage['db604.v1']).toBe(true);
	});

	test('* Detachch database', () => {
		alasql('DETACH DATABASE db604');
		expect(!alasql.databases.db604).toBe(true);
	});

	test('* Drop database', () => {
		alasql('DROP LOCALSTORAGE DATABASE db604ls');
		expect(!localStorage['db605ls']).toBe(true);
	});
});
