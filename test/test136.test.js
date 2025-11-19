// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

if (false) {
	describe('Test 136 get JSON property', () => {
		test('1. Get element of object and Array', done => {
			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b->[1] = 4');
			expect(res).toEqual([{a: 1, b: [3, 4]}]);

			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b == JSON([3,4])');
			expect(res).toEqual([{a: 1, b: [3, 4]}]);

			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE e = 1');
			expect(res).toEqual([{e: 1}]);

			done();
		});
	});
}
