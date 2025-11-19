// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on this article:

*/

describe('Test 394 T-SQL Triggers', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test394;USE test394');
		done();
	});

	test('2. Create tables', done => {
		alasql('CREATE TABLE main (a INT)');
		alasql('CREATE TABLE log (a INT, d DATETIME DEFAULT GETTIME())');
		alasql('CREATE TRIGGER t_main ON main INSERT AS INSERT INTO log SELECT a FROM inserted');

		done();
	});

	test('3. Fire trigger', done => {
		alasql('INSERT INTO main VALUES (1)');

		var res = alasql('SELECT * FROM log');
		//console.log(res);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test394');
		done();
	});
});
