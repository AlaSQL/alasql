//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Create database', () => {
	test('Create new database', done => {
		var db = new alasql.Database();
		expect(db.tables).toEqual({});
		done();
	});
});
