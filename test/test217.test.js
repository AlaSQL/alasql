// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 217 Some T-SQL compatibility tests', () => {
	test('1. 20141002 to DATE()', done => {
		var res = alasql('SELECT VALUE YEAR(DATE("20141001"))');
		expect(res == 2014).toBe(true);
		done();
	});

	test('2. 20141002 to CONVERT()', done => {
		var res = alasql('SELECT VALUE CONVERT(STRING, "20141002",110)');
		//        console.log(res);
		expect(res == '10-02-2014').toBe(true);
		done();
	});

	test('3. TRUNCATE TABLE', done => {
		var res = alasql(
			'CREATE DATABASE test217;USE test217; \
            CREATE TABLE test217.one(a INT);INSERT INTO test217.one VALUES (1),(2),(3); \
            TRUNCATE TABLE test217.one; SELECT VALUE COUNT(*) FROM test217.one \
            '
		);
		//        console.log(res);
		expect(res.pop()).toBe(0);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test217');
		done();
	});
});
