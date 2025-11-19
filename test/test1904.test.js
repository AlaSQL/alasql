// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1937: EXISTS in SQL Queries and SET Statements', () => {
	beforeAll(() => {
		alasql('create database test1937');
		alasql('use test1937');
		alasql('DROP TABLE IF EXISTS one');
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');
	});

	afterAll(() => {
		alasql('drop database test1937');
	});

	test('Nested EXISTS in subquery', done => {
		const res = alasql(
			'SELECT EXISTS(SELECT a FROM one WHERE 0) AS main_exists, * FROM (SELECT EXISTS(SELECT a FROM one) AS sub_exists, a FROM one)'
		);
		expect(
			[
				{main_exists: false, a: 1, sub_exists: true},
				{main_exists: false, a: 2, sub_exists: true},
				{main_exists: false, a: 3, sub_exists: true},
				{main_exists: false, a: 4, sub_exists: true},
				{main_exists: false, a: 5, sub_exists: true},
			],
			res
		);
		done();
	});

	test('EXISTS in SET statement', done => {
		const res = alasql(
			`SET @existsLessThan3 = (SELECT EXISTS(SELECT a FROM one WHERE a < 3));
			SET @existsGreaterThan10 = (SELECT EXISTS(SELECT a FROM one WHERE a > 10));
			SELECT @existsLessThan3, @existsGreaterThan10;`
		);
		expect([{'@existsLessThan3': true, '@existsGreaterThan10': false}], res[2]);
		done();
	});
});
