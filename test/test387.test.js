// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

global.localStorage = new DOMStorage('./test381.json', {
	strict: false,
	ws: '',
});

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 387 - IN (SELECT) issue #469', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test387;USE test387');
		done();
	});

	test('2. Prepare tables', done => {
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1),(2),(3)');
		alasql('CREATE TABLE t2 (a INT)');
		alasql('INSERT INTO t2 VALUES (2),(3),(4)');
		done();
	});

	test('3. SELECTs', done => {
		var res = alasql('COLUMN OF SELECT 1 IN ()');
		expect(res).toEqual([false]);
		var res = alasql('COLUMN OF SELECT 1 IN (1,2,3)');
		expect(res).toEqual([true]);
		var res = alasql('COLUMN OF SELECT a IN (SELECT * FROM t1) FROM t2');
		expect(res).toEqual([true, true, false]);
		done();
	});

	test('4. SELECT 1 IN ()', done => {
		var res = alasql('SELECT 1 IN (SELECT * FROM t1)');
		expect(res).toEqual([{'1 IN (SELECT * FROM t1)': true}]);
		done();
	});

	test('5. SELECT 1 IN () issue #407', done => {
		var res = alasql('select 1 in (select 1) as x');
		expect(res).toEqual([{x: true}]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test387');
		done();
	});
});
