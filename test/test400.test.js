// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 400 Trigger with INSERTED', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test400;USE test400');
		done();
	});

	test('2. Create table and trigger', done => {
		alasql('CREATE TABLE one (a INT)');
		alasql('CREATE TABLE log (a INT, d DATETIME DEFAULT GETDATE())');
		alasql('CREATE TRIGGER tone INSERT ON one BEGIN INSERT INTO log SELECT * FROM INSERTED; END');
		done();
	});

	test('3. Insert', done => {
		alasql('INSERT INTO one VALUES (100)');
		alasql('INSERT INTO log (a) VALUES (200)');

		var res = alasql('MATRIX OF SELECT a,YEAR(d) FROM log');
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
