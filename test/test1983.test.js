// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

const testId = '1983'; // insert test file number

describe('Test 1983 - multiple statements', function () {
	beforeAll(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE a (anything string);');
	});

	afterAll(function () {
		alasql('drop database test' + testId);
	});

	test('USING followed by name', function () {
		assert.doesNotThrow(() => alasql('SELECT * FROM a a1 JOIN a a2 USING c;'));
	});

	test('USING followed by name in parathesis', function () {
		assert.doesNotThrow(() => alasql('SELECT * FROM a a1 JOIN a a2 USING (c);'));
	});
});
