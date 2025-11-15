// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 399 || string concatenation', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test399;USE test399');
		done();
	});

	test('2. ||', done => {
		var res = alasql('= "apple" || "watch"');
		expect(res == 'applewatch').toBe(true);
		done();
	});

	test('3. Many small tests', done => {
		alasql.options.modifier = 'VALUE';

		var res = alasql("SELECT null || 'a'");
		expect(res == 'a').toBe(true);

		var res = alasql("SELECT 'a' || null");
		expect(res == 'a').toBe(true);

		var res = alasql('SELECT null || true');
		expect(res == 'true').toBe(true);
		// No assert here

		var res = alasql("SELECT true || 'a'");
		expect(res == 'truea').toBe(true);
		// No assert here

		var res = alasql("SELECT 'a' || 'b'");
		expect(res == 'ab').toBe(true);

		var res = alasql("SELECT 'ab' = 'a' || 'b'");
		expect(res).toBe(true);

		var res = alasql("SELECT 'ab' = 'ab' || 'b'");
		expect(!res).toBe(true);

		var res = alasql("SELECT 'ab' = ('a' || 'b')");
		expect(res).toBe(true);

		var res = alasql("SELECT 'ab' = ('a' || 'ab')");
		expect(!res).toBe(true);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test399');
		done();
	});
});
