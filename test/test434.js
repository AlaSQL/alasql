// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 434 - joins SELECT', function () {
	const testId = '434'; // insert test file Number

	beforeAll(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);

		alasql('CREATE TABLE aaa(firstValue, secondValue)');
		alasql('INSERT INTO aaa VALUES(1, 2)');
		alasql('CREATE TABLE bbb(leftSide, rightSide)');
		alasql('INSERT INTO bbb VALUES(1, 2)');
	});

	afterAll(function () {
		alasql('drop database test' + testId);
	});

	test('does not throw error on join SELECT', function () {
		var res = alasql(
			'SELECT * FROM aaa JOIN (SELECT leftSide FROM bbb) AS bLeft ON (aaa.firstValue = bLeft.leftSide)'
		);

		assert.equal(res.length, 1);

		// TODO: The test currently does not pass. Now, the wrong value is returned.
		//assert.deepEqual(res, [{firstValue : 1, secondValue : 2, rightSide : 2}]);
	});
});
