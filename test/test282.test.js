// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 282 ADD COLUMN in LOCALSTORAGE', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test281;USE test281');
		done();
	});

	test.skip('2. UNIQUE constraint', function (done) {
		localStorage.clear();
		alasql('CREATE localStorage DATABASE IF NOT EXISTS register');
		alasql('ATTACH localStorage DATABASE register AS myregister');
		alasql('USE myregister;');
		alasql('CREATE TABLE IF NOT EXISTS transactions(transid STRING, payee STRING, amount DECIMAL)');
		for (var x = 0; x <= 3; x++) {
			alasql('INSERT INTO transactions VALUES (?,?,?)', ['a', 'b', 'c']);
		}
		alasql('ALTER TABLE transactions ADD COLUMN notes STRING;');
		alasql('INSERT INTO transactions VALUES (?,?,?,?)', ['a', 'b', 'c', 'some notes']);
		var res = alasql('SHOW COLUMNS FROM transactions;');
		alert(JSON.stringify(res));
		var res = alasql('SELECT * FROM transactions');
		alert(res[4].notes);
		localStorage.clear();
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test281');
		done();
	});
});
