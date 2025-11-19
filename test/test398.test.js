// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 
*/

describe('Test 398 GLOB ', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test398;USE test398');
		done();
	});

	test('2. GLOB tests', done => {
		var res = alasql('="abcde" GLOB "abcde"');
		expect(res).toBe(true);
		var res = alasql('="abcde" GLOB "a*"');
		expect(res).toBe(true);
		var res = alasql('="abcde" GLOB "a????"');
		expect(res).toBe(true);
		var res = alasql('="abcde" GLOB "a?"');
		expect(!res).toBe(true);
		var res = alasql('="abcde" GLOB "*b*"');
		expect(res).toBe(true);
		var res = alasql('="abcde" GLOB "*g*"');
		expect(!res).toBe(true);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test398');
		done();
	});
});
