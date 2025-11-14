// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 
*/

describe('Test 398 GLOB ', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test398;USE test398');
		done();
	});

	test('2. GLOB tests', function (done) {
		var res = alasql('="abcde" GLOB "abcde"');
		assert(res);
		var res = alasql('="abcde" GLOB "a*"');
		assert(res);
		var res = alasql('="abcde" GLOB "a????"');
		assert(res);
		var res = alasql('="abcde" GLOB "a?"');
		assert(!res);
		var res = alasql('="abcde" GLOB "*b*"');
		assert(res);
		var res = alasql('="abcde" GLOB "*g*"');
		assert(!res);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test398');
		done();
	});
});
