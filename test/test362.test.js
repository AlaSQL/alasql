// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 362 IF() and IIF()', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test362;USE test362');
		done();
	});

	test('2. TEST', done => {
		var res = alasql('VALUE OF SELECT IIF(1>2,2,3)');
		expect(res).toEqual(3);
		var res = alasql('VALUE OF SELECT IF(1>2,2,3)');
		expect(res).toEqual(3);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test362');
		done();
	});
});
