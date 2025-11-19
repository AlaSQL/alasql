// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 39', () => {
	describe('Negative numbers', () => {
		var db;
		test('Prepare database', done => {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a INT, b INT)');
			db.exec('INSERT INTO one VALUES (-1,-10),(-2,-20),(3,30), (-4,40)');
			done();
		});

		test('Negative numbers', done => {
			var res = db.exec('SELECT a,b,-1*a AS c FROM one  WHERE b < -15 ORDER BY a');
			expect(res).toEqual([{a: -2, b: -20, c: 2}]);
			done();
		});
	});
});
