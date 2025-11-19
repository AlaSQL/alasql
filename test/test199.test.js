// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 199 IF statement', () => {
	test('1. Simple Variant', done => {
		//        alasql('CREATE DATABASE test199;USE test199');
		var res = alasql('IF TRUE SELECT VALUE 100');
		expect(res == 100).toBe(true);
		//        alasql('DROP DATABASE test199');
		done();
	});
});
