// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 806 - INSERT statement to string has parenthesis around values.', () => {
	test("Insert's toString() returns values within parenthesis", () => {
		var expectedToStringValue1 = "INSERT INTO test VALUES (555,'String',NULL,2.4)";
		var expectedToStringValue2 =
			"INSERT INTO cities VALUES ('Rome',2863223),('Paris',2249975),('Berlin',3517424),('Madrid',3041579)";

		var statements = alasql.parse(expectedToStringValue1 + ';' + expectedToStringValue2).statements;

		expect(statements[0].toString()).toEqual(expectedToStringValue1);
		expect(statements[1].toString()).toEqual(expectedToStringValue2);
	});
});
