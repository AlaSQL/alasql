// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var current_timestamp = 'CURRENT_TIMESTAMP';
var testId = '805'; // insert test file number

describe('Test ' +
	testId +
	' - yy.FuncValue for CURRENT_TIMESTAMP returning correct variable string, NOT function string', () => {
	test('A) toString() returns correct value', () => {
		var funcValue = new alasql.yy.FuncValue({funcid: current_timestamp});

		var result = funcValue.toString();

		expect(result).toEqual(current_timestamp);
	});

	test('B) SELECT CURRENT_TIMESTAMP query returns a date/time value', () => {
		var sql = `SELECT ${current_timestamp}`;
		var result = alasql(sql);

		expect(new Date(result[0][current_timestamp]).toDateString()).toEqual(
			new Date().toDateString()
		);
	});
});
