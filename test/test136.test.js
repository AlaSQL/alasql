// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

if (false) {
	describe('Test 136 get JSON property', function () {
		test('1. Get element of object and Array', function (done) {
			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b->[1] = 4');
			assert.deepEqual(res, [{a: 1, b: [3, 4]}]);

			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b == JSON([3,4])');
			assert.deepEqual(res, [{a: 1, b: [3, 4]}]);

			var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE e = 1');
			assert.deepEqual(res, [{e: 1}]);

			done();
		});
	});
}
