//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('SELECT #01', () => {
	test('Select *', done => {
		var db = new alasql.Database();
		db.tables.one = {};
		db.tables.one.data = [
			{two: 1, three: 2},
			{two: 4, three: 5},
		];
		var res = db.exec('SELECT * FROM one');
		expect(db.tables.one.data).toEqual(res);
		done();
	});
});
