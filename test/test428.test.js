// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 428;

describe('Test ' + testId + ' UUID()', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Simple test GUID', done => {
		var res = alasql('=UUID()');
		expect(
			!!res.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		).toBe(true);
		done();
	});

	test('2. DEFAULT GUID', done => {
		alasql('CREATE TABLE test428.one (a INT, b STRING DEFAULT UUID())');
		alasql('INSERT INTO test428.one(a) VALUES (1)');
		var res = alasql('SELECT * FROM test428.one');
		expect(
			!!res[0].b.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		).toBe(true);
		done();
	});
});
