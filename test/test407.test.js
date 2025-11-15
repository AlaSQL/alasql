// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 407 - TWO JOINS', () => {
	test('0.1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test407;USE test407');
		alasql.options.modifier = 'MATRIX';
		done();
	});

	test('0.2. Create table', done => {
		alasql(`
      CREATE TABLE one (id NVARCHAR(3));
      CREATE TABLE two (id NVARCHAR(3));
      CREATE TABLE three (id NVARCHAR(3));

      INSERT INTO one VALUES ('A'),('AB'),('AC'),('ABC');
      INSERT INTO two VALUES ('B'),('AB'),('BC'),('ABC');
      INSERT INTO three VALUES ('C'),('BC'),('AC'),('ABC')
    `);
		done();
	});

	test('1.1. INNER AND INNER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([['ABC', 'ABC', 'ABC']]);
		done();
	});

	test('1.2. INNER AND LEFT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['AB', 'AB', undefined],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('1.3. INNER AND RIGHT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('1.4. INNER AND OUTER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one INNER JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['AB', 'AB', undefined],
			['ABC', 'ABC', 'ABC'][(undefined, undefined, 'C')],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	test('2.1. LEFT AND INNER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([['ABC', 'ABC', 'ABC']]);
		done();
	});

	test('2.2. LEFT AND LEFT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('2.3. LEFT AND RIGHT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		console.log(res);
		expect(res).toEqual([
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('2.4. LEFT AND OUTER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one LEFT JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		console.log(res);
		expect(res).toEqual([
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'BC'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	test('3.1. RIGHT AND INNER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['ABC', 'ABC', 'ABC'],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	test('3.2. RIGHT AND LEFT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['AB', 'AB', undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, 'B', undefined],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	test.skip('3.3. RIGHT AND RIGHT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			[undefined, undefined, 'C'],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('3.4. RIGHT AND OUTER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one RIGHT JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		console.log(res);
		expect(res).toEqual([
			[undefined, 'B', undefined],
			['AB', 'AB', undefined],
			[undefined, 'BC', 'BC'],
			['ABC', 'ABC', 'ABC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	test('4.1. OUTER AND INNER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id INNER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['ABC', 'ABC', 'ABC'],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	test('4.2. OUTER AND LEFT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id LEFT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, 'B', undefined],
			[undefined, 'BC', 'BC'],
		]);
		done();
	});

	test.skip('4.3. OUTER AND RIGHT', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id RIGHT JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			[undefined, undefined, 'C'],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'AC'],
			['ABC', 'ABC', 'ABC'],
		]);
		done();
	});

	test.skip('4.4. OUTER AND OUTER', done => {
		var res = alasql(
			'SELECT one.id AS a, two.id AS b, three.id AS c FROM one OUTER JOIN two ON one.id = two.id OUTER JOIN three ON two.id = three.id'
		);
		expect(res).toEqual([
			['A', undefined, undefined],
			['AB', 'AB', undefined],
			['AC', undefined, undefined],
			['ABC', 'ABC', 'ABC'],
			[undefined, 'B', undefined],
			[undefined, 'BC', 'BC'],
			[undefined, undefined, 'C'],
			[undefined, undefined, 'AC'],
		]);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test407');
		done();
	});
});
