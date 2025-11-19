// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #965
*/

var testId = 620;

describe('Test ' + testId + ' ORDER BY direction when converting AST to string', () => {
	test('1. Should preserve the direction', () => {
		var sql = 'SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC';
		expect(sql).toEqual(alasql.parse(sql).toString());
	});
});
