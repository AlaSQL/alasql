// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 366 wildcards for LIKE', () => {
	var data = [
		{x: 'ab'},
		{x: '-ab'},
		{x: 'a-b'},
		{x: 'ab-'},
		{x: 'a%b'},
		{x: 'a.b'},
		{x: 'a_b'},
		{x: 'xyz'},
	];

	var sql = 'VALUE OF SELECT COUNT(*) FROM ? WHERE x LIKE ';

	describe('with %', () => {
		test('finds all', done => {
			expect(8).toEqual(alasql(sql + "'%'", [data]));
			done();
		});

		test('finds none', done => {
			expect(0).toEqual(alasql(sql + "'%q'", [data]));
			done();
		});

		test('can escape wildcards', done => {
			// AG: Changed to proper escape character
			expect(1).toEqual(alasql(sql + "'_!%_' ESCAPE '!'", [data]));
			//			    	expect(1).toEqual(alasql(sql+"'\\%'",[data]));
			done();
		});

		test('Finds prepending', done => {
			//			  	console.log(alasql(sql+"'%a'",[data]));
			expect(0).toEqual(alasql(sql + "'%a'", [data]));
			expect(6).toEqual(alasql(sql + "'%b'", [data]));
			done();
		});

		test('Finds center', done => {
			// Not supported yet
			expect(7).toEqual(alasql(sql + "'%a%'", [data]));
			expect(7).toEqual(alasql(sql + "'%b%'", [data]));
			done();
		});

		test('Finds postpending', done => {
			// Not supported yet
			expect(6).toEqual(alasql(sql + "'a%'", [data]));
			expect(0).toEqual(alasql(sql + "'b%'", [data]));
			done();
		});
	});

	describe('with ?', () => {
		test('find n long elements', done => {
			// I changed from ? to _
			expect(1).toEqual(alasql(sql + "'__'", [data]));
			done();
		});

		test('finds none', done => {
			// I changed from ? to _
			expect(0).toEqual(alasql(sql + "'_q'", [data]));
			done();
		});

		test('can escape wildcards', done => {
			// Changed escape character from // to ! and ? to _
			expect(0).toEqual(alasql(sql + "'!__' ESCAPE '!'", [data]));
			//						expect(1).toEqual(alasql(sql+"'!_' ESCAPE '!'",[data]));
			done();
		});

		test('Finds prepending', done => {
			expect(0).toEqual(alasql(sql + "'_a'", [data]));
			expect(1).toEqual(alasql(sql + "'_b'", [data]));
			expect(5).toEqual(alasql(sql + "'__b'", [data]));
			done();
		});

		test('Finds center', done => {
			// Not supported yet
			expect(1).toEqual(alasql(sql + "'_a_'", [data]));
			expect(1).toEqual(alasql(sql + "'_b_'", [data]));
			done();
		});

		test('Finds postpending', done => {
			// Not supported yet
			expect(1).toEqual(alasql(sql + "'a_'", [data]));
			expect(0).toEqual(alasql(sql + "'b_'", [data]));
			done();
		});
	});

	describe('with _', () => {
		test('find n long elements', done => {
			expect(1).toEqual(alasql(sql + "'__'", [data]));
			done();
		});

		test('finds none', done => {
			expect(0).toEqual(alasql(sql + "'_q'", [data]));
			done();
		});

		test('can escape wildcards', done => {
			expect(1).toEqual(alasql(sql + "'_!__' ESCAPE '!'", [data]));
			done();
		});

		test('Finds prepending', done => {
			expect(0).toEqual(alasql(sql + "'_a'", [data]));
			expect(1).toEqual(alasql(sql + "'_b'", [data]));
			expect(5).toEqual(alasql(sql + "'__b'", [data]));
			done();
		});

		test('Finds center', done => {
			// Not supported yet
			expect(1).toEqual(alasql(sql + "'_a_'", [data]));
			expect(1).toEqual(alasql(sql + "'_b_'", [data]));
			done();
		});

		test('Finds postpending', done => {
			// Not supported yet
			expect(1).toEqual(alasql(sql + "'a_'", [data]));
			expect(0).toEqual(alasql(sql + "'b_'", [data]));
			done();
		});
	});

	/*
				{x:'ab'}
				,{x:'-ab'}
				,{x:'a-b'}
				,{x:'ab-'}
				,{x:'a_b'}
				,{x:'a%b'}
				,{x:'a.b'}
				*/
});
