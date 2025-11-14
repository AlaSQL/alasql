// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 366 wildcards for LIKE', function () {
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

	describe('with %', function () {
		test('finds all', function (done) {
			assert.equal(8, alasql(sql + "'%'", [data]));
			done();
		});

		test('finds none', function (done) {
			assert.equal(0, alasql(sql + "'%q'", [data]));
			done();
		});

		test('can escape wildcards', function (done) {
			// AG: Changed to proper escape character
			assert.equal(1, alasql(sql + "'_!%_' ESCAPE '!'", [data]));
			//			    	assert.equal(1,alasql(sql+"'\\%'",[data]));
			done();
		});

		test('Finds prepending', function (done) {
			//			  	console.log(alasql(sql+"'%a'",[data]));
			assert.equal(0, alasql(sql + "'%a'", [data]));
			assert.equal(6, alasql(sql + "'%b'", [data]));
			done();
		});

		test('Finds center', function (done) {
			// Not supported yet
			assert.equal(7, alasql(sql + "'%a%'", [data]));
			assert.equal(7, alasql(sql + "'%b%'", [data]));
			done();
		});

		test('Finds postpending', function (done) {
			// Not supported yet
			assert.equal(6, alasql(sql + "'a%'", [data]));
			assert.equal(0, alasql(sql + "'b%'", [data]));
			done();
		});
	});

	describe('with ?', function () {
		test('find n long elements', function (done) {
			// I changed from ? to _
			assert.equal(1, alasql(sql + "'__'", [data]));
			done();
		});

		test('finds none', function (done) {
			// I changed from ? to _
			assert.equal(0, alasql(sql + "'_q'", [data]));
			done();
		});

		test('can escape wildcards', function (done) {
			// Changed escape character from // to ! and ? to _
			assert.equal(0, alasql(sql + "'!__' ESCAPE '!'", [data]));
			//						assert.equal(1,alasql(sql+"'!_' ESCAPE '!'",[data]));
			done();
		});

		test('Finds prepending', function (done) {
			assert.equal(0, alasql(sql + "'_a'", [data]));
			assert.equal(1, alasql(sql + "'_b'", [data]));
			assert.equal(5, alasql(sql + "'__b'", [data]));
			done();
		});

		test('Finds center', function (done) {
			// Not supported yet
			assert.equal(1, alasql(sql + "'_a_'", [data]));
			assert.equal(1, alasql(sql + "'_b_'", [data]));
			done();
		});

		test('Finds postpending', function (done) {
			// Not supported yet
			assert.equal(1, alasql(sql + "'a_'", [data]));
			assert.equal(0, alasql(sql + "'b_'", [data]));
			done();
		});
	});

	describe('with _', function () {
		test('find n long elements', function (done) {
			assert.equal(1, alasql(sql + "'__'", [data]));
			done();
		});

		test('finds none', function (done) {
			assert.equal(0, alasql(sql + "'_q'", [data]));
			done();
		});

		test('can escape wildcards', function (done) {
			assert.equal(1, alasql(sql + "'_!__' ESCAPE '!'", [data]));
			done();
		});

		test('Finds prepending', function (done) {
			assert.equal(0, alasql(sql + "'_a'", [data]));
			assert.equal(1, alasql(sql + "'_b'", [data]));
			assert.equal(5, alasql(sql + "'__b'", [data]));
			done();
		});

		test('Finds center', function (done) {
			// Not supported yet
			assert.equal(1, alasql(sql + "'_a_'", [data]));
			assert.equal(1, alasql(sql + "'_b_'", [data]));
			done();
		});

		test('Finds postpending', function (done) {
			// Not supported yet
			assert.equal(1, alasql(sql + "'a_'", [data]));
			assert.equal(0, alasql(sql + "'b_'", [data]));
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
