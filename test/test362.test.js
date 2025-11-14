// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 362 IF() and IIF()', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test362;USE test362');
		done();
	});

	test('2. TEST', function (done) {
		var res = alasql('VALUE OF SELECT IIF(1>2,2,3)');
		assert.deepEqual(res, 3);
		var res = alasql('VALUE OF SELECT IF(1>2,2,3)');
		assert.deepEqual(res, 3);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test362');
		done();
	});
});
