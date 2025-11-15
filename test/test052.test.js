// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 52 - UPPER CASE and LOWER CASE', () => {
	var db1 = new alasql.Database('city');

	test('Upper and lower case in CREATE TABLE Category', done => {
		db1.exec('CrEaTe TABle categories (category Int, city strinG)');
		db1.exec('InsERT Into categories values (1,"Rome")');
		db1.exec('insert into categories values (1,"Paris")');
		db1.exec('INSERT INTO categories VAlUES (2, "Moscow")');
		db1.exec('INSERT INTO categories VALues (3, "New York")');
		expect(4).toEqual(db1.exec('select VALUE COUNT(*) from categories'));
		done();
	});

	test('Upper and lower case in CREATE TABLE City', done => {
		db1.exec('CREATE table cities (city String, population int)');
		db1.exec('INSERT INTO cities VALues ("Rome",10)');
		db1.exec('insert into cities values ("Moscow", 12)');
		db1.exec('inseRt iNto cities vAlues ("New York", 16)');
		db1.exec('INSERT into cities values ("Paris", 9)');
		expect(4).toEqual(db1.exec('select value count(*)from cities'));
		expect(47).toEqual(db1.exec('select vaLuE suM(population) from cities'));
		done();
	});

	test('Upper and lower case in SELECT with JOIN', done => {
		var sql1 =
			'select column population from (SELECT category, ' +
			'SUM(cities.population) as population from categories ' +
			'join cities using city group BY category) T order BY population';
		var sql2 =
			'select column population from (SELECT category, ' +
			'SUM(cities.population) as population from categories ' +
			'join cities using city group by category) t order by population';
		expect(db1.exec(sql1)).toEqual([12, 16, 19]);
		expect(db1.exec(sql2)).toEqual([12, 16, 19]);
		done();
	});

	test('Upper and lower case in SELECT with JOIN', done => {
		var res1 = db1.exec(
			'select value sum(cities.population) from categories ' + ' join cities using city'
		);

		var res2 = db1.exec(
			'SELECT VALUE SUM(cities.population) FROM categories  ' + ' JOIN cities Using city'
		);

		var res3 = db1.exec(
			'Select Value Sum(cities.population) From categories ' + ' Join cities Using city'
		);

		var res4 = db1.exec(
			'Select Value Sum(cities.population) From categories ' +
				' Join cities ON categories.city = cities.city'
		);

		expect(47).toEqual(res1);
		expect(47).toEqual(res2);
		expect(47).toEqual(res3);
		expect(47).toEqual(res4);
		done();
	});
});
