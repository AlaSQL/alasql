// Test for nested subqueries - Issue: Nested SubQueries do not work as expected
if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 847 - Nested Subqueries', function () {
	before(function () {
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

	after(function () {
		alasql(`
			DROP TABLE IF EXISTS cities;
			DROP TABLE IF EXISTS countries;
			DROP TABLE IF EXISTS population;
		`);
	});

	it('1. Nested subqueries in IN clause should work', function () {
		var result = alasql(
			'SELECT * FROM cities WHERE city IN (SELECT DISTINCT city FROM countries WHERE population IN (SELECT DISTINCT number from population))'
		);

		assert.equal(result.length, 2, 'Should return 2 cities');
		assert.equal(result[0].city, 'Rome', 'First city should be Rome');
		assert.equal(result[1].city, 'Paris', 'Second city should be Paris');
	});

	it('2. Single level subquery should still work', function () {
		var result = alasql('SELECT * FROM cities WHERE city IN (SELECT city FROM countries)');

		assert.equal(result.length, 3, 'Should return 3 cities');
	});

	it('3. Triple nested subqueries should work', function () {
		alasql(`
			CREATE TABLE level3 (val int);
			INSERT INTO level3 VALUES (89764679009);
		`);

		var result = alasql(
			'SELECT * FROM cities WHERE city IN (SELECT DISTINCT city FROM countries WHERE population IN (SELECT DISTINCT number from population WHERE number IN (SELECT val FROM level3)))'
		);

		assert.equal(result.length, 1, 'Should return 1 city');
		assert.equal(result[0].city, 'Rome', 'City should be Rome');

		alasql('DROP TABLE IF EXISTS level3');
	});

	it('4. Nested subqueries with NOT IN should work', function () {
		var result = alasql(
			'SELECT * FROM cities WHERE city NOT IN (SELECT DISTINCT city FROM countries WHERE population NOT IN (SELECT DISTINCT number from population))'
		);

		// Should return cities that are either not in countries, or in countries with population in the population table
		assert(result.length > 0, 'Should return some results');
	});
});
