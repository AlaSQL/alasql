// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 358 DROP TABLE for nultiple tables', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test358;USE test358');
		done();
	});

	test('2. Prepare Data', function (done) {
		alasql(`
      CREATE TABLE users( id int, name char(16) ) ; 
      INSERT INTO users VALUES (1,'John'),(2,'Lewis'),(3,'Muhammad'); 
      CREATE TABLE hobbies( id int, title char(16) ) ; 
      INSERT INTO hobbies  
      VALUES (1,'Sports'),(2,'Computing'),(3,'Drinking'),(4,'Racing'),(5,'Swimming'),(6,'Photography'); 
      CREATE TABLE users_hobbies( user_id int, hobby_id int ) ; 
      INSERT INTO users_hobbies  
      VALUES (1,2),(1,3),(1,6),(2,1),(2,5),(2,6),(3,2),(3,5),(3,6),(1,2),(1,3),(1,6),(2,1), 
      (2,5),(2,6),(3,2),(3,5),(3,6),(1,2),(1,3),(1,6),(2,1),(2,5),(2,6),(3,2),(3,5),(3,6); 
  `);

		done();
	});

	test('3. DROP TABLE', function (done) {
		var res = alasql(`
    DROP TABLE users, hobbies;
  `);

		assert.deepEqual(res, 2);
		assert.deepEqual(alasql.databases.test358.tables.users, undefined);
		assert.deepEqual(alasql.databases.test358.tables.hobbies, undefined);

		done();
	});

	test('4. DROP TABLE IF EXISTS', function (done) {
		var res = alasql(`
      DROP TABLE IF EXISTS users, hobbies, users_hobbies;
  `);

		assert.deepEqual(res, 1);
		assert.deepEqual(alasql.databases.test358.tables, {});

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test358');
		done();
	});
});
