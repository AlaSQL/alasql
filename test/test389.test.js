// @ts-ignore
import {describe, test} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof global === 'object') {
	global.localStorage = new DOMStorage(__dirname + '/restest389.json', {
		strict: false,
		ws: '',
	});
}

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 389 Autoincrement for localStorage', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test389;USE test389');
		done();
	});

	test('2. Prepare tables', done => {
		alasql('SET AUTOCOMMIT OFF');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS test');
		alasql('ATTACH localStorage DATABASE test');
		alasql('CREATE TABLE IF NOT EXISTS test.one (a INT AUTO_INCREMENT, b STRING)');
		done();
	});

	test('3. SELECTs', () => {
		alasql('USE test');
		alasql('INSERT INTO test.one (b) VALUES ("one"), ("two")');
		alasql('INSERT INTO test.one (b) VALUES ("three"), ("four")');
		alasql('COMMIT TRANSACTION');
		var res = alasql('SELECT * FROM test.one');
		//Missing assert()

		alasql('TRUNCATE TABLE test.one; COMMIT TRANSACTION');
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test389');
		done();
	});
});
