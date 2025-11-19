// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 126 ALTER TABLE RENAME COLUMN', () => {
	test('1. Rename column', done => {
		alasql('create database test126');
		alasql('use test126');
		alasql('create table one (a int, b int, c string)');
		alasql('insert into one values (1,1,1), (2,2,2)');
		alasql('alter table one rename column b to bbb');
		expect(!alasql.tables.one.xcolumns.b).toBe(true);
		expect(!!alasql.tables.one.xcolumns.bbb).toBe(true);

		var res = alasql('select * from one');
		expect(res).toEqual([
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);
		done();
	});

	test('2. Rename table', done => {
		alasql('rename table one to two');
		expect(!alasql.tables.one).toBe(true);
		expect(!!alasql.tables.two).toBe(true);

		var res = alasql('select * from two');
		expect(res).toEqual([
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);
		done();
	});

	test('3. Drop column', done => {
		alasql('alter table two drop column a');
		expect(!alasql.tables.two.xcolumns.a).toBe(true);

		var res = alasql('select * from two');
		expect(res).toEqual([
			{bbb: 1, c: 1},
			{bbb: 2, c: 2},
		]);

		alasql('drop database test126');
		done();
	});
});
