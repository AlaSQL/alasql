// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 06', () => {
	test('Fiddle test ', () => {
		var db = new alasql.Database();

		db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

		db.tables.person.data = [
			{name: 'bill', sex: 'M', income: 50000},
			{name: 'sara', sex: 'F', income: 100000},
		];

		var res = db.exec("SELECT * FROM person WHERE sex='F' AND income > 60000");

		expect(res).toEqual([{name: 'sara', sex: 'F', income: 100000}]);
	});
});
