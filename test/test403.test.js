// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 403 REINDEX', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test403;USE test403');
		done();
	});

	test('2. Create table and index before insert', done => {
		alasql('CREATE TABLE one (a INT)');
		alasql('CREATE INDEX xone ON one (a)');
		alasql('INSERT INTO one (a) VALUES (100), (200), (300)');
		done();
	});

	test('3. Create table and index after insert', done => {
		alasql('CREATE TABLE two (a INT)');
		alasql('INSERT INTO two (a) VALUES (100), (200), (300)');
		alasql('CREATE INDEX xtwo ON two (a)');
		done();
	});

	test('4. REINDEX', done => {
		var res = alasql('REINDEX xone');
		expect(res == 1).toBe(true);
		var res = alasql('REINDEX xtwo');
		expect(res == 1).toBe(true);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test403');
		done();
	});
});
