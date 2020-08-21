if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 51 - Foreign Keys)', function () {
	if (false) {
		describe('FOREIGN KEYS with one component and PRIMARY KEY', function () {
			it('CREATE TABLE with FOREIGN KEYS and INSERT', function (done) {
				alasql('DROP TABLE IF EXISTS persons');
				alasql('DROP TABLE IF EXISTS citiess');
				alasql(
					'CREATE TABLE persons (name STRING, city STRING, FOREIGN KEY (city) REFERENCES cities(city))'
				);
				alasql('CREATE TABLE cities (city STRING PRIMARY KEY)');
				alasql('INSERT INTO cities VALUES ("Paris")');
				alasql('INSERT INTO cities VALUES ("Rome")');
				alasql('INSERT INTO persons VALUES ("Peter", "Rome")');
				alasql('INSERT INTO persons VALUES ("Telma", "Paris")');
				var res = alasql.queryValue('SELECT COUNT (*) FROM cities');
				assert.equals(res, 2);
				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 2);
				done();
			});

			it('Insert wrong data without references', function (done) {
				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Berlin")');
				});
				done();
			});

			it('UPDATE wrong data without references', function (done) {
				assert.throws(function () {
					alasql('UPDATE persons SET city = "Warsaw" WHERE name = "Peter"');
				});
				done();
			});
		});

		describe('FOREIGN KEYS with one component without PRIMARY KEY', function () {
			it('The same, but without PRIMARY KEY', function (done) {
				alasql('DROP TABLE IF EXISTS persons');
				alasql('DROP TABLE IF EXISTS citiess');
				alasql(
					'CREATE TABLE persons (name STRING, city STRING, FOREIGN KEY (city) REFERENCES cities(city))'
				);
				alasql('CREATE TABLE cities (city STRING)');
				alasql('INSERT cities VALUES ("Paris")');
				alasql('INSERT cities VALUES ("Rome")');
				alasql('INSERT INTO persons VALUES ("Peter", "Rome")');
				alasql('INSERT INTO persons VALUES ("Telma", "Paris")');
				var res = alasql.queryValue('SELECT COUNT (*) FROM cities');
				assert.equals(res, 2);
				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 2);

				done();
			});

			it('Insert wrong data without references', function (done) {
				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Berlin")');
				});
				done();
			});

			it('UPDATE wrong data without references', function (done) {
				assert.throws(function () {
					alasql('UPDATE persons SET city = "Warsaw" WHERE name = "Peter"');
				});
				done();
			});
		});

		describe('FOREIGN KEYS with two components and PRIMARY KEY', function () {
			it('CREATE TABLE with FOREIGN KEYS and INSERT', function (done) {
				alasql('DROP TABLE IF EXISTS persons');
				alasql('DROP TABLE IF EXISTS citiess');
				alasql(
					'CREATE TABLE persons (name STRING, country STRING, city STRING,' +
						' FOREIGN KEY (country, city) REFERENCES cities(country, city))'
				);
				alasql('CREATE TABLE cities (country STRING, city STRING, PRIMARY KEY(country, city))');
				alasql('INSERT INTO cities VALUES ("France","Paris")');
				alasql('INSERT INTO cities VALUES ("Italy","Rome")');
				alasql('INSERT INTO persons VALUES ("Peter", "Italy","Rome")');
				alasql('INSERT INTO persons VALUES ("Telma", "France","Paris")');
				var res = alasql.queryValue('SELECT COUNT (*) FROM cities');
				assert.equals(res, 2);
				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 2);
				done();
			});

			it('Insert wrong data without references', function (done) {
				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Germany","Berlin")');
				});

				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Italy","Berlin")');
				});

				alasql('INSERT INTO persons VALUES ("Angela", "Italy","Rome")');

				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 3);

				done();
			});

			it('UPDATE wrong data without references', function (done) {
				assert.throws(function () {
					alasql('UPDATE persons SET city = "Warsaw" WHERE name = "Peter"');
				});

				assert.throws(function () {
					alasql('UPDATE persons SET country = "Poland" WHERE name = "Peter"');
				});
				done();
			});
		});

		describe('FOREIGN KEYS with two components and without PRIMARY KEY', function () {
			it('CREATE TABLE with FOREIGN KEYS and INSERT', function (done) {
				alasql('DROP TABLE IF EXISTS persons');
				alasql('DROP TABLE IF EXISTS citiess');
				alasql(
					'CREATE TABLE persons (name STRING, country STRING, city STRING,' +
						' FOREIGN KEY (country, city) REFERENCES cities(country, city))'
				);
				alasql('CREATE TABLE cities (country STRING, city STRING, PRIMARY KEY(country, city))');
				alasql('INSERT INTO cities VALUES ("France","Paris")');
				alasql('INSERT INTO cities VALUES ("Italy","Rome")');
				alasql('INSERT INTO persons VALUES ("Peter", "Italy","Rome")');
				alasql('INSERT INTO persons VALUES ("Telma", "France","Paris")');
				var res = alasql.queryValue('SELECT COUNT (*) FROM cities');
				assert.equals(res, 2);
				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 2);
				done();
			});

			it('Insert wrong data without references', function (done) {
				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Germany","Berlin")');
				});

				assert.throws(function () {
					alasql('INSERT INTO persons VALUES ("Angela", "Italy","Berlin")');
				});

				alasql('INSERT INTO persons VALUES ("Angela", "Italy","Rome")');

				var res = alasql.queryValue('SELECT COUNT (*) FROM persons');
				assert.equals(res, 3);

				done();
			});

			it('UPDATE wrong data without references', function (done) {
				assert.throws(function () {
					alasql('UPDATE persons SET city = "Warsaw" WHERE name = "Peter"');
				});

				assert.throws(function () {
					alasql('UPDATE persons SET country = "Poland" WHERE name = "Peter"');
				});
				done();
			});
		});
	}
});
