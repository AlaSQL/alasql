// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 06', function () {
	test('Fiddle test ', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

		db.tables.person.data = [
			{name: 'bill', sex: 'M', income: 50000},
			{name: 'sara', sex: 'F', income: 100000},
		];

		var res = db.exec("SELECT * FROM person WHERE sex='F' AND income > 60000");

		assert.deepEqual([{name: 'sara', sex: 'F', income: 100000}], res);
		done();
	});
});
