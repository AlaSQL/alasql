// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 215 DECLARE', () => {
	test('1. DECLARE INT', done => {
		alasql('DECLARE @one INT; SET @one = "123.456"');
		var res = alasql('SELECT VALUE @one');
		expect(res === 123).toBe(true);
		done();
	});

	test('2. DECLARE CHAR(N)', done => {
		alasql('declare @two char(5); set @two = "abc"');
		//        console.log(alasql.vars.two,alasql.declares.two);
		var res = alasql('SELECT VALUE @two');
		//        console.log(res);
		expect(res == 'abc  ').toBe(true);
		done();
	});

	test('3. DECLARE CHAR(N)', done => {
		alasql('declare @three char(5); set @three = "abcdefghijk"');
		var res = alasql('SELECT VALUE @three');
		//        console.log(res);
		expect(res == 'abcde').toBe(true);
		done();
	});

	test('4. DECLARE WITH SET', done => {
		alasql('declare @four char(5) = "abcdefghijk"');
		var res = alasql('SELECT VALUE @four');
		//        console.log(res);
		expect(res == 'abcde').toBe(true);
		done();
	});

	test('5. Multiple DECLARE', done => {
		alasql('declare @five char(5) = "abcdefghijk", @six int = 123');
		var res = alasql('SELECT ROW @five, @six');
		//        console.log(res);
		expect(res[0] == 'abcde').toBe(true);
		expect(res[1] == 123).toBe(true);
		done();
	});
});
