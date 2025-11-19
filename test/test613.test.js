// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testNum = '613';

describe.skip('Test ' +
	testNum +
	' - SHOW COLUMNS and SHOW INDEX operations call the callback when provided', () => {
	test('1. Prepare databases', done => {
		alasql('CREATE DATABASE test613');
		alasql('CREATE TABLE test613.one0 (a INT)');
		alasql('CREATE TABLE test613.one1');
		alasql('USE test613; CREATE INDEX test613_a ON one0(a); USE alasql');
		alasql.options.modifier = 'RECORDSET';
		done();
	});

	test('2.1. Synchronous SHOW COLUMNS (operation still works when no callback is provided)', () => {
		var res = alasql('SHOW COLUMNS FROM test613.one0');
		expect(res).toEqual([
			{
				columnid: 'a',
				dbsize: undefined,
				dbtypeid: 'INT',
			},
		]);
	});

	test('2.2.1. Async SHOW COLUMNS (operation works when callback is provided, and no sql params)', done => {
		//
		alasql.promise('SHOW COLUMNS FROM test613.one0').then(function (res) {
			expect(res).toEqual([
				{
					columnid: 'a',
					dbsize: undefined,
					dbtypeid: 'INT',
				},
			]);
			done();
		});
	});

	test('2.2.2. Async SHOW COLUMNS (operation works when callback is provided, and empty sql params)', done => {
		//
		alasql.promise('SHOW COLUMNS FROM test613.one0', []).then(function (res) {
			expect(res).toEqual([
				{
					columnid: 'a',
					dbsize: undefined,
					dbtypeid: 'INT',
				},
			]);
			done();
		});
	});

	test('2.2.3. Async SHOW COLUMNS for a table with no columns (empty array result when callback is provided)', done => {
		//
		alasql.promise('SHOW COLUMNS FROM test613.one1').then(function (res) {
			expect(0).toEqual(res.length);
			done();
		});
	});

	test('2.2.4. Async SHOW COLUMNS for non-existent table (empty array result when callback is provided)', done => {
		//
		alasql.promise('SHOW COLUMNS FROM test613.one2').then(function (res) {
			expect(0).toEqual(res.length);
			done();
		});
	});

	test('3.1. Synchronous SHOW INDEX (operation still works when no callback is provided)', () => {
		var res = alasql('SHOW INDEX FROM test613.one0');
		expect(1).toEqual(res.length);
		expect(0).toEqual(res[0].len);
		expect(!!res[0].hh, 'hash is truthy').toBe(true);
	});

	test('3.2.1. Async SHOW INDEX (operation works when callback is provided, and no sql params)', done => {
		//
		alasql.promise('SHOW INDEX FROM test613.one0').then(function (res) {
			expect(1).toEqual(res.length);
			expect(0).toEqual(res[0].len);
			expect(!!res[0].hh, 'hash is truthy').toBe(true);
			done();
		});
	});

	test('3.2.2. Async SHOW INDEX (operation works when callback is provided, and empty sql params)', done => {
		//
		alasql.promise('SHOW INDEX FROM test613.one0', []).then(function (res) {
			expect(1).toEqual(res.length);
			expect(0).toEqual(res[0].len);
			expect(!!res[0].hh, 'hash is truthy').toBe(true);
			done();
		});
	});

	test('3.2.3. Async SHOW INDEX on a table with no columns (operation works when callback is provided, and empty sql params)', done => {
		//
		alasql.promise('SHOW INDEX FROM test613.one1', []).then(function (res) {
			expect(0).toEqual(res.length);
			done();
		});
	});

	test('3.2.4. Async SHOW INDEX on non-existent table (operation works when callback is provided, and empty sql params)', done => {
		//
		alasql.promise('SHOW INDEX FROM test613.one2', []).then(function (res) {
			expect(0).toEqual(res.length);
			done();
		});
	});

	test('4. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test613');
		done();
	});
});
