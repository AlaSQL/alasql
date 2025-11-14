// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 426;

describe('Test ' + testId + ' Binary operators', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. ^', function (done) {
		var res = alasql('= 60^13');
		assert.deepEqual(res, 49);
		done();
	});

	test('2. ~', function (done) {
		var res = alasql('= ~60');
		assert(res == -61);
		done();
	});

	test('3. POWER', function (done) {
		var res = alasql('= POWER(2,3)');
		assert(res == 8);
		done();
	});

	test('4. EXP', function (done) {
		var res = alasql('= EXP(1)');
		assert(res == 2.718281828459045);
		done();
	});
});
