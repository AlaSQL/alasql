// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 235 SELECT INSIDE IF', () => {
	test('1. Prepare database', done => {
		alasql('CREATE DATABASE test235; USE test235;');
		done();
	});

	test('2. Throw error', done => {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 2) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		expect(res == 1).toBe(true);
		var res = alasql('IF EXISTS(SELECT * FROM ? WHERE a = 3) SELECT VALUE 1 ELSE SELECT VALUE 2', [
			data,
		]);
		expect(res == 2).toBe(true);
		//        console.log(res);
		done();
	});

	test('99. DROP', done => {
		alasql('DROP DATABASE test235');
		done();
	});
});
