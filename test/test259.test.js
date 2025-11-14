// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 259 SqlLogic Parser Test #2', function () {
	test.skip('1. Sqllogic', function (done) {
		alasql('CREATE DATABASE test259; USE test259');
		done();
	});

	test.skip('2. FROM JOIN / CROSS JOIN syntax ', function (done) {
		alasql('CREATE TABLE tab0; CREATE TABLE tab2');

		alasql(
			'SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) \
          IS NOT NULL, tab0 AS cor2 '
		);

		//        alasql('SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) \
		//          IS NOT NULL CROSS JOIN tab0 AS cor2 ');

		alasql('DROP TABLE tab0; DROP TABLE tab2; ');
		done();
	});

	test.skip('3. SELECT ALL', function (done) {
		alasql('CREATE TABLE tab1;CREATE TABLE tab2');
		alasql('SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1');
		alasql('DROP TABLE tab1;DROP TABLE tab2');
		done();
	});

	test.skip('99. Drop Database', function (done) {
		alasql('DROP DATABASE test259');
		done();
	});
});
