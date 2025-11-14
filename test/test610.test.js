// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 610 - SQL added user defined function', function () {
	test('A) Sync', function () {
		var res = alasql(
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``;select VALUE abc(2); CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``;select value abc(2);'
		);
		assert.deepEqual(res, [1, 4, 1, 8]);
	});

	test('B) Async', function (done) {
		//
		alasql([
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``',
			'SELECT VALUE abc(2)',
			'CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``',
			'SELECT VALUE abc(2)',
		]).then(function (res) {
			assert.deepEqual(res, [1, 4, 1, 8]);
			done();
		});
	});
});
