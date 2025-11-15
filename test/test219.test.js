// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 219 CREATE VIEW', () => {
	test('1. CREATE VIEW SYNTAX', done => {
		alasql(
			'CREATE DATABASE test219;USE test219;\
        	CREATE TABLE one (a INT, b STRING); \
        	INSERT INTO one VALUES (1,"one"),(2,"two"),(3,"three")'
		);
		alasql('CREATE VIEW myview (a) AS SELECT a FROM one');
		done();
	});
	test('2. RUN FROM VIEW', done => {
		var res = alasql('SELECT * FROM myview');
		//    	console.log(res);
		expect(res).toEqual([{a: 1}, {a: 2}, {a: 3}]);
		done();
	});
	test('3. RUN FROM JOIN VIEW', done => {
		var res = alasql('SELECT one.a as a1, myview.a as a2 FROM one JOIN myview ON one.a = myview.a');
		//    	console.log(res);
		expect(res).toEqual([
			{a1: 1, a2: 1},
			{a1: 2, a2: 2},
			{a1: 3, a2: 3},
		]);
		done();
	});

	test('4. CHANGE DATA IN VIEW', done => {
		alasql('INSERT INTO one VALUES (4,"four")');
		var res = alasql('SELECT * FROM myview');
		//    	console.log(res);
		expect(res).toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
		done();
	});

	test('5. DROP VIEW', done => {
		alasql('DROP VIEW myview');
		done();
	});
	test('99. Drop database', done => {
		alasql('DROP DATABASE test219');
		done();
	});
});
