// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 330 PROLOG', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test330;');
		alasql('USE test330');
		alasql('REQUIRE PROLOG');
	});

	afterAll(function () {
		alasql('DROP DATABASE test330');
	});

	test('1. FACTS', function (done) {
		var res = alasql(':-son(Alex,Larissa)');
		//Todo - assert something to check if PROLOG is also returning correctly
		done();
	});
});
