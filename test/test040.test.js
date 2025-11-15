// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 40', () => {
	var db;
	test('Prepare database', done => {
		db = new alasql.Database('db');
		db.exec('CREATE TABLE one (a INT, b FLOAT)');
		db.exec('INSERT INTO one VALUES (-1,-10.1),(-2,-20.2345678),(3,30.12), (-4,40.00)');
		done();
	});

	describe('Float numbers', () => {
		test('Float and negative numbers', done => {
			var res = db.exec('SELECT a,b,-1.1*a AS c FROM one ORDER BY a');
			//			console.log();
			expect(4.4).toEqual(res[0].c);
			done();
		});
	});

	describe('Strings', () => {
		test('Strings with single and double quaters', done => {
			db.exec('CREATE TABLE five (a STRING)');
			db.exec('INSERT INTO five VALUES ("One")');
			db.exec("INSERT INTO five VALUES ('Two')");
			var res = db.exec('SELECT COLUMN a FROM five');
			//			console.log();
			expect(res).toEqual(['One', 'Two']);
			done();
		});
	});

	describe('Strings', () => {
		test('Strings with single and double quaters like keywords', done => {
			alasql('create database test40; use test40');
			alasql('CREATE TABLE six (a STRING)');
			alasql('INSERT INTO six VALUES ("One")');
			alasql("INSERT INTO six VALUES ('Two')");
			var res = alasql("SELECT a, 'into', 'as' FROM six");
			//			console.log();
			expect(res).toEqual([
				{"'into'": 'into', "'as'": 'as', a: 'One'},
				{"'into'": 'into', "'as'": 'as', a: 'Two'},
			]);
			alasql('drop database test40');
			done();
		});
	});
});
