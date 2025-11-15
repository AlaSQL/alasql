// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 133 SELECT VALUE, ROW, COLUMN, MATRIX', () => {
	test('1. Prepare database', done => {
		alasql('CREATE DATABASE test133; USE test133');
		alasql('CREATE TABLE one (a INT, b STRING)');
		alasql('INSERT INTO one VALUES (1,"One"),(2,"Two"),(3,"Three")');
		done();
	});

	test('2. SELECT', done => {
		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([
			{a: 1, b: 'One'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		var res = alasql('SELECT VALUE * FROM one');
		expect(res).toEqual(1);

		var res = alasql('SELECT ROW * FROM one');
		expect(res).toEqual([1, 'One']);

		var res = alasql('SELECT COLUMN * FROM one');
		expect(res).toEqual([1, 2, 3]);

		var res = alasql('SELECT MATRIX * FROM one');
		expect(res).toEqual([
			[1, 'One'],
			[2, 'Two'],
			[3, 'Three'],
		]);

		done();
	});

	test('99. UPDATE', done => {
		alasql('DROP DATABASE test133');
		done();
	});
});
