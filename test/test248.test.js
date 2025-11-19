// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 248 IN ()', () => {
	test('1. IN ()', done => {
		var res = alasql('SELECT VALUE 1 IN ()');
		expect(res == false).toBe(true);

		done();
	});

	test('2. NOT IN ()', done => {
		var res = alasql('SELECT VALUE 1 NOT IN ()');
		expect(res == true).toBe(true);

		done();
	});
});
