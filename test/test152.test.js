// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test152.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 152 - INSERT/DELETE/UPDATE for localStorage with AUTOCOMMIT', () => {
	test('1. Create database', done => {
		alasql('SET AUTOCOMMIT ON');
		alasql('DROP localStorage DATABASE IF EXISTS ls152');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls152');
		alasql('ATTACH localStorage DATABASE ls152');
		alasql('CREATE TABLE IF NOT EXISTS ls152.one (a int, b string)');
		alasql('INSERT INTO ls152.one VALUES (1,"Rome"),(2,"London"),(3,"Berlin"),(4,"Paris")');
		//		console.log(alasql.databases.ls152.tables.one.data);
		//		expect(!alasql.databases.ls152.tables.one.data).toBe(true);

		var res = alasql('SELECT * FROM ls152.one');
		expect(res).toEqual([
			{a: 1, b: 'Rome'},
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	test('2. Create second table (INSERT SELECT)', done => {
		alasql('CREATE TABLE IF NOT EXISTS ls152.two (a int, b string)');
		//		var res = alasql('SELECT * FROM ls152.one');
		//		console.log(res);
		//		console.table(alasql('SELECT * FROM ls152.one WHERE a IN (2,3)'));
		//debugger;
		alasql('INSERT INTO ls152.two SELECT * FROM ls152.one WHERE a IN (2,3)');
		var res = alasql('SELECT * FROM ls152.two');
		expect(res).toEqual([
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
		]);
		done();
	});

	test('3. DELETE FROM', done => {
		alasql('DELETE FROM ls152.two WHERE a=3');
		var res = alasql('SELECT * FROM ls152.two');
		expect(res).toEqual([{a: 2, b: 'London'}]);
		done();
	});

	test('4. UPDATE', done => {
		alasql('UPDATE ls152.one SET b="Prague" WHERE a IN (2,3)');
		var res = alasql('SELECT * FROM ls152.one');
		expect(res).toEqual([
			{a: 1, b: 'Rome'},
			{a: 2, b: 'Prague'},
			{a: 3, b: 'Prague'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	test('5. INSERT with AUTOINCREMENT', done => {
		alasql('CREATE TABLE IF NOT EXISTS ls152.three (a int AUTO_INCREMENT, b string)');
		alasql('INSERT INTO ls152.three (b) VALUES ("Rome"),("London"),("Berlin"),("Paris")');

		var res = alasql('SELECT * FROM ls152.three');
		expect(res).toEqual([
			{a: 1, b: 'Rome'},
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	test('99. Detach database', done => {
		alasql('DETACH DATABASE ls152');
		alasql('DROP localStorage DATABASE ls152');
		done();
	});
});
