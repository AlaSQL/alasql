// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 39', function () {
	describe('Negative numbers', function () {
		var db;
		test('Prepare database', function (done) {
			db = new alasql.Database('db');

			db.exec('CREATE TABLE one (a INT, b INT)');
			db.exec('INSERT INTO one VALUES (-1,-10),(-2,-20),(3,30), (-4,40)');
			done();
		});

		test('Negative numbers', function (done) {
			var res = db.exec('SELECT a,b,-1*a AS c FROM one  WHERE b < -15 ORDER BY a');
			assert.deepEqual(res, [{a: -2, b: -20, c: 2}]);
			done();
		});
	});
});
