// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 122 - PRIMARY KEY, CREATE INDEX UNIQUE', () => {
	beforeAll(() => {
		alasql('create database test122');
		alasql('use test122');
	});

	afterAll(() => {
		alasql('drop database test122');
	});

	test('1. Create Index', done => {
		alasql('create table one (a int, b int)');

		alasql('create unique index onea on one(a)');
		//		console.log(alasql.databases.test122.tables.one);

		alasql('create index oneb on one(b)');

		alasql('insert into one values (1,10), (2,20), (3,30)');

		done();
	});

	test.skip('2. UNIQUE Index with repeated data', done => {
		expect(() => {
			alasql('insert into one values (1,40)');
		}).toThrow(Error);
		done();
	});

	test('3. normal Index with repeated data', done => {
		alasql('insert into one values (4,30)');
		done();
	});

	test('4. same data index', done => {
		alasql('insert into one values (4,30)');
		done();
	});
});
