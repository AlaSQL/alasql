// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on this article:

*/

describe('Test 392 Observable (issue #499)', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test392');
		done();
	});

	test.skip('2. Prepare test data', done => {
		//    var testId = 0;

		alasql('CREATE TABLE test392.one (a INT, b STRING)');

		Array.observe(alasql.databases.test392.tables.one.data, function (args) {
			//      test++;
			//      console.log('changed',arguments);
		});

		alasql('INSERT INTO test392.one VALUES (10,"Ten")');
		alasql('UPDATE test392.one SET a = 20 WHERE a = 10');
		alasql('DELETE FROM test392.one WHERE a = 20');

		//console.log(test);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test392');
		done();
	});
});
