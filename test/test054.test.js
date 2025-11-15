// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 54 - SELECT Number', () => {
	test('SELECT number', done => {
		alasql('create database test54');
		alasql('use test54');

		expect(alasql('SELECT VALUE 10')).toBe(10);
		//		console.log(alasql('SELECT RECORDSET 10,20'));
		expect(alasql('SELECT ROW 10,20')).toEqual([10, 20]);
		expect(alasql('SELECT VALUE 2+2')).toBe(4);
		//		console.log(alasql('SELECT RECORDSET "Peter"'));
		expect(alasql('SELECT VALUE "Peter"')).toBe('Peter');
		expect(alasql('SELECT VALUE a FROM (SELECT 10 AS a) AS t')).toBe(10);
		expect(alasql('SELECT VALUE a FROM (SELECT 10 as a)')).toBe(10);

		//		console.log(alasql('SELECT COLUMN a FROM (SELECT 10 as a UNION ALL SELECT 20 as a)'));
		expect(alasql('SELECT COLUMN a FROM (SELECT 10 as a UNION ALL SELECT 20 as a)')).toEqual([
			10, 20,
		]);
		done();
	});
});
