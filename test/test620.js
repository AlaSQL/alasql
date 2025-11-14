// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #965
*/

var testId = 620;

describe('Test ' + testId + ' ORDER BY direction when converting AST to string', function () {
	test('1. Should preserve the direction', function () {
		var sql = 'SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC';
		assert.equal(sql, alasql.parse(sql).toString());
	});
});
