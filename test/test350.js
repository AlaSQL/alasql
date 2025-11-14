// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 350 SERIAL data type', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test350;USE test350');
		done();
	});

	test('2. CREATE TABLE', function (done) {
		var res = alasql('CREATE TABLE one (id SERIAL, name STRING)');
		assert.deepEqual(res, 1);
		done();
	});

	test('3. INSERT', function (done) {
		var res = alasql('INSERT INTO one (name) VALUES ("One"), ("Two"), ("Three")');
		assert.deepEqual(res, 3);
		done();
	});

	test('4. SELECT', function (done) {
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{id: 1, name: 'One'},
			{id: 2, name: 'Two'},
			{id: 3, name: 'Three'},
		]);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test350');
		done();
	});
});
