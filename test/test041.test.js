// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 41', () => {
	describe('CASE WHEN THEN ELSE END', () => {
		var db;
		test('1. CASE Expression WHEN THEN END', done => {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a INT, d INT)');
			db.exec('INSERT INTO one VALUES (1,10),(2,20),(3,30),(4,40),(5,50)');

			//			var ast = alasql.parse("SELECT (CASE a WHEN 2 THEN 20 ELSE 30 END) AS b FROM one");
			var res = db.exec('SELECT CASE a WHEN 2 THEN 20 ELSE 30 END AS b FROM one');
			expect(30).toEqual(res[0].b);
			expect(20).toEqual(res[1].b);
			done();
		});

		test('2. CASE and default table (test for defcols)', done => {
			db.exec('CREATE TABLE two (a INT, e INT)');
			db.exec('INSERT INTO two VALUES (1,10),(2,20),(3,30),(4,40),(5,50)');
			expect(() => {
				var res = db.exec(
					'SELECT CASE a WHEN 2 THEN 20 ELSE 30 END AS b FROM one JOIN two USING a'
				);
			}).toThrow(Error);

			var res = alasql.utils.flatArray(
				db.exec('SELECT CASE d WHEN 20 THEN 2000 ELSE 3000 END AS b FROM one JOIN two USING a')
			);
			expect(res).toEqual([3000, 2000, 3000, 3000, 3000]);
			var res = alasql.utils.flatArray(
				db.exec('SELECT CASE e WHEN 30 THEN 2000 ELSE 3000 END AS b FROM one JOIN two USING a')
			);
			expect(res).toEqual([3000, 3000, 2000, 3000, 3000]);
			done();
		});
	});
});
