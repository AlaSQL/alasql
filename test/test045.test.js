// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 45', () => {
	describe('table AS alias', () => {
		test('CASE Expression WHEN THEN END', done => {
			alasql('create database test45');
			alasql('use test45');
			alasql('CREATE TABLE one (a INT)');
			alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

			expect(5).toEqual(alasql('SELECT a FROM one').length);
			expect(5).toEqual(alasql('SELECT one.a FROM one').length);
			expect(5).toEqual(alasql('SELECT t.a FROM one t').length);
			expect(5).toEqual(alasql('SELECT t.a FROM one AS t').length);
			alasql('drop database test45');
			done();
		});
	});
});
