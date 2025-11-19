// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 138 NoSQL', () => {
	test('1. deepCopy', done => {
		alasql('CREATE DATABASE test138; use test138');

		//		var res = alasql('SELECT COLUMN deepCopy(a) FROM @[{a:[1,2]}, {a:[3,4]}]');
		//		expect(res).toEqual([[1,2],[3,4]);

		var ar = [{a: [1, 2]}, {a: [3.4]}];
		var res = alasql('SELECT COLUMN a FROM ?', [ar]);
		expect(res).toEqual([[1, 2], [3.4]]);

		var ar = [{a: [1, 2]}, {a: [3.4]}];
		var res = alasql('SELECT a FROM ?', [ar]);
		ar[0].a = [5, 6];
		//expect(res).toEqual([{a:[5,6]},{a:[3.4]}]);
		expect(ar).toEqual([{a: [5, 6]}, {a: [3.4]}]);

		var ar = [{a: [1, 2]}, {a: [3, 4]}];
		var res = alasql('SELECT COLUMN cloneDeep(a) FROM ?', [ar]);
		expect(res).toEqual([
			[1, 2],
			[3, 4],
		]);
		ar[0].a = [5, 6];
		expect(res).toEqual([
			[1, 2],
			[3, 4],
		]);

		var ar = [{a: [[1, 2], 2]}, {a: [3, 4]}];
		var res = alasql('SELECT a->0 AS q FROM ? WHERE a->1 = 2', [ar]);
		expect(res).toEqual([{q: [1, 2]}]);
		ar[0].a = 7;
		expect(res[0].q).toEqual([1, 2]);

		var ar = [{a: [[1, 2], 2]}, {a: [3, 4]}];
		var res = alasql('SELECT VALUE cloneDeep(a->0) FROM ? WHERE a->1 = 2', [ar]);
		expect(res).toEqual([1, 2]);
		ar[0].a[0] = 7;
		expect(res).toEqual([1, 2]);

		done();
	});

	test('2. Get JSON property operator', done => {
		alasql('CREATE TABLE one');

		alasql('INSERT INTO one VALUES @{a:2}, @(?)', [{a: 4}]);

		var res = alasql('SELECT COLUMN a FROM one');
		expect(res).toEqual([2, 4]);

		done();
	});

	if (false) {
		test('3. GROUP functions', done => {
			alasql('CREATE TABLE two (a INT, b INT)');
			alasql('INSERT INTO two VALUES (1,1), (1,2), (1,3), (2,1), (2,2)');
			alasql('SELECT a, SUM(b) AS b1, COUNT(*) AS c1, GROUP(b1/c1) AS avg FROM two GROUP BY a');
			expect(res).toEqual([
				{a: 1, b1: 6, c1: 3, avg: 2},
				{a: 2, b1: 3, c1: 2, avg: 1.5},
			]);

			var res = alasql('SELECT SUM(b) AS bb FROM two GROUP BY TOTAL');
			expect(res).toEqual([{bb: 9}]);

			var res = alasql('SELECT SUM(b) AS bb FROM two GROUP BY TOTAL()');
			expect(res).toEqual([{bb: 9}]);

			var res = alasql('SELECT a,SUM(b) AS bb,b FROM two GROUP BY TOTAL(a,DETAIL) ORDER BY a,bb,b');
			expect(res).toEqual([
				{a: undefined, bb: 9},
				{a: 1, bb: 6, b: undefined},
				{a: 1, bb: undefined, b: 1},
				{a: 1, bb: undefined, b: 2},
				{a: 1, bb: undefined, b: 3},
				{a: 2, bb: 3, b: undefined},
				{a: 2, bb: undefined, b: 1},
				{a: 2, bb: undefined, b: 2},
			]);

			var res = alasql(
				'SELECT a,SUM(b) AS b, LEVEL() as level FROM two GROUP BY TOTAL(a,DETAIL) ORDER BY a,bb,b'
			);
			expect(res).toEqual([
				{a: undefined, b: 9, level: 0},
				{a: 1, bb: 6, b: undefined},
				{a: 1, bb: undefined, b: 1},
				{a: 1, bb: undefined, b: 2},
				{a: 1, bb: undefined, b: 3},
				{a: 2, bb: 3, b: undefined},
				{a: 2, bb: undefined, b: 1},
				{a: 2, bb: undefined, b: 2},
			]);

			done();
		});

		test('4. Dimension', done => {
			alasql('CREATE TABLE expense (deptid string, amt MONEY)');
			alasql('CREATE TABLE dept (deptid string, parentid string, level int)');
			alasql('PREPARE DIM dept');
			alasql(
				'SELECT deptid, deptname, SUM(amt) AS amt FROM expense JOIN dept USING deptid ' +
					'GROUP BY DIM(deptid, dept)'
			);
			done();
		});
	}

	test('4. CREATE TABLE for JSON objects', done => {
		alasql('CREATE TABLE three (a JSON); INSERT INTO three VALUES (@{v:10})');
		var res = alasql('SELECT VALUE a FROM three');
		expect(res).toEqual({v: 10});

		alasql('CREATE TABLE four; INSERT INTO four VALUES @{a:{v:10}}');
		var res = alasql('SELECT VALUE a FROM four');
		expect(res).toEqual({v: 10});

		done();
	});

	test('5. Get JSON param values in sub-arrays', done => {
		alasql('DROP DATABASE test138');
		done();
	});
});
