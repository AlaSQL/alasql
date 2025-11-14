// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 This sample beased on this article:

*/

describe('Test 392 Observable (issue #499)', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test392;USE test392');
		done();
	});

	test.skip('2. Prepare test data', function (done) {
		//    var testId = 0;

		alasql('CREATE TABLE one (a INT, b STRING)');

		Array.observe(alasql.databases.test392.tables.one.data, function (args) {
			//      test++;
			//      console.log('changed',arguments);
		});

		alasql('INSERT INTO one VALUES (10,"Ten")');
		alasql('UPDATE one SET a = 20 WHERE a = 10');
		alasql('DELETE FROM one WHERE a = 20');

		//console.log(test);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test392');
		done();
	});
});
