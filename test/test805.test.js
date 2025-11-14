// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

var current_timestamp = 'CURRENT_TIMESTAMP';
var testId = '805'; // insert test file number

describe(
	'Test ' +
		testId +
		' - yy.FuncValue for CURRENT_TIMESTAMP returning correct variable string, NOT function string',
	function () {
		test('A) toString() returns correct value', function () {
			var funcValue = new alasql.yy.FuncValue({funcid: current_timestamp});

			var result = funcValue.toString();

			assert.equal(result, current_timestamp);
		});

		test('B) SELECT CURRENT_TIMESTAMP query returns a date/time value', function () {
			var sql = `SELECT ${current_timestamp}`;
			var result = alasql(sql);

			assert.equal(
				new Date(result[0][current_timestamp]).toDateString(),
				new Date().toDateString()
			);
		});
	}
);
