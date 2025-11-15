// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 146 - Async Tests', () => {
	var myfnsync = function (n) {
		if (n > 3) return;
		return {a: n, b: n * 2};
	};

	var myfn = function (n, cb) {
		alasql.busy++;
		setTimeout(() => {
			alasql.busy--;
			if (n > 3) cb();
			else cb({a: n, b: n * 2});
		}, 10);
	};

	test('1. Nested SQL', done => {
		alasql('CREATE DATABASE test146', [], () => {
			expect(!!alasql.databases.test146).toBe(true);
			alasql('USE test146', [], () => {
				expect(alasql.useid == 'test146').toBe(true);
				alasql('SELECT * FROM ?', [myfnsync], function (res) {
					expect(res).toEqual([
						{a: 0, b: 0},
						{a: 1, b: 2},
						{a: 2, b: 4},
						{a: 3, b: 6},
					]);
					alasql('DROP DATABASE test146', [], () => {
						expect(!alasql.databases.test146).toBe(true);
						done();
					});
				});
			});
		});
	});

	test('99. Detach database', done => {
		// Do we really need this?
		done();
	});
});
