// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 55 - Error in WHERE and preIndex with ParamValue', function () {
	test('SELECT - gives "Cannot find indices of undefined"', function (done) {
		var q = [];
		for (var i = 0; i < 100000; i++) {
			q.push({a: i, b: (Math.random() * 1000) | 0});
		}

		alasql('SELECT * FROM ? WHERE b=500', [q]);

		done();
	});
});
