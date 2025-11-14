// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 234 Complex test', function () {
	test('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test234; USE test234;');
		done();
	});

	test('2. Throw error', function (done) {
		alasql('source "' + __dirname + '/test234.sql"', [], function (res) {
			//          console.log(res);
			assert.deepEqual(res.pop(), [
				{FirstName: 'John', LastName: 'Johnson'},
				{FirstName: 'Larry', LastName: 'Larrison'},
			]);
			done();
		});
	});

	test('99. DROP', function (done) {
		alasql('DROP DATABASE test234');
		done();
	});
});
