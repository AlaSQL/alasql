if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 48 - Check parser for primary and foreign keys', function () {
	describe('PRIMARY KEY', function () {
		it('1: COLUMN PRIMARY KEY', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			done();
		});

		it('2: COLUMN PRIMARY KEY (MySQL style)', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, PRIMARY KEY (a))');
			done();
		});

		it('3: PRIMARY KEY', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, CONSTRAINT keya PRIMARY KEY (a))');
			done();
		});

		it('4: PRIMARY KEY', function (done) {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, CONSTRAINT keyab PRIMARY KEY (a,b))');
			done();
		});
	});

	describe('FOREIGN KEY', function () {
		it('1: FOREIGN KEY', function (done) {
			alasql('DROP TABLE IF EXISTS cities');
			alasql('DROP TABLE IF EXISTS countries');
			alasql('CREATE TABLE countries (country STRING  PRIMARY KEY, b STRING)');
			alasql(
				'CREATE TABLE cities (city STRING, country STRING ' +
					' FOREIGN KEY REFERENCES countries(country))'
			);
			done();
		});

		it('2: FOREIGN KEY (MySQL style)', function (done) {
			alasql('DROP TABLE IF EXISTS cities');
			alasql('DROP TABLE IF EXISTS countries');
			alasql(
				'CREATE TABLE cities (city STRING, country STRING, ' +
					' FOREIGN KEY (country) REFERENCES countries(country))'
			);
			alasql('CREATE TABLE countries (country STRING  PRIMARY KEY, b STRING)');
			done();
		});

		it('3: FOREIGN KEY (MySQL style)', function (done) {
			alasql('DROP TABLE IF EXISTS cities');
			alasql('DROP TABLE IF EXISTS countries');
			alasql(
				'CREATE TABLE cities (city STRING, country STRING, ' +
					' CONSTRAINT keycountry FOREIGN KEY (country) REFERENCES countries(country))'
			);
			alasql('CREATE TABLE countries (country STRING PRIMARY KEY, b STRING)');
			done();
		});
	});
});
