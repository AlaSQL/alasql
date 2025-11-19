// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 402 a NOT NULL', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test402');
		done();
	});

	test('2. Create table and trigger', done => {
		alasql('CREATE TABLE test402.one (a INT, b INT)');
		alasql('INSERT INTO test402.one (a) VALUES (100), (200), (300)');
		alasql('UPDATE test402.one SET b = 1 WHERE a = 100');
		done();
	});

	test('3. IS NOT NULL', done => {
		var res = alasql('SELECT * FROM test402.one WHERE b IS NOT NULL');
		expect(res).toEqual([{a: 100, b: 1}]);
		done();
	});

	test('4. NOT NULL', done => {
		var res = alasql('SELECT * FROM test402.one WHERE b NOT NULL');
		expect(res).toEqual([{a: 100, b: 1}]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test402');
		done();
	});
});
