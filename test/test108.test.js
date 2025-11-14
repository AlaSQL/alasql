//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Create database', function () {
	test('Create new database', function (done) {
		var db = new alasql.Database();
		assert.deepEqual(db.tables, {});
		done();
	});
});
