// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 42', () => {
	describe('MID function', () => {
		var db;
		test('MID Function', done => {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a STRING, b FLOAT)');
			db.exec('INSERT INTO one VALUES ("One", 1.234),("Two", 2.9876443343),("Three", 3.3322343)');
			var res = db.exec('SELECT COLUMN MID(a,2,2) AS b FROM one');
			expect(res).toEqual(['ne', 'wo', 'hr']);
			done();
		});

		test('ROUND Function', done => {
			var res = db.exec('SELECT COLUMN ROUND(b) AS b FROM one');
			expect(res).toEqual([1, 3, 3]);

			var res = db.exec('SELECT COLUMN ROUND(b,1) AS b FROM one');
			expect(res).toEqual([1.2, 3.0, 3.3]);

			done();
		});
	});
});
