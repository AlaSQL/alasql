// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 127 SOURCE', () => {
	test('1. Load and run statements', done => {
		alasql('create database test127');
		alasql('use test127');
		alasql('source "' + __dirname + '/test127.sql"');
		expect(Object.keys(alasql.databases.test127.tables)).toEqual(['one']);
		done();
	});

	test('2. Test on loaded database', done => {
		var res = alasql('select * from one');
		expect(res).toEqual([
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);

		alasql('drop database test127');
		done();
	});
});
