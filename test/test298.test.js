// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 298 PLUG-IN TEST', () => {
	test('1. CREATE DATABASE', () => {
		alasql('CREATE DATABASE test298;USE test298');
	});

	test('2.REQURE ECHO plugin', () => {
		expect(() => {
			var res = alasql('ECHO 1');
			//      console.log(1,res);
		}).toThrow();

		var res = alasql('REQUIRE ECHO');
		expect(res).toEqual(1);
		var res = alasql('ECHO 10');
		expect(res).toEqual(10);
		//      console.log(2,res);
	});

	test('99. DROP DATABASE', () => {
		alasql('DROP DATABASE test298');
	});
});
