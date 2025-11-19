// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testNum = '856'; // insert test file number

describe('Test ' + testNum + ' - DELETE without WHERE clause', function () {
	beforeAll(function () {
		alasql('DROP TABLE IF EXISTS test856table');
		alasql('CREATE TABLE test856table (id INT, name STRING)');
	});

	afterAll(function () {
		alasql('DROP TABLE test856table');
	});

	test('1. DELETE without WHERE should delete all rows', function () {
		alasql('INSERT INTO test856table VALUES (1, "Alice"), (2, "Bob"), (3, "Charlie")');
		var res = alasql('SELECT * FROM test856table');
		expect(res.length).toBe(3);

		var deletedCount = alasql('DELETE FROM test856table');
		expect(deletedCount).toBe(3);

		var res2 = alasql('SELECT * FROM test856table');
		expect(res2.length).toBe(0);
	});

	test('2. DELETE without WHERE on fresh data', function () {
		alasql('INSERT INTO test856table VALUES (1, "Test1"), (2, "Test2")');
		var res = alasql('SELECT * FROM test856table');
		expect(res.length).toBe(2);

		var deletedCount = alasql('DELETE FROM test856table');
		expect(deletedCount).toBe(2);

		var res2 = alasql('SELECT * FROM test856table');
		expect(res2.length).toBe(0);
	});
});
