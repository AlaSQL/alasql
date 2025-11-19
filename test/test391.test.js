// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
//	var DOMStorage = require("dom-storage");
//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });

/*
 This sample beased on this article:

*/

describe('Test 391 MIN() and MAX() undefined value (issue #474)', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test391;USE test391');
		done();
	});

	test('2. Prepare test data', done => {
		var data = [{a: 1}, {a: -1}, {a: 3}, {a: -3}, {a: 5}, {a: -7.8}];
		var res = alasql('ROW OF SELECT MIN(a), MAX(a) FROM ?', [data]);
		expect(res).toEqual([-7.8, 5]);

		var res = alasql(
			'ROW OF SELECT MIN(a), MAX(a) FROM @[{a:1}, {a:(-1)}, {a:3}, {a:(-3)}, {a:5}, {a:(-7.8)}]'
		);
		expect(res).toEqual([-7.8, 5]);

		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test391');
		done();
	});
});
