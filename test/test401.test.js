// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 401 NOT INDEXED', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test401;USE test401');
		done();
	});

	test('2. Create table and trigger', done => {
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (100), (200), (300)');
		done();
	});

	test('3. Insert', done => {
		var res = alasql('COLUMN OF SELECT * FROM one NOT INDEXED');
		expect(res).toEqual([100, 200, 300]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test401');
		done();
	});
});
