// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 38', () => {
	describe('LEFT AND RIGHT JOINS', () => {
		var db;
		test('Prepare database', done => {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a INT, b INT)');
			db.exec('INSERT INTO one VALUES (1,10),(2,20),(3,30), (4,40)');

			db.exec('CREATE TABLE two (e INT, f INT)');
			db.exec('INSERT INTO two VALUES (1,100),(2,200),(3,300), (1000,1000), (2000,2000)');

			db.exec('CREATE TABLE three (g INT, h INT)');
			db.exec('INSERT INTO three VALUES (200,2000), (1000,10000),(2000,20000), (3000,30000)');
			done();
		});

		test('1x LEFT JOIN', done => {
			var res = db.exec('SELECT * FROM one LEFT JOIN two ON one.a = two.e');
			expect(res.length).toEqual(4);
			done();
		});

		test('1x RIGHT JOIN', done => {
			var res = db.exec('SELECT * FROM two RIGHT JOIN one ON one.a = two.e');
			expect(res.length).toEqual(4);
			done();
		});

		test('2x LEFT JOIN', done => {
			var res = db.exec(
				'SELECT * FROM one ' +
					' LEFT JOIN two ON one.a = two.e' +
					' LEFT JOIN three ON two.f = three.g'
			);
			expect(res.length).toEqual(4);
			done();
		});
		/*
		test('2x RIGHT JOIN', function(done){
			var res = db.exec("SELECT * FROM three "+
				" RIGHT JOIN two ON two.f = three.g"+
				" RIGHT JOIN one ON one.a = two.e" );
/// console.table(res);
			expect(res.length).toEqual(4);
			done();
		});
*/
		/*
		test('2x RIGHT JOIN', function(done){
			var res = db.exec("SELECT * FROM one "+
				" OUTER JOIN two ON one.a = two.e "+
				" OUTER JOIN three ON two.f = three.g " );
/// console.table(res);
			expect(res.length).toEqual(2);
			done();
		});
*/
		test('2x INNER JOIN', done => {
			var res = db.exec(
				'SELECT * FROM one ' + ' JOIN two ON one.a = two.e' + ' JOIN three ON two.f = three.g'
			);
			expect(res.length).toEqual(1);
			done();
		});

		test('2x INNER JOIN', done => {
			var res = db.exec(
				'SELECT * FROM three ' +
					' INNER JOIN two ON three.g = two.f' +
					' INNER JOIN one ON two.e = one.a'
			);
			expect(res.length).toEqual(1);
			done();
		});
	});
});
