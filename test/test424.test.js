// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 424;

describe('Test ' + testId + ' Arrow and DOT', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. DOT outside SELECT', done => {
		var res = alasql('={a:10}.a');
		expect(res == 10).toBe(true);
		done();
	});

	test.skip('2. DOT inside SELECT', done => {
		var res = alasql('SELECT a.b FROM @[{a:{b:10}]');
		console.log(res);
		expect(res).toEqual([{'a.b': 10}]);
		done();
	});

	test('3. DOT inside SELECT', done => {
		alasql('CREATE TABLE a (b INT); INSERT INTO a VALUES (10)');
		var res = alasql('SELECT a.b FROM a');
		expect(res).toEqual([{b: 10}]);
		done();
	});

	test('4. DOT inside SELECT', done => {
		alasql('CREATE TABLE e (b JSON); INSERT INTO e VALUES ({c:10})');
		var res = alasql('SELECT b->c FROM e');
		expect(res).toEqual([{'b->c': 10}]);
		done();
	});

	test.skip('5. DOT inside SELECT', done => {
		var res = alasql('SELECT b.c FROM e');
		console.log(res);
		expect(res).toEqual([{'b.c': 10}]);
		//    expect(res==10).toBe(true);
		done();
	});
});
