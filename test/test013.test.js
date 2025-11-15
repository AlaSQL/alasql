// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 13', () => {
	test('Transactions', done => {
		var db = new alasql.Database('mydb');

		db.exec('CREATE TABLE students (studentid INT, studentname STRING)');

		for (var i = 0; i < 1000; i++) {
			db.exec("INSERT INTO students VALUES (2,'Peter Peterson')");
		}
		var res = db.exec('SELECT VALUE COUNT(*) FROM students');
		expect(res).toEqual(1000);

		db.transaction(function (tx) {
			for (var i = 0; i < 1000; i++) {
				tx.exec("INSERT INTO students VALUES (3,'Alemu Abebe')");
			}
			//console.log(1);
			var res = tx.exec('SELECT VALUE COUNT(*) FROM students');
			expect(res).toEqual(2000);

			tx.rollback();

			var res = tx.exec('SELECT VALUE COUNT(*) FROM students');
			expect(res).toEqual(1000);

			done();
		});
	});
});
