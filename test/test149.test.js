// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window === 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test/test149.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 149 - localStorage Engine with AUTOCOMMIT ON', () => {
	beforeAll(() => {
		// Clear any existing localStorage data
		if (typeof localStorage !== 'undefined') {
			localStorage.clear();
		}
	});

	test('1. Create database', done => {
		//		console.log(alasql.options.autocommit);
		//		alasql('SET AUTOCOMMIT OFF');
		//		console.log(alasql.options.autocommit);
		alasql('SET AUTOCOMMIT ON');
		//		console.log(alasql.options.autocommit);
		expect(alasql.options.autocommit).toBe(true);

		alasql('DROP LOCALSTORAGE DATABASE IF EXISTS ls149');
		expect(!localStorage['ls149']).toBe(true);
		expect(!localStorage['ls149.one']).toBe(true);
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ls149');
		expect(localStorage['ls149']).toBe('{"databaseid":"ls149","tables":{}}');
		done();
	});

	test('2. Show databases', done => {
		var res = alasql('SHOW LOCALSTORAGE DATABASES');
		var found = false;
		res.forEach(function (d) {
			found = found || d.databaseid == 'ls149';
		});
		expect(found).toBe(true);
		done();
	});

	test('3. Attach localStorage database', done => {
		alasql('ATTACH LOCALSTORAGE DATABASE ls149 AS test149');
		expect(alasql.databases.test149).toBeDefined();
		expect(alasql.databases.test149.engineid == 'LOCALSTORAGE').toBe(true);
		done();
	});

	test('4. Create localStorage databases', done => {
		//		debugger;
		alasql('CREATE TABLE IF NOT EXISTS test149.one (a int, b string)');
		//		expect(!alasql.databases.test149.tables.one).toBe(true);
		expect(JSON.parse(localStorage.getItem('ls149')).tables).toBeTruthy();
		expect(JSON.parse(localStorage.getItem('ls149')).tables.one).toBeTruthy();
		var table = JSON.parse(localStorage.getItem('ls149.one'));
		expect(table).toBeTruthy();
		var tb = JSON.parse(localStorage.getItem('ls149')).tables.one;
		expect(tb).toBeTruthy();

		expect(table.columns[0].columnid == 'a').toBe(true);
		expect(table.columns[1].columnid == 'b').toBe(true);
		done();
	});

	test('5.Insert values into localStorage database', done => {
		alasql('create database test149a');
		alasql('CREATE TABLE test149a.one (a int, b string)');
		//console.log(56);
		alasql('insert into test149a.one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk")');
		//console.log(57);
		alasql('select * into test149.one from test149a.one');
		var table = JSON.parse(localStorage.getItem('ls149.one'));
		expect(table.data).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);

		var res = alasql('select * from test149.one');
		expect(res).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);
		//		expect(alasql.engines.localStorage.get('ls149.one'.length == 3);
		done();
	});

	// test("6.Select from localStorage table", function(done) {
	// 	var res = alasql('SELECT * FROM test149.one');
	// 	expect(res.length == 3).toBe(true);
	// 	done();
	// });
	//if(false) {

	test('7.Select into localStorage table', done => {
		var res = alasql('select * from test149.one');
		expect(res.length == 3).toBe(true);
		var res = alasql('SELECT a*2 as a, b FROM test149.one');
		expect(res.length == 3).toBe(true);
		var res = alasql('SELECT a*2 as a, b INTO test149.one FROM test149.one');
		expect(res == 3).toBe(true);
		done();
	});
	//}
	test('8.Drop localStorage table', done => {
		alasql('DROP TABLE test149.one');
		expect(!localStorage['ls149.one']).toBe(true);
		done();
	});

	test('99. Detach database', done => {
		alasql('DROP DATABASE test149a');
		expect(!alasql.databases.test149a).toBe(true);
		alasql('DETACH DATABASE test149');
		expect(!alasql.databases.test149).toBe(true);
		alasql('DROP LOCALSTORAGE DATABASE ls149');
		expect(!localStorage['ls149']).toBe(true);
		done();
	});
});
