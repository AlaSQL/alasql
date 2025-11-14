// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 000 - multiple statements', function () {
	const testId = '000'; // insert test file number

	beforeAll(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	afterAll(function () {
		alasql('drop database test' + testId);
	});

	test('A) From single lines', function () {
		var res = [];
		res.push(alasql('create table one (a int)'));
		res.push(alasql('insert into one values (1),(2),(3),(4),(5)'));
		res.push(alasql('select * from one'));
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	test('B) Multiple statements in one string', function () {
		//
		var sql = 'create table two (a int);';
		sql += 'insert into two values (1),(2),(3),(4),(5);';
		sql += 'select * from two;';
		var res = alasql(sql);
		assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
	});

	test('C) Multiple statements in one string with callback', function (done) {
		// Please note that first parameter (here `done`) must be called if defined - and is needed when testing async code
		var sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function (res) {
			assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
});
