// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 47', () => {
	describe('No error on subquery without alias', () => {
		test('Query without alias', done => {
			alasql('create database test47');
			alasql('use test47');
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT)');
			alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

			var res = alasql('SELECT COLUMN * FROM (SELECT * FROM one WHERE a < 3)');
			expect(res).toEqual([1, 2]);
			done();
		});

		test('Subsubqueries without alias', done => {
			var res = alasql('SELECT VALUE SUM(a) FROM (SELECT * FROM one WHERE a < 3)');
			expect(3).toEqual(res);
			var res = alasql('SELECT VALUE COUNT(*) FROM (SELECT * FROM one WHERE a < 3)');
			expect(2).toEqual(res);

			alasql('drop database test47');
			done();
		});
	});
});
