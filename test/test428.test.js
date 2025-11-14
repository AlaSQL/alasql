// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 428;

describe('Test ' + testId + ' UUID()', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Simple test GUID', function (done) {
		var res = alasql('=UUID()');
		assert(
			!!res.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		);
		done();
	});

	test('2. DEFAULT GUID', function (done) {
		alasql('CREATE TABLE one (a INT, b STRING DEFAULT UUID())');
		alasql('INSERT INTO one(a) VALUES (1)');
		var res = alasql('SELECT * FROM one');
		assert(
			!!res[0].b.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		);
		done();
	});
});
