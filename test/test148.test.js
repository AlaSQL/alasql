// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 148 - EXPLAIN SELECT', () => {
	test('1. Simple Select', done => {
		alasql('CREATE DATABASE test148; USE test148');
		alasql('CREATE TABLE test148.one (a INT)');
		alasql('INSERT INTO test148.one VALUES (1),(2),(3)');
		var res = alasql(
			'EXPLAIN SELECT * FROM test148.one WHERE a IN (SELECT * FROM test148.one) ORDER BY a'
		);
		//		console.table(res);
		done();
	});

	test('99. Detach database', done => {
		alasql('DROP DATABASE test148');
		done();
	});
});
