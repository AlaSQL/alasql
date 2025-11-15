// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 141 text as source', () => {
	var myfn = function (i) {
		if (i > 3) return;
		return {a: i, b: i * i};
	};
	//	myfn.dontcache = true;

	var myfn2 = function (i) {
		if (i > 3) return;
		return {a: i, b: i * i};
	};
	myfn2.dontcache = true;

	var myfn3 = function (i) {
		if (i > 3) return;
		return {a: i, c: 2 * i};
	};
	//	myfn3.dontcache = true;

	test('1. Create database', done => {
		alasql('CREATE DATABASE test141; use test141');
		done();
	});

	test('2. On string', done => {
		var txt = 'one\ntwo\nthree\nfour\nfive\nsix\r\nseven\neight\r\nnine\nten';
		var days = alasql('select column _ from ? where len(_) <= 3', [txt]);
		expect(days).toEqual(['one', 'two', 'six', 'ten']);

		var res = alasql('select * from ?', [myfn]);
		expect(res).toEqual([
			{a: 0, b: 0},
			{a: 1, b: 1},
			{a: 2, b: 4},
			{a: 3, b: 9},
		]);
		done();
	});
	test('2. SELECT on function', done => {
		var res = alasql('select * from ?', [myfn2]);
		expect(res).toEqual([
			{a: 0, b: 0},
			{a: 1, b: 1},
			{a: 2, b: 4},
			{a: 3, b: 9},
		]);
		done();
	});
	test('3. INNER JOIN on stream', done => {
		//		myfn3.dontcache = true;

		var res = alasql('select a, b, t.c from ? inner join ? t using a', [myfn, myfn3]);
		expect(res).toEqual([
			{a: 0, b: 0, c: 0},
			{a: 1, b: 1, c: 2},
			{a: 2, b: 4, c: 4},
			{a: 3, b: 9, c: 6},
		]);
		//		console.log(res);
		done();
	});

	test('3. INNER JOIN on stream', done => {
		var res = alasql('select a, b, t.c from ? right join ? t using a', [myfn, myfn3]);
		expect(res).toEqual([
			{a: 0, b: 0, c: 0},
			{a: 1, b: 1, c: 2},
			{a: 2, b: 4, c: 4},
			{a: 3, b: 9, c: 6},
		]);

		done();
	});

	test('99. Drop database', done => {
		alasql('DROP DATABASE test141');
		done();
	});
});
