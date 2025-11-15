// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 610 - SQL added user defined function', () => {
	test('A) Sync', () => {
		var res = alasql(
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``;select VALUE abc(2); CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``;select value abc(2);'
		);
		expect(res).toEqual([1, 4, 1, 8]);
	});

	test('B) Async', done => {
		//
		alasql([
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``',
			'SELECT VALUE abc(2)',
			'CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``',
			'SELECT VALUE abc(2)',
		]).then(function (res) {
			expect(res).toEqual([1, 4, 1, 8]);
			done();
		});
	});
});
