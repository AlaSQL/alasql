// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (false) {
	// Functionality discontinued
	// AG 20.04.2015
	describe('Test 222 TD TH syntax', () => {
		test('1. TD', done => {
			alasql('SELECT _ TD {className:"red"} FROM RANGE(1,2)');
			done();
		});
	});
}
