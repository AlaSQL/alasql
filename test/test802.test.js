// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testId = '802'; // insert test file number

describe('Test ' + testId + ' - ORDER BY does not support parameter #1100', () => {
	test('1. Prepare database', done => {
		alasql('CREATE TABLE example1 (a INT, b INT)');
		alasql.tables.example1.data = [
			{a: 2, b: 6},
			{a: 3, b: 4},
			{a: 1, b: 5},
		];
		done();
	});

	test('2. Async ORDERBY operation works without argument', done => {
		//
		alasql.promise('SELECT * FROM example1 ORDER BY b').then(function (res) {
			expect(res).toEqual([
				{
					a: 3,
					b: 4,
				},
				{
					a: 1,
					b: 5,
				},
				{
					a: 2,
					b: 6,
				},
			]);
			done();
		});
	});

	test('3. Async ORDERBY operation works with arguments passed', done => {
		//
		alasql.promise('SELECT * FROM example1 ORDER BY ?', ['b']).then(function (res) {
			expect(res).toEqual([
				{
					a: 3,
					b: 4,
				},
				{
					a: 1,
					b: 5,
				},
				{
					a: 2,
					b: 6,
				},
			]);
			done();
		});
	});
});
