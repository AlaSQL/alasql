// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 249 - NULL as null', () => {
	// This test should be failed, because AlaSQL supports 'undefined'

	test('1. Simple NULL value', done => {
		var res = alasql('SELECT VALUE NULL');
		expect(res === undefined).toBe(true);

		done();
	});
});
