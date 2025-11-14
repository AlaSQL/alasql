// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('377. Quotes and ASCII', function () {
	test('1. ', function (done) {
		var res = alasql('SELECT ASCII("")');
		//console.log('The test is not completed',res);

		// Add the test!!!

		//        assert(success);
		done();
	});
});
