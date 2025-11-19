// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 298 PLUG-IN TEST', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test298;USE test298');
		delete alasql.yy.Echo;
		delete alasql.plugins.ECHO;
		done();
	});

	test('2.REQURE ECHO plugin', done => {
		expect(() => {
			var res = alasql('ECHO 1');
			//      console.log(1,res);
		}).toThrow(Error);

		var res = alasql('REQUIRE ECHO');
		expect(res).toEqual(1);
		var res = alasql('ECHO 10');
		expect(res).toEqual(10);
		//      console.log(2,res);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test298');
		done();
	});
});
