// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 57 - Params and Subqueries in JOIN', function () {
	/*if (false) {
		var data1 = [{a: 1}, {a: 2}];
		var data2 = [
			{a: 1, b: 1},
			{a: 2, b: 2},
		];
		var data3 = [
			{b: 1, b: 100},
			{b: 2, c: 200},
		];

		test('SELECT - JOIN ParamValue queries "', function (done) {
			var res = alasql('SELECT * FROM ? data1 JOIN ? data2 USING a JOIN ? data3 USING b', [
				data1,
				data2,
				data3,
			]);
			/// console.log(res);
			done();
		});

		test('SELECT - JOIN SubQueries "', function (done) {
			var res = alasql('SELECT * FROM ? data1 JOIN (SELECT 1 AS a, 100 AS b) data2 USING a', [
				data1,
			]);
			/// console.log(res);
			done();
		});

		test('SELECT - JOIN ParamValue queries "', function (done) {
			var res = alasql(
				'SELECT * FROM ? data1 JOIN (SELECT * FROM ?) data2 USING a JOIN (SELECT * FROM ?) data3 USING b',
				[data1, data2, data3]
			);
			/// console.log(res);
			done();
		});
	}*/
});
