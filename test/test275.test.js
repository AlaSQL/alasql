// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 275 INNER JOIN on empty tables', () => {
	test('1. Prepare databases', done => {
		alasql('CREATE DATABASE test275; USE test275');
		alasql('CREATE TABLE test275.one0 (a INT, b NVARCHAR(10))');
		alasql('CREATE TABLE test275.one1 (a INT, b NVARCHAR(10))');
		alasql('INSERT INTO test275.one1 VALUES (1,"One"), (2,"Two"), (3,"Three"), (4,"Four")');

		alasql('CREATE TABLE test275.two0 (b NVARCHAR(10), c INT)');
		alasql('CREATE TABLE test275.two1 (b NVARCHAR(10), c INT)');
		alasql('INSERT INTO test275.two1 VALUES ("One",10), ("Two",20), ("Three",30), ("Five",50)');
		alasql.options.modifier = 'RECORDSET';
		done();
	});

	test('2. INNER JOIN', done => {
		var res = alasql(
			'SELECT one0.*, two0.* FROM test275.one0 AS one0 INNER JOIN test275.two0 AS two0 ON one0.b = two0.b'
		);
		expect(res.data).toEqual([]);

		var res = alasql(
			'SELECT one1.*, two0.* FROM test275.one1 AS one1 INNER JOIN test275.two0 AS two0 ON one1.b = two0.b'
		);
		expect(res.data).toEqual([]);

		var res = alasql(
			'SELECT one0.*, two1.* FROM test275.one0 AS one0 INNER JOIN test275.two1 AS two1 ON one0.b = two1.b'
		);
		expect(res.data).toEqual([]);

		var res = alasql(
			'SELECT one1.*, two1.* FROM test275.one1 AS one1 INNER JOIN test275.two1 AS two1 ON one1.b = two1.b'
		);
		expect(res.data).toEqual([
			{a: 1, b: 'One', c: 10},
			{a: 2, b: 'Two', c: 20},
			{a: 3, b: 'Three', c: 30},
		]);

		done();
	});

	test('2. OUTER JOIN', done => {
		var res = alasql(
			'SELECT one0.*, two0.* FROM test275.one0 AS one0 OUTER JOIN test275.two0 AS two0 ON one0.b = two0.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one1.*, two0.* FROM test275.one1 AS one1 OUTER JOIN test275.two0 AS two0 ON one1.b = two0.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one0.*, two1.* FROM test275.one0 AS one0 OUTER JOIN test275.two1 AS two1 ON one0.b = two1.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one1.*, two1.* FROM test275.one1 AS one1 OUTER JOIN test275.two1 AS two1 ON one1.b = two1.b'
		);
		//    console.log(res.data);

		done();
	});

	test('3. LEFT JOIN', done => {
		var res = alasql(
			'SELECT one0.*, two0.* FROM test275.one0 AS one0 LEFT JOIN test275.two0 AS two0 ON one0.b = two0.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one1.*, two0.* FROM test275.one1 AS one1 LEFT JOIN test275.two0 AS two0 ON one1.b = two0.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one0.*, two1.* FROM test275.one0 AS one0 LEFT JOIN test275.two1 AS two1 ON one0.b = two1.b'
		);
		//    console.log(res.data);

		var res = alasql(
			'SELECT one1.*, two1.* FROM test275.one1 AS one1 LEFT JOIN test275.two1 AS two1 ON one1.b = two1.b'
		);
		//    console.log(res.data);

		done();
	});

	test('99. Drop databases', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test275');
		done();
	});
});
