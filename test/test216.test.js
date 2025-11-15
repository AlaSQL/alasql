// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 216 ? IN ?', () => {
	test('1. Expression IN (,,)', done => {
		var res = alasql(
			'SET @a = 10; \
            SELECT VALUE @a IN (10,20,30)'
		);
		expect(res.pop()).toBe(true);
		var res = alasql(
			'SET @a = 40;\
            SELECT VALUE @a IN (10,20,30)'
		);
		expect(res.pop()).toBe(false);
		done();
	});

	test('2. ? IN ?', done => {
		var res = alasql('SELECT VALUE ? IN @(?)', [10, [10, 20, 30]]);
		expect(res === true).toBe(true);
		var res = alasql('SELECT VALUE ? IN @(?)', [40, [10, 20, 30]]);
		expect(res === false).toBe(true);
		done();
	});

	test('3. @a IN @b', done => {
		var res = alasql(
			'SET @a = 10; SET @b = @[10,20,30]; \
            SELECT VALUE @a IN @(@b)'
		);
		expect(res.pop()).toBe(true);
		var res = alasql(
			'SET @a = 40;\
            SELECT VALUE @a IN @(@b)'
		);
		expect(res.pop()).toBe(false);
		done();
	});

	test('4. @a IN @[]', done => {
		var res = alasql(
			'SET @a = 10; \
            SELECT VALUE @a IN @(@[10,20,30])'
		);
		expect(res.pop()).toBe(true);
		var res = alasql(
			'SET @a = 40;\
            SELECT VALUE @a IN @(@[10,20,30])'
		);
		expect(res.pop()).toBe(false);
		done();
	});
});
