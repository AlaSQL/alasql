// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window === 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test150.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 150 - localStorage Engine', () => {
	beforeAll(() => {
		// Clear any existing localStorage data
		if (typeof localStorage !== 'undefined') {
			localStorage.clear();
		}
	});

	test('1. Create database', done => {
		alasql('SET AUTOCOMMIT OFF');
		//		console.log(!alasql.options.autocommit);
		expect(!alasql.options.autocommit).toBe(true);

		//delete localStorage['ls150.one'];

		alasql('DROP localStorage DATABASE IF EXISTS ls150');
		expect(!localStorage['ls150']).toBe(true);
		expect(!localStorage['ls150.one']).toBe(true);
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls150');
		expect(localStorage['ls150']).toBeDefined();
		done();
	});

	test('2. Show databases', done => {
		var res = alasql('SHOW localStorage DATABASES');
		var found = false;
		res.forEach(function (d) {
			found = found || d.databaseid == 'ls150';
		});
		expect(found).toBe(true);
		done();
	});

	test('3. Attach localStorage database', done => {
		alasql('ATTACH LOCALSTORAGE DATABASE ls150 AS test150');
		expect(alasql.databases.test150).toBeDefined();
		expect(alasql.databases.test150.engineid == 'LOCALSTORAGE').toBe(true);
		done();
	});

	test('4. Create localStorage databases', done => {
		alasql('CREATE TABLE IF NOT EXISTS test150.one (a int, b string)');
		//		expect(!alasql.databases.test149.tables.one).toBe(true);
		//console.log(JSON.parse(localStorage['ls150']));
		expect(typeof localStorage['ls150.one']).toBe('string');
		expect(JSON.parse(localStorage['ls150']).tables.one).toBe(true);
		//		expect(JSON.parse(localStorage['ls149'].tables.one);
		// var tb = JSON.parse(localStorage['ls149']).tables.one;
		// expect(tb.columns).toBe(true);
		// expect(tb.columns[0].columnid == 'a').toBe(true);
		// expect(tb.columns[1].columnid == 'b').toBe(true);
		done();
	});

	test('5.Insert values into localStorage database', done => {
		alasql('create database test150a');
		alasql('CREATE TABLE test150a.one (a int, b string)');

		alasql('insert into test150a.one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
		var res = alasql('select * into test150.one from test150a.one');
		//		console.log(alasql.databases.test150.tables);
		expect(alasql.databases.test150.tables.one.data).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);

		var res = alasql('select * from test150.one');
		//		console.log(res);
		expect(res).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);
		done();
	});

	test('6.Select from localStorage table', done => {
		var res = alasql('SELECT * FROM test150.one');
		//		console.log(res);
		expect(res.length == 3).toBe(true);
		done();
	});

	test('7.Select into localStorage table', done => {
		var res = alasql('SELECT a*2 as a, b INTO test150.one FROM test150.one');
		expect(res == 3).toBe(true);
		var res = alasql('SELECT * FROM test150.one');
		expect(res.length == 6).toBe(true);
		done();
	});

	test('8.Select into localStorage table', done => {
		alasql('USE test150');
		var res = alasql('COMMIT TRANSACTION');
		//		console.log(res);
		expect(res).toEqual(1);

		var res = alasql('SELECT * FROM test150.one');
		expect(res.length == 6).toBe(true);
		done();
	});

	test('8.Drop localStorage table', done => {
		var res = alasql('DROP TABLE test150.one');
		//		alasql('COMMIT TRANSACTION');
		expect(!localStorage['ls150.one']).toBe(true);
		done();
	});

	test('99. Detach database', done => {
		alasql('DROP DATABASE test150a');
		expect(!alasql.databases.test150a).toBe(true);
		alasql('DETACH DATABASE test150');
		expect(!alasql.databases.test150).toBe(true);
		alasql('DROP LOCALSTORAGE DATABASE ls150');
		expect(!localStorage['ls150']).toBe(true);
		done();
	});
});
