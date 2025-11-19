// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 48 - Check parser for primary and foreign keys', () => {
	describe('PRIMARY KEY', () => {
		test('1: COLUMN PRIMARY KEY', done => {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			done();
		});

		test('2: COLUMN PRIMARY KEY (MySQL style)', done => {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, PRIMARY KEY (a))');
			done();
		});

		test('3: PRIMARY KEY', done => {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, CONSTRAINT keya PRIMARY KEY (a))');
			done();
		});

		test('4: PRIMARY KEY', done => {
			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT, b INT, CONSTRAINT keyab PRIMARY KEY (a,b))');
			done();
		});
	});

	describe('FOREIGN KEY', () => {
		test('1: FOREIGN KEY', done => {
			alasql('DROP TABLE IF EXISTS cities');
			alasql('DROP TABLE IF EXISTS countries');
			alasql('CREATE TABLE countries (country STRING  PRIMARY KEY, b STRING)');
			alasql(
				'CREATE TABLE cities (city STRING, country STRING ' +
					' FOREIGN KEY REFERENCES countries(country))'
			);
			done();
		});

		test('2: FOREIGN KEY (MySQL style)', done => {
			alasql('DROP TABLE IF EXISTS cities');
			alasql('DROP TABLE IF EXISTS countries');
			alasql(
				'CREATE TABLE cities (city STRING, country STRING, ' +
					' FOREIGN KEY (country) REFERENCES countries(country))'
			);
			alasql('CREATE TABLE countries (country STRING  PRIMARY KEY, b STRING)');
			done();
		});

		test('3: FOREIGN KEY (MySQL style)', done => {
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
