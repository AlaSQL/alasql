// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 364 QUESTION MAK IN STRINGS', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test364;USE test364');
		alasql('CREATE TABLE pet(name STRING)');
		alasql('INSERT INTO pet VALUES ("Cat"),("Dog")');
		done();
	});

	test('2. TEST', function (done) {
		var res = alasql('SELECT * FROM pet WHERE name LIKE "?%"');
		var res = alasql('SELECT * FROM pet WHERE name LIKE "%?%"');
		var res = alasql('SELECT * FROM pet WHERE name LIKE "%?"');
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test364');
		done();
	});
});
