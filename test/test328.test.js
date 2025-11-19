// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 328 COMMA SELECTOR', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test328; USE test328');
		done();
	});

	test('2. SEARCH COMMA - select all pairs', done => {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		//    var res = alasql('SEARCH / a where(_1<=2) as @a, / a where(_<>@a) as @b return @a,@b',[data]);
		var res = alasql('SEARCH /a as @a ^ /a AS @b WHERE(@a!=@b) RETURNS(@a,@b) FROM ?', [data]);
		// console.log(res);
		expect(res).toEqual([
			{'@a': 1, '@b': 2},
			{'@a': 1, '@b': 3},
			{'@a': 2, '@b': 1},
			{'@a': 2, '@b': 3},
			{'@a': 3, '@b': 1},
			{'@a': 3, '@b': 2},
		]);
		done();
	});

	test('2. SEARCH COMMA - select all pairs', done => {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		//    var res = alasql('SEARCH / a where(_1<=2) as @a, / a where(_<>@a) as @b return @a,@b',[data]);
		var res = alasql('SEARCH /a as @a ^ /a AS @b WHERE(@a!=@b) @[(@a),(@b)] FROM ?', [data]);
		//     console.log(res);
		expect(res).toEqual([
			[1, 2],
			[1, 3],
			[2, 1],
			[2, 3],
			[3, 1],
			[3, 2],
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test328');
		done();
	});
});
