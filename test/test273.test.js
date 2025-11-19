// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 273 Source columns detextion', () => {
	const pluck = (arr, key) => arr.map(e => e[key]);

	beforeAll(() => {
		alasql('CREATE DATABASE test273; USE test273');
	});

	afterAll(() => {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test273');
	});

	test('1. Create database', done => {
		alasql('CREATE TABLE test273.one(a INT, b INT)');
		alasql('CREATE TABLE test273.two(b INT, c INT)');
		done();
	});

	test('2. Empty test on table with columns', done => {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT * FROM test273.one');
		var colres = res.columns.map(col => col.columnid);
		expect(colres).toEqual(['a', 'b']);
		alasql.options.modifier = undefined;
		done();
	});

	test('3. Star and other column', done => {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT *,a FROM test273.one');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'a']);

		var res = alasql('SELECT a,*,a FROM test273.one');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'a', 'b', 'a']);
		alasql.options.modifier = undefined;
		done();
	});

	test('4. Subquery', done => {
		var res = alasql('SELECT RECORDSET * FROM (SELECT * FROM test273.one)');
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b']);
		done();
	});

	test('5. JOIN subquery', done => {
		var res = alasql(
			'SELECT RECORDSET t.*,s.* FROM (SELECT * FROM test273.one) t \
      JOIN test273.one s USING a'
		);
		var colres = pluck(res.columns, 'columnid');
		expect(colres).toEqual(['a', 'b', 'a', 'b']);
		done();
	});
});
