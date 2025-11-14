// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 309 # operator and graphs', function () {
	test('0. Create database ', function (done) {
		alasql('CREATE DATABASE test309;USE test309');
		done();
	});

	test('1. SET selector', function (done) {
		alasql('CREATE VERTEX #Andrey SET age = 44');
		alasql('CREATE VERTEX #Olga SET age = 35');
		alasql('CREATE VERTEX #Maria SET age = 28');
		var res = alasql('SELECT VALUE #Andrey->age');
		assert(res == 44);
		var res = alasql('SEARCH age FROM #Olga');
		assert.deepEqual(res, [35]);
		var res = alasql('SEARCH / AS @p #Olga age');
		assert.deepEqual(res, [35]);
		var res = alasql('SEARCH VALUE / #Olga age');
		//    console.log(res);
		assert(res == 35);

		done();
	});

	test('99. Drop database ', function (done) {
		alasql('DROP DATABASE test309');
		done();
	});
});
