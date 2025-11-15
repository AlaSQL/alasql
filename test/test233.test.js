// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 233 COALESCE() test', () => {
	test('1. Prepare database', done => {
		alasql('CREATE DATABASE test233; USE test233;');
		done();
	});

	test('2. Throw error', done => {
		alasql('source "' + __dirname + '/test233.sql"', [], function (res) {
			expect(alasql.utils.flatArray(res.pop())).toEqual([
				10000, 20000, 20800, 30000, 40000, 41600, 45000, 50000, 56000, 62400, 83200, 120000,
			]);
			done();
		});
	});

	test('99. DROP', done => {
		alasql.options.nocount = false;
		alasql('DROP DATABASE test233');
		done();
	});
});
