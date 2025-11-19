// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 395 SQLLOGICTEST SELECT 1', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test395;USE test395');
		done();
	});

	test('2. Test inline', done => {
		var res = alasql('COLUMN OF SELECT 1 FROM @[1,2,3] WHERE 1 IN (SELECT 1)');
		expect(res).toEqual([1, 1, 1]);
		var res = alasql('COLUMN OF SELECT 1 FROM @[] WHERE 1 IN (SELECT 1)');
		expect(res).toEqual([]);
		done();
	});

	test('3. Test from table', done => {
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1),(2),(3)');
		var res = alasql('COLUMN OF SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)');
		expect(res).toEqual([1, 1, 1]);
		done();
	});

	test('4. Test like in command-line', done => {
		alasql.promise('COLUMN OF SELECT 1 FROM @[1,2] WHERE 1 IN (SELECT 1)').then(function (res) {
			expect(res).toEqual([1, 1]);
			done();
		});
	});

	test('5. More tests', done => {
		var res = alasql('COLUMN OF SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)');
		expect(res).toEqual([1, 1, 1]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test395');
		done();
	});
});
