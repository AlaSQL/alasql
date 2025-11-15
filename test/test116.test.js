// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 116', () => {
	test('1. Single statement CREATE, USE and DROP DATABASE', done => {
		alasql('create database test116');
		expect(!!alasql.databases.test116).toBe(true);
		alasql('use test116');
		expect(alasql.useid == 'test116').toBe(true);
		alasql('drop database test116');
		expect(!alasql.databases.test116).toBe(true);
		expect(alasql.useid == 'alasql').toBe(true);
		done();
	});

	test('2. Single statement CREATE, USE and DROP CREATE TABLE ', done => {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		expect(!!alasql.tables.one).toBe(true);
		alasql('insert into one values (10)');
		expect(alasql.tables.one.data.length == 1).toBe(true);
		var res = alasql('select value sum(a) from one');
		expect(res == 10).toBe(true);
		alasql('drop database test116');
		done();
	});

	test('3. Single statement CREATE, USE and DROP CREATE TABLE ', done => {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		var ins = alasql.compile('insert into one values (10)');
		ins();
		expect(alasql.tables.one.data.length == 1).toBe(true);
		var sel = alasql.compile('select value sum(a) from one where a = ?');
		var res = sel([10]);
		var res = alasql('select value sum(a) from one');
		expect(res == 10).toBe(true);
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(1);
		alasql('drop database test116');
		done();
	});

	test('4. Compile and reset cache', done => {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into one (a) values (?)', [20]);
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(1);

		alasql('insert into one values (?)', [30]);
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(2);

		var res = alasql('select column a from one order by a');
		expect(res).toEqual([10, 20, 30]);
		alasql.databases.test116.resetSqlCache();
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(0);

		alasql('insert into one (a) values (?)', [40]);
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(1);

		var ins = alasql.compile('insert into one values (?)');
		ins([50]);
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(1);

		alasql('insert into one (a) values (60); insert into one (a) values (70)');
		expect(Object.keys(alasql.databases.test116.sqlCache).length).toEqual(1);

		var res = alasql('select value count(*) from one');
		expect(res == 7).toBe(true);

		var res = alasql('select value sum(a) from one');
		expect(res == 280).toBe(true);

		alasql('drop database test116');
		done();
	});

	test('5. INSERT INTO one SELECT ', done => {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('create table two (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into two select * from one');
		var res = alasql('select value * from two');
		expect(res).toEqual(10);
		alasql('drop database test116');
		done();
	});

	test('6. SELECT * INTO one ', done => {
		alasql('create database test116');
		alasql('use test116');
		alasql('create table one (a int)');
		alasql('create table two (a int)');
		alasql('insert into one (a) values (?)', [10]);
		alasql('insert into one (a) values (?)', [5]);
		var res = alasql('select value sum(a) from one');
		expect(res).toEqual(15);
		alasql('insert into two (a) values (?)', [20]);
		var res = alasql('select * into two from one');
		//		console.log(107,res);
		expect(res == 2).toBe(true);
		expect(alasql.databases.test116.tables.one.data.length == 2).toBe(true);
		expect(alasql.databases.test116.tables.two.data.length == 3).toBe(true);
		var res = alasql('select value sum(a) from two');
		//		console.log(res);
		expect(res == 35).toBe(true);
		alasql('drop database test116');
		done();
	});
});
