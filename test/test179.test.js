// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

//if(typeof window !== 'undefined') {

describe('Test 179 - function in GROUP BY', () => {
	var authors = [
		{id: 1, name: 'adam'},
		{id: 2, name: 'bob'},
		{id: 3, name: 'charlie'},
	];

	var books = [
		{author_id: 1, title: 'Coloring for beginners'},
		{author_id: 1, title: 'Advanced coloring'},
		{author_id: 2, title: '50 Hikes in New England'},
		{author_id: 2, title: '50 Hikes in Illinois'},
		{author_id: 3, title: 'String Theory for Dummies'},
	];

	test('1. SELECT', done => {
		//        var res = alasql('SELECT authors.*, books.author_id, books.title FROM ? authors LEFT JOIN ? books \
		//        ON authors.id = books.author_id',[authors, books]);

		//        var res = alasql('SELECT authors.*, books.* FROM ? authors LEFT JOIN ? books \
		//        ON authors.id = books.author_id',[authors, books]);

		var res = alasql(
			'SELECT * FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);
		//        console.log(res);
		expect(res.length == 5).toBe(true);
		// expect(res).toEqual([
		//     { continent: 'Europe', 'COUNT(*)': 4 },
		//     { continent: 'Asia', 'COUNT(*)': 2 } ]
		// );
		//    console.log(res);
		done();
	});

	test('2. SELECT with JOIN', done => {
		var res = alasql(
			'SELECT authors.*, books.author_id, books.title FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);

		expect(res.length == 5).toBe(true);

		var res = alasql(
			'SELECT * FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);
		expect(res.length == 5).toBe(true);

		//        console.log(res);
		// expect(res).toEqual([
		//     { continent: 'Europe', 'COUNT(*)': 4 },
		//     { continent: 'Asia', 'COUNT(*)': 2 } ]
		// );
		//    console.log(res);
		done();
	});
});
