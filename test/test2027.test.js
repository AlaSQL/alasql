const alasql = require('../dist/alasql.js');

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
describe('Test 2007 - SQL cache', () => {
	beforeAll(() => {
		alasql('create database test');
		alasql('use test');
	});

	afterAll(() => {
		alasql('drop database test');
	});

	test('A) Execute query and assert cache for `data` afterwards', () => {
		alasql('CREATE TABLE osoby (id INT, meno STRING)');
		alasql('INSERT INTO osoby VALUES (1, "John"), (2, "Jane"), (3, "Jake")');
		var res = alasql('SELECT * FROM osoby');

		expect(alasql.databases['test'].sqlCache['-169125189'].query.data).toEqual([]);
		expect(res.length).toEqual(3);

		// Delete all rows
		alasql('DELETE FROM osoby');

		// Assert that the cache is still empty for "data"
		// Without the fix, the cache would still contain the data from the previous query even though all rows were deleted
		expect(alasql.databases['test'].sqlCache['-169125189'].query.data).toEqual([]);

		// Insert more rows
		alasql('INSERT INTO osoby VALUES (4, "Jack"), (5, "Paul")');

		// Execute same query from cache again, the cache is hit now
		var res2 = alasql('SELECT * FROM osoby');

		// Cache should still be empty for "data"
		expect(alasql.databases['test'].sqlCache['-169125189'].query.data).toEqual([]);
		expect(res2.length).toEqual(2);
	});
});
