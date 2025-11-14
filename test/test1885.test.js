// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 1885 - consistent error messages for missing tables', function () {
	const testNum = '1885'; // insert test file number

	beforeAll(function () {
		alasql('create database test' + testNum);
		alasql('use test' + testNum);
		alasql('CREATE TABLE validTable (a INT, b INT, PRIMARY KEY (a,b))');
	});

	afterAll(function () {
		alasql('drop database test' + testNum);
	});

	test('SELECT returns standard error message', function () {
		assert.throws(() => alasql('select * from invalidTable'), {
			message: 'Table does not exist: invalidTable',
		});
	});

	test('JOIN ON returns standard error message', function () {
		assert.throws(
			() => alasql('select * from validTable JOIN invalidTable ON validTable.a = invalidTable.b'),
			{
				message: 'Table does not exist: invalidTable',
			}
		);
	});

	test('JOIN USING returns standard error message', function () {
		assert.throws(() => alasql('select * from validTable JOIN invalidTable USING a'), {
			message: 'Table does not exist: invalidTable',
		});
	});
});
