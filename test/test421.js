// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

// Test for issue #379

describe('Test 421 Test for JOINSTAR', function () {
	var testId = 421;

	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql.options.joinstar = 'overwrite';
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Create tables', function (done) {
		alasql('CREATE TABLE one (a INT); INSERT INTO one VALUES (1),(2)');
		alasql('CREATE TABLE two (a INT); INSERT INTO two VALUES (10),(20)');
		done();
	});

	test('2. OVERWRITE JOINSTAR', function (done) {
		alasql.options.joinstar = 'overwrite';
		var res = alasql('SELECT * FROM one,two');
		assert.deepEqual(res, [{a: 10}, {a: 20}, {a: 10}, {a: 20}]);
		done();
	});

	test('3. JSON JOINSTAR', function (done) {
		alasql.options.joinstar = 'json';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one,two');
		//console.log(res);
		assert.deepEqual(res, [
			{one: {a: 1}, two: {a: 10}},
			{one: {a: 1}, two: {a: 20}},
			{one: {a: 2}, two: {a: 10}},
			{one: {a: 2}, two: {a: 20}},
		]);
		done();
	});

	test('4. UNDESCORE JOINSTAR', function (done) {
		alasql.options.joinstar = 'underscore';
		alasql.databases.test421.dbversion++; // Reset database cache
		var res = alasql('SELECT * FROM one,two');
		//console.log(res);
		assert.deepEqual(res, [
			{one_a: 1, two_a: 10},
			{one_a: 1, two_a: 20},
			{one_a: 2, two_a: 10},
			{one_a: 2, two_a: 20},
		]);
		done();
	});
});
