// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 178 - function in GROUP BY', () => {
	var city = [
		{city: 'Moscow', continent: 'Europe'},
		{city: 'Kyiv', continent: 'Europe'},
		{city: 'Minsk', continent: 'Europe'},
		{city: 'Madrid', continent: 'Europe'},
		{city: 'Beijing', continent: 'Asia'},
		{city: 'Tokyo', continent: 'Asia'},
	];

	test('1. Default select from GROUP BY clause', done => {
		//		var res = alasql('SELECT COUNT(*) AS cnt FROM ? GROUP BY MID(city,1,1), city',[city]);
		var res = alasql('SELECT continent, COUNT(*) FROM ? GROUP BY continent', [city]);
		expect(res).toEqual([
			{continent: 'Europe', 'COUNT(*)': 4},
			{continent: 'Asia', 'COUNT(*)': 2},
		]);
		//    console.log(res);
		done();
	});
});
