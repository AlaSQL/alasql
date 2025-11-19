// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 352 TEST EQUALITY', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test352;USE test352');
		done();
	});

	test('2. TEST =', done => {
		var res = alasql('= 1=1');
		expect(res).toEqual(true);
		var res = alasql('= 1=NULL');
		expect(res).toEqual(undefined);
		var res = alasql('= NULL=NULL');
		expect(res).toEqual(undefined);
		var res = alasql('= 0=NULL');
		expect(res).toEqual(undefined);
		done();
	});

	test('3. TEST ==', done => {
		var res = alasql('= 1==1');
		expect(res).toEqual(true);
		var res = alasql('= 1==NULL');
		expect(res).toEqual(undefined);
		var res = alasql('= NULL==NULL');
		expect(res).toEqual(undefined);
		var res = alasql('= 0==NULL');
		expect(res).toEqual(undefined);
		done();
	});

	test('4. TEST == deepEqual', done => {
		var res = alasql('= {a:1}=={a:1}');
		expect(res).toEqual(true);
		var res = alasql('= {a:1}=={a:2}');
		expect(res).toEqual(false);
		done();
	});

	test('3. TEST IS', done => {
		var res = alasql('= 1 IS NULL');
		expect(res).toEqual(false);
		var res = alasql('= NULL IS NULL');
		expect(res).toEqual(true);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test352');
		done();
	});
});
