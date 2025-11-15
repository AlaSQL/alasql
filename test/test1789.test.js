// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testNum = '1789';

describe('Test ' + testNum + ' - joins with subquery', () => {
	test('Join with simple subquery', () => {
		var expected = [
			{a: 'data1_1', b: 'data2_1'},
			{a: 'data1_1', b: 'data2_2'},
			{a: 'data1_2', b: 'data2_1'},
			{a: 'data1_2', b: 'data2_2'},
		];
		var data1 = [{a: 'data1_1'}, {a: 'data1_2'}];
		var data2 = [{b: 'data2_1'}, {b: 'data2_2'}];
		var res = alasql(
			`
        SELECT 
        a.*, b.*
        FROM ( 
            SELECT * FROM ? 
        ) a 
        CROSS JOIN (
            SELECT * FROM ? 
        ) b`,
			[data1, data2]
		);

		expect(res).toEqual(expected);
	});

	test('Join with aggregate in subquery', () => {
		var expected = [
			{outcome: 'pass', n: 2, p: 0.6666666666666666},
			{outcome: 'fail', n: 1, p: 0.3333333333333333},
		];
		var data = [{result: 'pass'}, {result: 'pass'}, {result: 'fail'}];
		var res = alasql(
			`SELECT 
            a.outcome, 
            a.n, 
            a.n/b.n as p
            FROM (
            SELECT 	
                result as outcome, 
                COUNT(*) AS n 
            FROM ? 
            GROUP BY result
            ) a 
            CROSS JOIN (
                SELECT COUNT(*) as n FROM ?
            ) b`,
			[data, data]
		);

		expect(res).toEqual(expected);
	});
});
