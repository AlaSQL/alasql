// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #502
*/

describe('Test 410 Raise error on undefined tables', function () {
	test('2. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test410;USE test410');
		done();
	});

	test('2. CREATE DATABASE', function (done) {
		assert.throws(function () {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)');
		}, Error);

		assert.throws(function () {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT x,y FROM t1)');
		}, Error);

		assert.throws(function () {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT * FROM t1)');
		}, Error);

		assert.throws(function () {
			alasql('SELECT 1 FROM t1 WHERE 1 IN (SELECT min(x),max(x) FROM t1)');
		}, Error);

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test410');
		done();
	});
});
