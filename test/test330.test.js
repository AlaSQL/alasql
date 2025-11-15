// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 330 PROLOG', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test330;');
		alasql('USE test330');
		alasql('REQUIRE PROLOG');
	});

	afterAll(() => {
		alasql('DROP DATABASE test330');
	});

	test('1. FACTS', done => {
		var res = alasql(':-son(Alex,Larissa)');
		//Todo - assert something to check if PROLOG is also returning correctly
		done();
	});
});
