// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 400 Trigger with INSERTED', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test400');
		done();
	});

	test('2. Create table and trigger', done => {
		alasql('CREATE TABLE test400.one (a INT)');
		alasql('CREATE TABLE test400.log (a INT, d DATETIME DEFAULT GETDATE())');
		alasql(
			'CREATE TRIGGER tone INSERT ON test400.one BEGIN INSERT INTO test400.log SELECT * FROM INSERTED; END'
		);
		done();
	});

	test('3. Insert', done => {
		alasql('INSERT INTO test400.one VALUES (100)');
		alasql('INSERT INTO test400.log (a) VALUES (200)');

		var res = alasql('MATRIX OF SELECT a,YEAR(d) FROM test400.log');
		expect(res).toEqual([
			[100, new Date().getFullYear()],
			[200, new Date().getFullYear()],
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test400');
		done();
	});
});
