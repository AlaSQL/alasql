// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('377. Quotes and ASCII', () => {
	test('1. ', done => {
		var res = alasql('SELECT ASCII("")');
		//console.log('The test is not completed',res);

		// Add the test!!!

		//        expect(success).toBe(true);
		done();
	});
});
