// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 397 << and >> ', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test397;USE test397');
		done();
	});

	test('2. << and >> and other operations...', done => {
		var res = alasql('= 1 << 2');
		expect(res).toEqual(4);

		var res = alasql('= 256 >> 4');
		expect(res).toEqual(16);

		var res = alasql('= 7 & 3');
		expect(res).toEqual(3);

		var res = alasql('= 8 | 1');
		expect(res).toEqual(9);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test397');
		done();
	});
});
