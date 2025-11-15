// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #502
*/

describe('Test 410 Raise error on undefined tables', () => {
	test('2. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test410;USE test410');
		done();
	});

	test('2. CREATE DATABASE', done => {
		expect(() => {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)');
		}).toThrow(Error);

		expect(() => {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT x,y FROM t1)');
		}).toThrow(Error);

		expect(() => {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT * FROM t1)');
		}).toThrow(Error);

		expect(() => {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT min(x),max(x) FROM t1)');
		}).toThrow(Error);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test410');
		done();
	});
});
