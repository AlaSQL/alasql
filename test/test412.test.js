// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

describe('Test 412 ORDER BY unselected column (issue #379)', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test412; USE test412');
	});

	afterAll(() => {
		alasql('DROP DATABASE test412');
	});

	test('1. CREATE TABLE, INSERT and SELECT', done => {
		alasql(
			'create table sun (a int, b int); \
						insert into sun values (1,10),(2,5),(3,20);'
		);

		var res1 = alasql('select a from sun order by b');
		var res2 = alasql('select a,b remove columns b from sun order by b');
		expect(res1).toEqual(res2);
		done();
	});

	test('2. CREATE TABLE, INSERT and SELECT', done => {
		var res = alasql('SELECT a FROM ? ORDER BY id', [
			[
				{id: 2, a: 123},
				{id: 1, a: null},
			],
		]);
		//console.log(res);
		expect(res).toEqual([{a: null}, {a: 123}]);

		done();
	});

	test('3. CREATE TABLE, INSERT and SELECT', done => {
		var res = alasql('SELECT a, id REMOVE id FROM ? ORDER BY id', [
			[
				{id: 2, a: 123},
				{id: 1, a: null},
			],
		]);

		expect(res).toEqual([{a: null}, {a: 123}]);
		done();
	});

	test('4. CREATE TABLE, INSERT and SELECT', done => {
		var res = alasql('SELECT a, id FROM ? ORDER BY 2', [
			[
				{id: 2, a: 1},
				{id: 1, a: 2},
				{id: 3, a: 3},
			],
		]);

		expect(res).toEqual([
			{a: 2, id: 1},
			{a: 1, id: 2},
			{a: 3, id: 3},
		]);
		done();
	});
});
