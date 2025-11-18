// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

global.localStorage = new DOMStorage('./test/test384.json', {
	strict: false,
	ws: '',
});

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 384 - NOT NULL error when copying from another table issue #471', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test384;USE test384');
		done();
	});

	test('3. Create table issue - many statements', done => {
		alasql.options.modifier = 'MATRIX';
		alasql('CREATE TABLE tab3 (pk INTEGER NOT NULL)');
		alasql('CREATE TABLE tab4 (pk INTEGER NOT NULL)');
		alasql('INSERT INTO tab3 VALUES(3)');
		alasql('INSERT INTO tab4 SELECT * FROM tab3');

		var res = alasql('SELECT * FROM tab3');
		expect(res).toEqual([[3]]);

		done();
	});

	if (false) {
		test('2. Create table issue - one statement', done => {
			alasql.options.modifier = 'MATRIX';
			alasql(() => {
				/*
      CREATE TABLE tab0 (pk INTEGER NOT NULL);
      CREATE TABLE tab1 (pk INTEGER NOT NULL);
      INSERT INTO tab0 VALUES(3);
      INSERT INTO tab1 SELECT * FROM tab0;
    */
			});

			var res = alasql('SELECT * FROM tab3');
			expect(res).toEqual([[3]]);

			done();
		});
	}

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test384');
		done();
	});
});
