// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 292 Nested searches', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test292;USE test292');
		done();
	});

	var data = [{a: {b: [{c: 1}, {c: 2}, {c: 3}]}}, {a: {b: [{c: 4}, {c: 5}, {c: 6}]}}];

	test.skip('2. Search inside select', function (done) {
		var res = alasql('SELECT (SEARCH b SUM(/c) FROM _) FROM ?', [data]);
		console.log(res);
		done();
	});

	test.skip('3. SELECT inside SEARCH', function (done) {
		var res = alasql('SEARCH a (SELECT SUM(c) FROM b) FROM ?');
		console.log(res);
		done();
	});

	test.skip('4. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test292');
		done();
	});
});
