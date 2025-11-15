// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 340 SET PARAMS', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test340;USE test340');
		done();
	});

	test.skip('2. SET PARAMS', done => {
		var res = alasql(() => {
			/*

    SET PARAMS = {
        foo:'bar',
        fromId:1,
        toId:2
    };

    SELECT VALUE $foo;

*/
		});

		console.log(res);
		expect(res).toEqual([1, 'bar']);

		done();
	});

	test.skip('3. Change params property', done => {
		var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0', [100]);
		expect(res.sort()).toEqual([100, 1, 200]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test340');
		done();
	});
});
