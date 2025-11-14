// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 273 Source columns detextion', function () {
	const pluck = (arr, key) => arr.map(e => e[key]);

	beforeAll(function () {
		alasql('CREATE DATABASE test273; USE test273');
	});

	afterAll(function () {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test273');
	});

	test('1. Create database', function (done) {
		alasql('CREATE TABLE one(a INT, b INT)');
		alasql('CREATE TABLE two(b INT, c INT)');
		done();
	});

	test('2. Empty test on table with columns', function (done) {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT * FROM one');
		var colres = res.columns.map(col => col.columnid);
		assert.deepEqual(colres, ['a', 'b']);
		alasql.options.modifier = undefined;
		done();
	});

	test('3. Star and other column', function (done) {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT *,a FROM one');
		var colres = pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'a']);

		var res = alasql('SELECT a,*,a FROM one');
		var colres = pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a', 'b', 'a']);
		alasql.options.modifier = undefined;
		done();
	});

	test('4. Subquery', function (done) {
		var res = alasql('SELECT RECORDSET * FROM (SELECT * FROM one)');
		var colres = pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	test('5. JOIN subquery', function (done) {
		var res = alasql(
			'SELECT RECORDSET t.*,s.* FROM (SELECT * FROM one) t \
      JOIN one s USING a'
		);
		var colres = pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'a', 'b']);
		done();
	});
});
