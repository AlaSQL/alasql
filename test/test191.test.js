// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 191 - SELECT and GROUP BY execution order', () => {
	test('1. NO GROUP BY', done => {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a, a+1 AS b FROM ?', [data]);
		//        console.log(res);
		done();
	});

	test('1. From ?', done => {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a', [data]);
		//        console.log(res);
		done();
	});
});
