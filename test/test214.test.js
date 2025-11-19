// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 214 Multiple same aggregators', () => {
	test('1. Prepare database', done => {
		var res = alasql(
			'create database test214;use test214;\
            create table one (a int, b int);\
            insert into one values (1,10),(1,20),(1,30),(2,40),(2,50),(3,60);\
            select row count(a),count(b) from one;\
            select row sum(a),sum(b) from one;'
		);
		expect(res.pop()).toEqual([10, 210]);
		expect(res.pop()).toEqual([6, 6]);
		done();
	});

	test('2. Test same aggregators', done => {
		var res = alasql(
			'select row count(a),count(a) from one;\
            select row sum(a),sum(a) from one;'
		);
		//        console.log(res);
		expect(res.pop()).toEqual([10, 10]);
		expect(res.pop()).toEqual([6, 6]);
		done();
	});

	test('3. Test same aggregators', done => {
		var res = alasql('select row count(a)+1,count(a) from one');
		expect(res).toEqual([7, 6]);
		done();
	});

	test('4. Test same aggregators', done => {
		var res = alasql('select row count(a),count(a)+1 from one');
		expect(res).toEqual([6, 7]);
		done();
	});
});
