// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 36', () => {
	var db;

	test('1. Create Database', done => {
		alasql.options.modifier = undefined;
		db = new alasql.Database('db');
		done();
	});

	test('2. INSERT INTO FROM 1', done => {
		db.exec('CREATE TABLE test1 (a STRING)');

		var sql = "INSERT INTO test1 (a) VALUES ('Alpha'), ('Beta'), ('Gamma'), ('Delta'), ('Epsilon')";
		db.exec(sql);

		var sql = 'SELECT VALUE COUNT(*) FROM test1';
		expect(5).toEqual(db.exec(sql));

		done();
	});
	test('3. INSERT INTO FROM 2', done => {
		db.exec('CREATE TABLE test2 (a STRING)');

		var sql = "INSERT INTO test2 SELECT * FROM test1 WHERE a LIKE '%mm%'";
		db.exec(sql);

		var res = db.exec('SELECT * FROM test2');
		expect([{a: 'Gamma'}]).toEqual(res);

		done();
	});
	test('4. INSERT INTO FROM 3', done => {
		db.exec('CREATE TABLE test3 (a STRING)');

		var sql = "INSERT INTO test3 SELECT * FROM test1 WHERE a NOT LIKE '%e%'";
		db.exec(sql);

		var res = db.exec('SELECT * FROM test3');
		expect(res).toEqual([{a: 'Alpha'}, {a: 'Gamma'}]);

		done();
	});
	test('99. Drop database', done => {
		done();
	});
});
