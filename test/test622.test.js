// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #972
*/

var testId = 622;

describe('Test ' + testId + ' Converting syntax tree to SQL with multple joins', () => {
	test('1. Same SQL when parsed', () => {
		var sql =
			'SELECT * FROM cities AS c INNER JOIN state AS s ON c.state_id = s.id INNER JOIN country AS c2 ON s.country_id = c2.id';
		expect(sql).toEqual(alasql.parse(sql).toString());
	});
});
