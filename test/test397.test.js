// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 397 << and >> ', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test397;USE test397');
		done();
	});

	test('2. << and >> and other operations...', function (done) {
		var res = alasql('= 1 << 2');
		assert.equal(res, 4);

		var res = alasql('= 256 >> 4');
		assert.equal(res, 16);

		var res = alasql('= 7 & 3');
		assert.equal(res, 3);

		var res = alasql('= 8 | 1');
		assert.equal(res, 9);

		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test397');
		done();
	});
});
