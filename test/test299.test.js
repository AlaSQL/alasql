// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 299 Parser Test', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test299;USE test299');
		done();
	});

	test.skip('2.Tests', function (done) {
		var res = alasql(' AUTO_INCREMENT');
		console.log(res);
		//      console.log(2,res);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test299');
		done();
	});
});
