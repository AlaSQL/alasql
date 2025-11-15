// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import DOMStorage from 'dom-storage';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof global === 'object') {
	global.localStorage = new DOMStorage('./test239.json', {
		strict: false,
		ws: '',
	});
}

describe('Test 240 DELETE TEST', () => {
	test('1. Create dtabase', done => {
		alasql(`
    SET AUTOCOMMIT OFF;
    DROP localStorage DATABASE IF EXISTS ls240;
    CREATE localStorage DATABASE IF NOT EXISTS ls240;
    ATTACH LOCALSTORAGE DATABASE ls240 AS test240; 
    USE test240;

    CREATE TABLE IF NOT EXISTS one (a int, b string);
    
    INSERT INTO one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk");
    
    `);

		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);

		//    var res = alasql('COMMIT TRANSACTION');

		alasql('DELETE FROM one WHERE a = 3');

		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
		]);

		alasql('DELETE FROM one WHERE 1=1');

		res = alasql('SELECT * FROM one');
		expect(res).toEqual([]);

		//	console.log(res);
		done();
	});

	test('8.Drop localStorage table', done => {
		alasql('DETACH DATABASE test240');
		alasql('DROP LOCALSTORAGE DATABASE ls240');
		done();
	});
});
