// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 37', () => {
	describe('JOINS', () => {
		alasql('create database test37; use test37');
		//		var db = alasql.Database("db");

		test('Prepare database', done => {
			alasql('drop table if exists one;drop table if exists two;');
			alasql('CREATE TABLE one (a INT, b INT)');
			alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30), (4,40)');

			alasql('CREATE TABLE two (e INT, f INT)');
			alasql('INSERT INTO two VALUES (1,100),(2,200),(3,300), (1000,1000), (2000,2000)');
			done();
		});
		test('CROSS JOIN', done => {
			var res = alasql('SELECT * FROM one, two');
			expect(res.length).toEqual(20);
			done();
		});

		test('INNER JOIN', done => {
			var res = alasql('SELECT * FROM one INNER JOIN two ON one.a = two.e');
			expect(res.length).toEqual(3);
			done();
		});

		test('LEFT JOIN', done => {
			var res = alasql('SELECT * FROM one LEFT JOIN two ON one.a = two.e');
			expect(res.length).toEqual(4);
			done();
		});

		test('SEMI JOIN', done => {
			var res = alasql('SELECT * FROM one SEMI JOIN two ON one.a = two.e');
			expect(res.length).toEqual(1);
			done();
		});

		test('RIGHT JOIN', done => {
			var res = alasql('SELECT * FROM one RIGHT JOIN two ON one.a = two.e');
			expect(res.length).toEqual(5);
			done();
		});

		test('OUTER JOIN', done => {
			var res = alasql('SELECT * FROM one OUTER JOIN two ON one.a = two.e');
			expect(res.length).toEqual(6);
			done();
		});

		test('ANTI JOIN', done => {
			var res = alasql('SELECT * FROM one ANTI JOIN two ON one.a = two.e');
			expect(res.length).toEqual(2);
			done();
		});

		alasql('drop database test37');
	});
});
