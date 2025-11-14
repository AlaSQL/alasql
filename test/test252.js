// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 252 CREATE TABLE without column types', function () {
	test('1. Overwrite', function (done) {
		alasql('CREATE DATABASE test252; USE test252;');
		alasql('CREATE TABLE sqlite_sequence(name,seq)');
		alasql('INSERT INTO sqlite_sequence VALUES (1,10)');
		alasql('INSERT INTO sqlite_sequence VALUES ("one","ten")');
		var res = alasql('SELECT * FROM sqlite_sequence');
		//    console.log(res);

		assert.deepEqual(res, [
			{name: 1, seq: 10},
			{name: 'one', seq: 'ten'},
		]);
		done();
	});
});
