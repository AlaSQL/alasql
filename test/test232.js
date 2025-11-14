// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var testNum = 232;

describe('Test 232 Errors handling', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testNum + '; USE test' + testNum + ';');
	});

	afterAll(function () {
		alasql('set errorlog off');
		alasql('DROP DATABASE test' + testNum + '');
	});

	test('2. Throw error', function () {
		alasql('set errorlog off');
		assert.throws(function () {
			alasql('SELECT * FROM faultyName', [], function (data, err) {});
		}, Error);
	});

	test('3. Log error async', function (done) {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName', [], function (data, err) {
			assert(/^Table does not exist\:/.test(err.message));
			done();
		});
	});

	test('4. Log error sync', function () {
		alasql('set errorlog on');
		alasql('SELECT * FROM faultyName');
		assert(/^Table does not exist\:/.test(alasql.error.message));
		alasql('SELECT * FROM ?', [{a: 1}, {a: 2}]);
		assert(!alasql.error);
	});
});
