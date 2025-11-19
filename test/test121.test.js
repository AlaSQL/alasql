// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 121 - Views', () => {
	test('0. Create database', done => {
		alasql('create database test121');
		alasql('use test121');
		done();
	});

	test('1. CREATE VIEW', done => {
		alasql('create table one (a int, b int)');
		alasql('insert into one values (1,10), (2,20), (3,30)');

		alasql('create view two as select a from one');
		//		expect(!!alasql.databases.test121.tables.two).toBe(true);

		var res = alasql('select value sum(a) from two');
		expect(res == 6).toBe(true);

		alasql('drop view two');
		//		expect(!alasql.databases.test121.tables.two).toBe(true);
		done();
	});

	test('Clear database', done => {
		alasql('drop database test121');
		done();
	});
});
