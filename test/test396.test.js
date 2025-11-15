// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 396 SQLLOGICTEST ', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test396;USE test396');
		done();
	});

	test('2. Prepare', done => {
		alasql('CREATE TABLE t1( x INTEGER NOT NULL PRIMARY KEY, y VARCHAR(16) )');
		alasql("INSERT INTO t1 VALUES(1, 'true')");
		alasql("INSERT INTO t1 VALUES(0, 'false')");

		alasql.options.modifier = 'ROW';
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		expect(res).toEqual(undefined);

		alasql("INSERT INTO t1 VALUES(2, 'insert')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		expect(res).toEqual([2, 'insert']);

		alasql("INSERT OR REPLACE INTO t1 VALUES(2, 'insert or replace')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		expect(res).toEqual([2, 'insert or replace']);

		alasql("REPLACE INTO t1 VALUES(2, 'replace')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=2');
		expect(res).toEqual([2, 'replace']);

		alasql("INSERT OR REPLACE INTO t1 VALUES(3, 'insert or replace (new)')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=3');
		expect(res).toEqual([3, 'insert or replace (new)']);

		done();
	});

	test('3. Error statement', done => {
		alasql("REPLACE INTO t1 VALUES(4, 'replace (new)')");
		var res = alasql('SELECT x, y FROM t1 WHERE x=4');
		expect(res).toEqual([4, 'replace (new)']);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test396');
		done();
	});
});
