// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 139 JSON', () => {
	test('1. Simple JSON', done => {
		alasql('CREATE DATABASE test139; use test139');

		var res = alasql('SELECT VALUE 1');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT VALUE @1');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT VALUE "Test"');
		expect(res == 'Test').toBe(true);

		var res = alasql('SELECT VALUE @"Test"');
		expect(res == 'Test').toBe(true);

		var res = alasql('SELECT VALUE TRUE');
		expect(res).toBe(true);

		var res = alasql('SELECT VALUE FALSE');
		expect(!res).toBe(true);

		var res = alasql('SELECT VALUE @true');
		expect(res).toBe(true);

		var res = alasql('SELECT VALUE @false');
		expect(!res).toBe(true);

		var res = alasql('SELECT VALUE @{a:1}');
		expect(res).toEqual({a: 1});

		var res = alasql('SELECT VALUE @[1,2,3]');
		expect(res).toEqual([1, 2, 3]);

		var res = alasql('SELECT VALUE ARRAY[1,2,3]');
		expect(res).toEqual([1, 2, 3]);

		var res = alasql('SELECT VALUE @[1,2,3]');
		expect(res).toEqual([1, 2, 3]);

		var res = alasql('SELECT VALUE @[1,@[2,3]]');
		expect(res).toEqual([1, [2, 3]]);

		var res = alasql('SELECT VALUE @[1,@[2,(2+1),@[4,?],{a:123}]]', [70]);
		expect(res).toEqual([1, [2, 3, [4, 70], {a: 123}]]);

		done();
	});

	test('2. Property', done => {
		var res = alasql('SELECT VALUE @{a:1}->a');
		expect(res == 1).toBe(true);
		var res = alasql('SELECT VALUE @{a:{b:@[1,2,3]}}->a->b->2');
		expect(res == 3).toBe(true);

		alasql('CREATE TABLE one');
		expect(!!alasql.tables.one).toBe(true);

		var res = alasql('INSERT INTO one VALUES @{a:1}, @{a:2,b:2}');
		expect(res == 2).toBe(true);
		expect(alasql.tables.one.data).toEqual([{a: 1}, {a: 2, b: 2}]);
		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([{a: 1}, {a: 2, b: 2}]);

		var res = alasql('SELECT a FROM one');
		expect(res).toEqual([{a: 1}, {a: 2}]);

		var res = alasql('SELECT b FROM one');
		expect(res).toEqual([{b: undefined}, {b: 2}]);

		var res = alasql('INSERT INTO one VALUES @{a:3,b:@[4,5]}');
		expect(res == 1).toBe(true);

		var res = alasql('SELECT COLUMN b AND b->0 FROM one');
		expect(res).toEqual([undefined, undefined, 4]);

		var res = alasql('SELECT b FROM one');
		expect(res).toEqual([{b: undefined}, {b: 2}, {b: [4, 5]}]);
		// Make Dirty
		alasql.tables.one.data[2].b = 99;

		var res1 = alasql('SELECT b FROM one');
		expect(res1).toEqual([{b: undefined}, {b: 2}, {b: 99}]);

		var res2 = alasql('SELECT cloneDeep(b) AS b FROM one');
		expect(res2).toEqual([{b: undefined}, {b: 2}, {b: 99}]);

		// Make Dirty
		alasql.tables.one.data[2].b = 777;
		res1 = alasql('SELECT b FROM one');
		expect(res1).toEqual([{b: undefined}, {b: 2}, {b: 777}]);

		done();
	});

	test('3. Property of property', done => {
		alasql('CREATE TABLE two');
		alasql(
			'INSERT INTO two VALUES @{a:1,b:@[0,10,20]}, @{a:2,b:@[0,(-10),(-20)]},' +
				' @{a:4,b:@[100,200,300]}'
		);
		var res = alasql('SELECT COLUMN b->(a) FROM two');
		expect(res).toEqual([10, -20, undefined]);

		alasql('INSERT INTO two VALUES @{a:1}');
		var res = alasql('SELECT COLUMN b AND b->(a) FROM two');
		expect(res).toEqual([10, -20, undefined, undefined]);

		alasql('CREATE TABLE four');
		alasql('INSERT INTO four VALUES @{b:1}, @{b:2}');
		var res = alasql('SELECT COLUMN @{a:@[2014,(2014+1),(2014+b)]} FROM four');
		expect(res).toEqual([{a: [2014, 2015, 2015]}, {a: [2014, 2015, 2016]}]);

		alasql('CREATE TABLE five (a JSON)');
		alasql('INSERT INTO five VALUES (1), ("two"), (@{b:"three"}), (@["F","O","U","R"])');

		var res = alasql('SELECT * FROM five');
		expect(alasql.tables.five.data).toEqual([
			{a: 1},
			{a: 'two'},
			{a: {b: 'three'}},
			{a: ['F', 'O', 'U', 'R']},
		]);
		expect(res).toEqual([{a: 1}, {a: 'two'}, {a: {b: 'three'}}, {a: ['F', 'O', 'U', 'R']}]);

		var res = alasql('SELECT * FROM five WHERE a = "two"');
		expect(res).toEqual([{a: 'two'}]);

		var res = alasql('SELECT * FROM five WHERE a == @["F","O","U","R"]');
		expect(res).toEqual([{a: ['F', 'O', 'U', 'R']}]);

		//		alasql('INSERT INTO five VALUES (?)',[{a:[6,7]}]);
		alasql('INSERT INTO five VALUES (?)', [1]);

		var res = alasql('SELECT * FROM five');
		expect(res).toEqual([{a: 1}, {a: 'two'}, {a: {b: 'three'}}, {a: ['F', 'O', 'U', 'R']}, {a: 1}]);

		var res = alasql('SELECT * FROM five WHERE a = 1');
		expect(res).toEqual([{a: 1}, {a: 1}]);

		alasql('INSERT INTO five VALUES (?)', [[6, 7]]);
		var res = alasql('SELECT a FROM five WHERE a == @[6,7]');
		expect(res).toEqual([{a: [6, 7]}]);

		alasql('INSERT INTO five VALUES (?)', [{w: 123}]);
		var res = alasql('SELECT a FROM five WHERE a == @{w:123}');
		expect(res).toEqual([{a: {w: 123}}]);

		alasql('INSERT INTO five VALUES (@{w:?})', [59]);
		alasql('INSERT INTO five VALUES (@{w:?})', [234]);
		var res = alasql('SELECT a FROM five WHERE a == @{w:234}');
		expect(res).toEqual([{a: {w: 234}}]);

		var res = alasql('SELECT COLUMN a->w FROM five WHERE a->w > 100');
		expect(res).toEqual([123, 234]);

		var res = alasql('SELECT COLUMN a->w FROM five WHERE a == @{w:?}', [59]);
		expect(res).toEqual([59]);

		//		console.log(res);

		done();
	});

	test('99. Drop database', done => {
		alasql('DROP DATABASE test139');
		done();
	});
});
