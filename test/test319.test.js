// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 319 PATH in GRAPH', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test319; USE test319');
		done();
	});

	test('2. Simple graph', function (done) {
		alasql('CREATE CLASS Person');
		var res = alasql('CREATE GRAPH :Person {age:35} AS @p1');
		//    console.log(1,res);
		var res = alasql('CREATE GRAPH :Person {age:40} AS @p2');
		//    console.log(2,res);
		var res = alasql('CREATE GRAPH @p1 > "is older than" > @p2');
		//    console.log(3,res);

		var res = alasql('SEARCH @p1 > name');
		assert.deepEqual(res, ['is older than']);
		//    console.log(res);

		var res = alasql('SEARCH @p1 PATH(=@p2) EDGE name');
		//    console.log(res);
		assert.deepEqual(res, ['is older than']);

		var res = alasql('SEARCH @p1 PATH(WHERE(age=40)) EDGE name');
		assert.deepEqual(res, ['is older than']);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test319');
		done();
	});
});
