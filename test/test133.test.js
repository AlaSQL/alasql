// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 133 SELECT VALUE, ROW, COLUMN, MATRIX', () => {
	test('1. Prepare database', done => {
		alasql('CREATE DATABASE test133; USE test133');
		alasql('CREATE TABLE test133.one (a INT, b STRING)');
		alasql('INSERT INTO test133.one VALUES (1,"One"),(2,"Two"),(3,"Three")');
		done();
	});

	test('2. SELECT', done => {
		var res = alasql('SELECT * FROM test133.one');
		expect(res).toEqual([
			{a: 1, b: 'One'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		var res = alasql('SELECT VALUE * FROM test133.one');
		expect(res).toEqual(1);

		var res = alasql('SELECT ROW * FROM test133.one');
		expect(res).toEqual([1, 'One']);

		var res = alasql('SELECT COLUMN * FROM test133.one');
		expect(res).toEqual([1, 2, 3]);

		var res = alasql('SELECT MATRIX * FROM test133.one');
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
