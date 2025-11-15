// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 288 ROWNUM()', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test288;USE test288');
		done();
	});

	test('2. SET', done => {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT a, ROWNUM() AS b FROM ?', [data]);
		expect(res).toEqual([
			{a: 1, b: 1},
			{a: 2, b: 2},
			{a: 3, b: 3},
		]);
		done();
	});

	test('3. Subquery', done => {
		alasql('CREATE TABLE one (a INT PRIMARY KEY)');
		for (var i = 1; i < 1000; i++) {
			alasql('INSERT INTO one VALUES (?)', [i]);
		}
		var res = alasql(
			'SELECT * FROM (SELECT a, ROWNUM() AS r FROM one)\
      WHERE r BETWEEN 55 AND 60'
		);
		expect(res).toEqual([
			{a: 55, r: 55},
			{a: 56, r: 56},
			{a: 57, r: 57},
			{a: 58, r: 58},
			{a: 59, r: 59},
			{a: 60, r: 60},
		]);
		done();
	});

	// TODO: Add other operators

	test('3. DROP DATABASE', done => {
		alasql('DROP DATABASE test288');
		done();
	});
});
