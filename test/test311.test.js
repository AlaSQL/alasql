// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 311 Special SEARCHors', () => {
	test.skip('0. Create database ', done => {
		alasql('CREATE DATABASE test311;USE test311');
		done();
	});

	test.skip('1. SEARCH DISTINCT, UNION ALL, and other selectors', done => {
		//    var res = alasql.parse('CREATE GRAPH #Andrey');
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 3, b: 30},
			{a: 4, b: 40},
			{a: 5, b: 50},
			{a: 5, b: 50},
		];
		var res = alasql('SEARCH DISTINCT(/b) FROM ?', [data]);
		expect(res).toEqual([10, 20, 30, 40, 50]);
		var res = alasql('SEARCH UNION ALL(/a,/b) FROM ?', [data]);
		expect(res).toEqual([1, 2, 3, 4, 5, 5, 10, 20, 30, 40, 50, 50]);
		// Ala UNION
		var res = alasql('SEARCH DISTINCT(UNION ALL(/a,/b)) FROM ?', [data]);
		expect(res).toEqual([1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);

		var res = alasql('SEARCH UNION(/a,/b) FROM ?', [data]);
		expect(res).toEqual([1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);

		//
		/*
    var res = alasql('SEARCH INTERSECT(a,b)');
    var res = alasql('SEARCH EXCEPT(a,b)');
    var res = alasql('SEARCH CROSS JOIN(a,b,c)');
    var res = alasql('SEARCH MERGE(@a,@b)');
    var res = alasql('SEARCH DELETE(@a,@b)'); // properties
    var res = alasql('SEARCH REMOVE(@a,@b)'); // graphs
    var res = alasql('SEARCH RETURNS(a AS b, b+1 AS c)'); // graphs

// Post processors

    var res = alasql('SEARCH ORDER BY() '); // graphs

    var res = alasql('SEARCH EVEN()'); // graphs
    var res = alasql('SEARCH ODD()'); // graphs
    var res = alasql('SEARCH NTH(2)'); // graphs -??
    var res = alasql('SEARCH SLICE(2,2)'); // graphs -??

// selector ORDER BY (a,b,c)

    console.log(res);
*/
		done();
	});

	test.skip('99. Drop database ', done => {
		alasql('DROP DATABASE test311');
		done();
	});
});
