// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 221 Multi-line comments', () => {
	test('1. /* */ and -- style comments', done => {
		var res = alasql.utils.uncomment('one /* two \n three */ four \n five -- six\nseven');
		//        console.log(res);
		expect(res).toEqual('one  four \n five \nseven');
		done();
	});

	test('2. /* */', done => {
		var res = alasql.utils.uncomment('SELECT /* xxx */ VALUE /* blahblah \n tuturututu */ 1');
		// console.log(res);
		expect(res).toEqual('SELECT  VALUE  1');
		done();
	});
});
