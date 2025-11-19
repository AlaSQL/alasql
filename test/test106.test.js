//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 06 - Callback', () => {
	test('exec(sql, callback)', done => {
		alasql('create database test06; use test06');
		alasql('CREATE TABLE test (a INT, b INT)');
		alasql('INSERT INTO test VALUES (1,1)');
		alasql('SELECT * FROM test', [], function (res) {
			expect(res[0].a == 1).toBe(true);
			alasql('drop database test06');
			done();
		});
	});
});
