// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 148 - EXPLAIN SELECT', function () {
	test('1. Simple Select', function (done) {
		alasql('CREATE DATABASE test148; USE test148');
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3)');
		var res = alasql('EXPLAIN SELECT * FROM one WHERE a IN (SELECT * FROM one) ORDER BY a');
		//		console.table(res);
		done();
	});

	test('99. Detach database', function (done) {
		alasql('DROP DATABASE test148');
		done();
	});
});
