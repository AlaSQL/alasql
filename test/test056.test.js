// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 56 - Error in WHERE and preIndex with ParamValue', () => {
	var q = [];
	var n = 10000;
	for (var i = 0; i < n; i++) {
		q.push({a: i, b: (Math.random() * 1000) | 0});
	}

	test('SELECT - order by "', done => {
		var w = alasql('SELECT q.* FROM ? q ORDER BY b', [q]);
		expect(w.length == n).toBe(true);
		done();
	});
});
