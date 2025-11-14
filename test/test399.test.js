// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 399 || string concatenation', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test399;USE test399');
		done();
	});

	test('2. ||', function (done) {
		var res = alasql('= "apple" || "watch"');
		assert(res == 'applewatch');
		done();
	});

	test('3. Many small tests', function (done) {
		alasql.options.modifier = 'VALUE';

		var res = alasql("SELECT null || 'a'");
		assert(res == 'a');

		var res = alasql("SELECT 'a' || null");
		assert(res == 'a');

		var res = alasql('SELECT null || true');
		assert(res == 'true');
		// No assert here

		var res = alasql("SELECT true || 'a'");
		assert(res == 'truea');
		// No assert here

		var res = alasql("SELECT 'a' || 'b'");
		assert(res == 'ab');

		var res = alasql("SELECT 'ab' = 'a' || 'b'");
		assert(res);

		var res = alasql("SELECT 'ab' = 'ab' || 'b'");
		assert(!res);

		var res = alasql("SELECT 'ab' = ('a' || 'b')");
		assert(res);

		var res = alasql("SELECT 'ab' = ('a' || 'ab')");
		assert(!res);

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test399');
		done();
	});
});
