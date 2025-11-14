// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

if (typeof window !== 'undefined') {
	describe('Test 189 - SELECT INTO SQL()', function () {
		test('1. From ?', function (done) {
			var data = [
				{a: 1, b: 'Ten'},
				{a: 2, b: 'Twenty'},
				{a: 3, b: "Val's Deser"},
			];
			alasql(
				'SELECT * INTO SQL("' + __dirname + '/test189.sql",{tableid:"one"}) FROM ?',
				[data],
				function () {
					alasql(
						'CREATE DATABASE test189;\
	        	USE test189;\
	        	CREATE TABLE one; \
	        	SOURCE "' +
							__dirname +
							'/test189.sql"; \
	        	SELECT * FROM one',
						[],
						function (res) {
							assert.deepEqual(res.pop(), data);
							alasql('DROP DATABASE test189');
							done();
						}
					);
				}
			);
		});
	});
}
