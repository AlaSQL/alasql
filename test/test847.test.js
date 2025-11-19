// Test for nested subqueries - Issue: Nested SubQueries do not work as expected
// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 847 - Nested Subqueries', function () {
	beforeAll(function () {
		alasql(`
			DROP TABLE IF EXISTS cities;
			DROP TABLE IF EXISTS countries;
			DROP TABLE IF EXISTS population;

			CREATE TABLE cities (city string, population number);
			INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975), ('Berlin',3517424), ('Madrid',3041579),('Easingwold',4627);

			CREATE TABLE countries (name string, population number, city string);
			INSERT INTO countries VALUES ('Italy', 89764679009, 'Rome'), ('France', 165247191, 'Paris'), ('Germany', 346186257, 'Berlin');

			CREATE TABLE population (number int);
			INSERT INTO population VALUES (89764679009), (165247191);
		`);
	});

	afterAll(function () {
		alasql(`
			DROP TABLE IF EXISTS cities;
			DROP TABLE IF EXISTS countries;
			DROP TABLE IF EXISTS population;
		`);
	});

	test('1. Nested subqueries in IN clause should work', function () {
		var result = alasql(
			'SELECT * FROM cities WHERE city IN (SELECT DISTINCT city FROM countries WHERE population IN (SELECT DISTINCT number from population))'
		);

		expect(result.length).toBe(2);
		expect(result[0].city).toBe('Rome');
		expect(result[1].city).toBe('Paris');
	});

	test('2. Single level subquery should still work', function () {
		var result = alasql('SELECT * FROM cities WHERE city IN (SELECT city FROM countries)');

		expect(result.length).toBe(3);
	});

	test('3. Triple nested subqueries should work', function () {
		alasql(`
			CREATE TABLE level3 (val int);
			INSERT INTO level3 VALUES (89764679009);
		`);

		var result = alasql(
			'SELECT * FROM cities WHERE city IN (SELECT DISTINCT city FROM countries WHERE population IN (SELECT DISTINCT number from population WHERE number IN (SELECT val FROM level3)))'
		);

		expect(result.length).toBe(1);
		expect(result[0].city).toBe('Rome');

		alasql('DROP TABLE IF EXISTS level3');
	});

	test('4. Nested subqueries with NOT IN should work', function () {
		var result = alasql(
			'SELECT * FROM cities WHERE city NOT IN (SELECT DISTINCT city FROM countries WHERE population NOT IN (SELECT DISTINCT number from population))'
		);

		// Should return cities that are either not in countries, or in countries with population in the population table
		expect(result.length > 0).toBe(true);
	});
});
