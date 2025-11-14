// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 60 - Other minor', function () {
	test('DEAFAULT', function (done) {
		alasql('DROP TABLE IF EXISTS test');
		alasql('CREATE TABLE test (a INT, b INT DEFAULT 100)');
		done();
	});

	test('USE DATABASE', function (done) {
		alasql('INSERT INTO test (a) VALUES (5)');
		done();
	});

	test('SELECT INTO and INTO SELECT', function (done) {
		alasql('drop table if exists cities');
		alasql('create table cities (name string)');
		alasql('insert into cities values ("Moscow"),("Roma"),("Minsk")');

		alasql('create table towns (name string)');
		alasql('insert into towns values ("New York"),("London"),("Paris")');

		alasql('create table capitals (name string)');
		alasql('insert into capitals select * from cities');
		alasql('select * into capitals from cities');

		alasql('select * from capitals');
		done();
	});
});
