// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 318 PATH in GRAPH', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test318; USE test318');
		var res = alasql(
			'CREATE GRAPH Pablo, Maxim, Alex, Napoleon, \
      Josephine,  Kate, Julia  {age:27}, Paloma, \
      #Pablo >loves> #Julia, #Maxim >> #Julia, #Alex >> #Kate, \
      #Kate >> #Julia, #Alex >> #Paloma, #Napoleon > "loves" > #Josephine, \
      #Josephine >"knows"> #Pablo'
		);
		done();
	});

	test('2. Simple graph', done => {
		var res = alasql('SEARCH PATH(#Josephine) name FROM #Napoleon ');
		expect(res).toEqual(['loves', 'Josephine']);
		done();
	});

	test('3. Simple graph', done => {
		var res = alasql('SEARCH PATH(#Josephine) EDGE name FROM #Napoleon');
		expect(res).toEqual(['loves']);
		//    console.log(res);
		done();
	});

	test('4. Simple graph', done => {
		var res = alasql('SEARCH PATH(#Josephine) EDGE set(color="red") FROM #Napoleon');
		expect(res).toEqual([alasql.databases[alasql.useid].objects[5]]);
		done();
	});

	test('5. Simple graph', done => {
		var res = alasql('SEARCH PATH(#Pablo) name FROM #Napoleon ');
		expect(res).toEqual(['loves', 'Josephine', 'knows', 'Pablo']);
		done();
	});

	test('6. Simple graph', done => {
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY() FROM #Napoleon');
		expect(res).toEqual(['knows', 'loves']);
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY(ASC) FROM #Napoleon');
		expect(res).toEqual(['knows', 'loves']);
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY(DESC) FROM #Napoleon');
		expect(res).toEqual(['loves', 'knows']);
		done();
	});

	test('7. Simple graph', done => {
		var res = alasql('SEARCH PATH(age) name FROM #Napoleon ');
		expect(res).toEqual(['loves', 'Josephine', 'knows', 'Pablo', 'loves', 'Julia']);

		done();
	});

	test('8. D3() selector', done => {
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test318');
		done();
	});
});
