// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 309 # operator and graphs', () => {
	test('0. Create database ', done => {
		alasql('CREATE DATABASE test309;USE test309');
		done();
	});

	test('1. SET selector', done => {
		alasql('CREATE VERTEX #Andrey SET age = 44');
		alasql('CREATE VERTEX #Olga SET age = 35');
		alasql('CREATE VERTEX #Maria SET age = 28');
		var res = alasql('SELECT VALUE #Andrey->age');
		expect(res == 44).toBe(true);
		var res = alasql('SEARCH age FROM #Olga');
		expect(res).toEqual([35]);
		var res = alasql('SEARCH / AS @p #Olga age');
		expect(res).toEqual([35]);
		var res = alasql('SEARCH VALUE / #Olga age');
		//    console.log(res);
		expect(res == 35).toBe(true);

		done();
	});

	test('99. Drop database ', done => {
		alasql('DROP DATABASE test309');
		done();
	});
});
