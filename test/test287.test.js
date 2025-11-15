// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 287 SET NOCOUNT OFF/ON', () => {
	test('1. CREATE TABLE and FIRST INSERT', done => {
		alasql('CREATE DATABASE test287;USE test287');
		done();
	});

	test('2. SET', done => {
		expect(!alasql.options.nocount).toBe(true);
		var res = alasql('SET NOCOUNT ON');
		expect(alasql.options.nocount).toBe(true);
		var res = alasql('SET NOCOUNT OFF');
		expect(!alasql.options.nocount).toBe(true);
		done();
	});

	test('3. CREATE TABLE', done => {
		alasql('SET NOCOUNT OFF');
		var res = alasql('CREATE TABLE one');
		expect(res == 1).toBe(true);
		alasql('SET NOCOUNT ON');
		var res = alasql('CREATE TABLE two');
		expect(typeof res == 'undefined').toBe(true);
		done();
	});

	test('4. INSERT', done => {
		alasql('SET NOCOUNT OFF');
		var res = alasql('INSERT INTO one VALUES {a:1},{a:2}');
		expect(res == 2).toBe(true);
		alasql('SET NOCOUNT ON');
		var res = alasql('INSERT INTO two VALUES {b:10},{b:20}');
		expect(typeof res == 'undefined').toBe(true);
		done();
	});
	// TODO: Add other operators

	test('3. DROP DATABASE', done => {
		alasql.options.nocount = false;

		var res = alasql('DROP DATABASE test287');
		done();
	});
});
