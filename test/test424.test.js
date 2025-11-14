// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 424;

describe('Test ' + testId + ' Arrow and DOT', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. DOT outside SELECT', function (done) {
		var res = alasql('={a:10}.a');
		assert(res == 10);
		done();
	});

	test.skip('2. DOT inside SELECT', function (done) {
		var res = alasql('SELECT a.b FROM @[{a:{b:10}}]');
		console.log(res);
		assert.deepEqual(res, [{'a.b': 10}]);
		done();
	});

	test('3. DOT inside SELECT', function (done) {
		alasql('CREATE TABLE a (b INT); INSERT INTO a VALUES (10)');
		var res = alasql('SELECT a.b FROM a');
		assert.deepEqual(res, [{b: 10}]);
		done();
	});

	test('4. DOT inside SELECT', function (done) {
		alasql('CREATE TABLE e (b JSON); INSERT INTO e VALUES ({c:10})');
		var res = alasql('SELECT b->c FROM e');
		assert.deepEqual(res, [{'b->c': 10}]);
		done();
	});

	test.skip('5. DOT inside SELECT', function (done) {
		var res = alasql('SELECT b.c FROM e');
		console.log(res);
		assert.deepEqual(res, [{'b.c': 10}]);
		//    assert(res==10);
		done();
	});
});
