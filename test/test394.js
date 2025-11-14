// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 This sample beased on this article:

*/

describe('Test 394 T-SQL Triggers', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test394;USE test394');
		done();
	});

	test('2. Create tables', function (done) {
		alasql('CREATE TABLE main (a INT)');
		alasql('CREATE TABLE log (a INT, d DATETIME DEFAULT GETTIME())');
		alasql('CREATE TRIGGER t_main ON main INSERT AS INSERT INTO log SELECT a FROM inserted');

		done();
	});

	test('3. Fire trigger', function (done) {
		alasql('INSERT INTO main VALUES (1)');

		var res = alasql('SELECT * FROM log');
		//console.log(res);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test394');
		done();
	});
});
