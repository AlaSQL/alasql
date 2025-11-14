// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 228 SELECT inside expressions', function () {
	test('1. UPDATE WITH SELECT', function (done) {
		alasql('CREATE DATABASE test228; USE test228;');
		alasql('CREATE TABLE one(a INT, b INT)');
		alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30),(4,40)');

		var res = alasql('SELECT COLUMN a+(SELECT MAX(b) FROM one) FROM one');
		assert.deepEqual(res, [41, 42, 43, 44]);
		//      console.log(res);

		//    	var res = alasql('UPDATE one SET a = a + (SELECT MAX(b) FROM one)');
		//      console.log(res);
		//    	assert.deepEqual(res,[1.23, 2.345, 4.56]);
		alasql('DROP DATABASE test228');
		done();
	});
});
