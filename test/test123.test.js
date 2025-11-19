// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 123 - SHOW DATABASES, TABLES, COLUMNS, INDEX, CREATE TABLE', () => {
	test('1. SHOW DATABASES', done => {
		alasql('create database test123a');
		alasql('create database test123b');
		alasql('use test123a');
		var res = alasql('show databases');
		expect(res.length >= 3).toBe(true);
		expect(
			res.filter(function (r) {
				return r.databaseid == 'test123a' || r.databaseid == 'test123b';
			}).length == 2
		).toBe(true);

		var res = alasql('show databases like "%123%"');
		//		console.log(res);
		expect(res.length == 2).toBe(true);
		done();
	});

	test('2. SHOW TABLES', done => {
		alasql('create table one (a int, b int, c string)');
		alasql('create table two (b int)');
		alasql('create table three (c int)');
		var res = alasql('show tables');
		expect(res.length == 3).toBe(true);
		alasql('use test123b');
		alasql('create table four (a int, b int, c int, d int)');

		var res = alasql('show tables from test123a');
		expect(res.length == 3).toBe(true);

		alasql('use test123a');

		var res = alasql('show tables from test123a like "t%"');
		expect(res.length == 2).toBe(true);

		done();
	});

	test('3. SHOW COLUMNS', done => {
		var res = alasql('show columns from one');
		expect(res.length == 3).toBe(true);
		var res = alasql('show columns from four from test123b ');
		expect(res.length == 4).toBe(true);
		done();
	});

	test('4. SHOW CREATE TABLE', done => {
		var res = alasql('show create table one');
		expect(res == 'CREATE TABLE one (a INT, b INT, c STRING).toBe(true)');
		var res = alasql('show create table four from test123b');
		expect(res == 'CREATE TABLE four (a INT, b INT, c INT, d INT).toBe(true)');
		done();
	});

	if (false) {
		test('5. SHOW INDEX', done => {
			alasql('insert into one values (1,1,1), (2,2,2), (4,4,4), (5,5,5), (6,6,6)');
			alasql('insert into two values (1),(2),(3),(6)');

			var res = alasql('show index from one');
			//		console.log(res);

			var res = alasql('select * from one join two using b');
			//		console.log(res);

			var res = alasql('show index from one');
			//		console.log(res);

			alasql('create index twob on two(b)');

			var res = alasql('show index from two');
			//		console.log(res);

			alasql('create unique index onea on one(a)');

			var res = alasql('show index from one');
			//		console.log(res);
			expect(false).toBe(true);
			done();
		});
	}

	test('99.Clear database', done => {
		alasql('drop database test123a');
		alasql('drop database test123b');
		done();
	});
});
