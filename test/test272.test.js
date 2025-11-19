// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 272 REMOVE columns', () => {
	const pluck = (arr, key) => arr.map(e => e[key]);

	beforeAll(() => {
		alasql('CREATE DATABASE test272; USE test272');
	});

	afterAll(() => {
		alasql('DROP DATABASE test272');
	});

	test('1. Remove columns', done => {
		var data = [
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
		];
		var res = alasql('SELECT RECORDSET * REMOVE COLUMN c FROM ?', [data]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test('2. Remove columns', done => {
		var data = [
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
		];
		var res = alasql('SELECT RECORDSET * REMOVE COLUMNS c FROM ?', [data]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test('3. Remove columns LIKE', done => {
		var data = [
			{a: 1, b1: 10, b2: 100},
			{a: 2, b1: 20, b2: 200},
		];
		var res = alasql('SELECT RECORDSET * REMOVE COLUMNS LIKE "b%" FROM ?', [data]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a']);
		done();
	});

	test('4. Remove multiple columns', done => {
		var data = [
			{a: 1, b1: 10, b2: 100, c: 1000, d: 10000},
			{a: 2, b1: 20, b2: 200, c: 2000, d: 20000},
		];
		var res = alasql('SELECT RECORDSET * REMOVE COLUMNS LIKE "b%",a,d FROM ?', [data]);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['c']);
		done();
	});

	test('5. Remove columns from table', done => {
		alasql('CREATE TABLE test272.one (a INT, b STRING, c INT)');
		alasql('INSERT INTO test272.one VALUES (1,"One",10),(2,"Two",20),(3,"Three",30)');
		var res = alasql('SELECT RECORDSET * REMOVE COLUMN b FROM test272.one');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'c']);
		done();
	});
});
