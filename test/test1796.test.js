// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 1796 Multi-line comments', function () {
	test('1. /* */ and -- style comments', function (done) {
		var res = alasql.utils.uncomment('one /* two \n three */ four \n five -- six\nseven');
		//        console.log(res);
		assert.equal(res, 'one  four \n five \nseven');
		done();
	});

	test('2. /* */', function (done) {
		var res = alasql.utils.uncomment('SELECT /* xxx */ VALUE /* blahblah \n tuturututu */ 1');
		// console.log(res);
		assert.equal(res, 'SELECT  VALUE  1');
		done();
	});
});
