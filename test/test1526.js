// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 1645', function () {
	test('Captures error when callback for user function error', done => {
		try {
			alasql('SELECT medain(8) ', (data, err) => {
				if (err) done();
			});
		} catch (e) {
			throw 'error';
		}
	});

	test('Throws error when callback for user function error', done => {
		try {
			alasql('SELECT medain(8)');
			throw 'error'; // Should not reach here
		} catch (e) {
			done();
		}
	});

	test('Catches error when promise for user function error', done => {
		alasql.promise('SELECT medain(8)').catch(() => done());
	});
});
