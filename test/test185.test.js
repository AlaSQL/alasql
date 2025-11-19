// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 185 - IN Expression', () => {
	test('1. IN Field', done => {
		var data = [
			{a: [1, 2, 3, 4, 1, 2, 2, 3], b: 1},
			{a: [10], b: 10},
		];
		var res = alasql('SELECT * FROM ? WHERE 1 IN a', [data]);
		expect(res).toEqual([{a: [1, 2, 3, 4, 1, 2, 2, 3], b: 1}]);
		//      console.log(res);
		var res = alasql('SELECT * FROM ? WHERE b IN a', [data]);
		expect(res).toEqual([
			{a: [1, 2, 3, 4, 1, 2, 2, 3], b: 1},
			{a: [10], b: 10},
		]);
		//      console.log(res);
		var res = alasql('SELECT * FROM ? WHERE b IN @(a)', [data]);
		expect(res).toEqual([
			{a: [1, 2, 3, 4, 1, 2, 2, 3], b: 1},
			{a: [10], b: 10},
		]);
		//      console.log(res);
		//      console.log(alasql.parse('SELECT * FROM ? WHERE 1 IN a').statements[0].where.expression.right);

		//      expect(res).toEqual({"1":[1,1],"2":[2,2,2],"3":[3,3],"4":[4]});
		done();
	});
	test('1. REDUCE Aggregator: Summa', done => {
		var data = [
			{a: [1, 2, 3, 4, 1, 2, 2, 3], b: 1},
			{a: [10], b: 10},
		];
		alasql.aggr.Summa = function (v, s, stage) {
			if (stage == 1) {
				return v;
			} else if (stage == 2) {
				return v + s;
			} else {
				return s;
			}
		};
		var res = alasql('VALUE OF SELECT Summa(b) FROM ?', [data]);
		expect(res == 11).toBe(true);

		done();
	});
	test('2. REDUCE Aggregator: Concat', done => {
		alasql.aggr.Concat = function (v, s, stage) {
			if (stage == 1) {
				return v;
			} else if (stage == 2) {
				return s.concat(v);
			} else {
				return s;
			}
		};
		var a1 = [
			{a: 1, b: [1, 2, 3]},
			{a: 2, b: [4, 5]},
			{a: 1, b: [1, 2, 3, 4]},
		];
		var res = alasql('SELECT a,Concat(b),COUNT(*) FROM ? GROUP BY a', [a1]);

		expect(res).toEqual([
			{a: 1, 'Concat(b)': [1, 2, 3, 1, 2, 3, 4], 'COUNT(*)': 2},
			{a: 2, 'Concat(b)': [4, 5], 'COUNT(*)': 1},
		]);
		done();
	});
});
