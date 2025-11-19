// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 200 IS NULL + IS NOT NULL', () => {
	test('1. Simple Variant', done => {
		alasql('CREATE DATABASE test200; USE test200');
		var res = alasql('IF 1 IS NOT NULL CREATE TABLE test200.one');
		expect(!!alasql.databases.test200.tables.one).toBe(true);

		var res = alasql('ROW OF SELECT NULL IS NULL, 1 IS NULL, NULL NOT NULL, 1 NOT NULL');
		expect(res).toEqual([true, false, false, true]);
		var res = alasql('ROW OF SELECT NULL IS NOT NULL, 1 IS NOT NULL');
		expect(res).toEqual([false, true]);

		alasql('DROP DATABASE test200');
		done();
	});
});
