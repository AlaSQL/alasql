// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test151.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 151 - localStorage Engine', () => {
	test('1. Create database', done => {
		alasql('SET AUTOCOMMIT OFF');
		alasql('DROP localStorage DATABASE IF EXISTS ls151');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls151');
		alasql('ATTACH localStorage DATABASE ls151');
		alasql('CREATE TABLE IF NOT EXISTS ls151.one (a int, b string)');
		alasql('SELECT * INTO ls151.one FROM ?', [
			[
				{a: 1, b: 'Moscow'},
				{a: 2, b: 'Kyiv'},
				{a: 3, b: 'Minsk'},
			],
		]);
		var res = alasql('SELECT * FROM ls151.one');
		expect(res).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);
		done();
	});

	test('2.Insert values into localStorage database', done => {
		alasql('USE ls151');
		alasql('BEGIN TRANSACTION');
		var res = alasql('SELECT * FROM ls151.one');
		expect(res.length == 3).toBe(true);

		alasql('SELECT * INTO ls151.one FROM ?', [
			[
				{a: 4, b: 'London'},
				{a: 5, b: 'Madrid'},
				{a: 6, b: 'Tirana'},
			],
		]);
		var res = alasql('SELECT * FROM ls151.one');
		expect(res.length == 6).toBe(true);

		//		console.log(alasql.databases.ls151.tables.one);
		//		console.log(localStorage['ls151.one']);
		done();
	});

	test('3.Insert values into localStorage database', done => {
		alasql('ROLLBACK TRANSACTION');
		//		console.log(alasql.databases.ls151.tables.one);

		var res = alasql('SELECT * FROM one');
		//		console.log(res);

		//		expect(res.length == 3).toBe(true);

		done();
	});

	test('99. Detach database', done => {
		alasql('DETACH DATABASE ls151');
		alasql('DROP localStorage DATABASE ls151');
		done();
	});
});
