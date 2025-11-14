// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 329 PROLOG', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test329; USE test329');
		done();
	});

	test.skip('2. FACTS', function (done) {
		var res = alasql('CREATE GRAPH Alex > son > Michael');
		var res = alasql(':- son(Alex,Larissa)');
		console.log(res);
		done();
	});

	test.skip('3. RULES', function (done) {
		var res = alasql('son(@x,@y) :- parent(@y,@x)');
		console.log(res);
		done();
	});

	test.skip('4. QUERY', function (done) {
		var res = alasql('?- parent(@x,Alex)');
		var res = alasql('?- @x>parent>Alex)');
		console.log(res);
		done();
	});

	test.skip('5. Expression statement', function (done) {
		var res = alasql('= 100+1');
		console.log(res);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test329');
		done();
	});
});
