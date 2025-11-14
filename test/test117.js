// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 117 - Table name resolution', function () {
	beforeAll(function () {
		alasql('create database test117');
		alasql('use test117');
		alasql('create table one (a int, b int)');
		alasql('insert into one values (10,100), (20,200), (30,300)');
		alasql('create table two (a int, b int, c int)');
		alasql('insert into two values (10,1,1), (20,2,2), (30,3,3)');
	});

	afterAll(function () {
		alasql('drop database test117');
	});

	test('1. One table', function (done) {
		var res = alasql('select value sum(c) from one join two using a');
		assert(res == 6);
		done();
	});

	test.skip('2. One table', function (done) {
		var res = alasql('select value sum(b) from one join two using a');
		assert(res == 600);
		done();
	});

	test.skip('3. One table', function (done) {
		var res = alasql('select value sum(one.b) from one join two using a');
		assert(res == 600);
		done();
	});

	test.skip('4. One table', function (done) {
		var res = alasql('select value sum(two.b) from one join two using a');
		assert(res == 6);
		done();
	});
});
