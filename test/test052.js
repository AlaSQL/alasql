if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 52 - UPPER CASE and LOWER CASE', function () {
	var db1 = new alasql.Database('city');

	it('Upper and lower case in CREATE TABLE Category', function (done) {
		db1.exec('CrEaTe TABle categories (category Int, city strinG)');
		db1.exec('InsERT Into categories values (1,"Rome")');
		db1.exec('insert into categories values (1,"Paris")');
		db1.exec('INSERT INTO categories VAlUES (2, "Moscow")');
		db1.exec('INSERT INTO categories VALues (3, "New York")');
		assert.equal(4, db1.exec('select VALUE COUNT(*) from categories'));
		done();
	});

	it('Upper and lower case in CREATE TABLE City', function (done) {
		db1.exec('CREATE table cities (city String, population int)');
		db1.exec('INSERT INTO cities VALues ("Rome",10)');
		db1.exec('insert into cities values ("Moscow", 12)');
		db1.exec('inseRt iNto cities vAlues ("New York", 16)');
		db1.exec('INSERT into cities values ("Paris", 9)');
		assert.equal(4, db1.exec('select value count(*)from cities'));
		assert.equal(47, db1.exec('select vaLuE suM(population) from cities'));
		done();
	});

	it('Upper and lower case in SELECT with JOIN', function (done) {
		var sql1 =
			'select column population from (SELECT category, ' +
			'SUM(cities.population) as population from categories ' +
			'join cities using city group BY category) T order BY population';
		var sql2 =
			'select column population from (SELECT category, ' +
			'SUM(cities.population) as population from categories ' +
			'join cities using city group by category) t order by population';
		assert.deepEqual([12, 16, 19], db1.exec(sql1));
		assert.deepEqual([12, 16, 19], db1.exec(sql2));
		done();
	});

	it('Upper and lower case in SELECT with JOIN', function (done) {
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

		assert.equal(47, res1);
		assert.equal(47, res2);
		assert.equal(47, res3);
		assert.equal(47, res4);
		done();
	});
});
