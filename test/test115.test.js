// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 115 - CROSS and NATURAL JOINS', () => {
	test('Create first table with default values', done => {
		alasql('create database test115');
		alasql('use test115');
		alasql('create table one (a int, b int, c int)');
		for (var i = 0; i < 100; i++) {
			alasql('insert into one values (?,?,?)', [i, i * 10, i * 100]);
		}
		var res = alasql('select value count(*) from one');
		expect(res == 100).toBe(true);
		done();
	});

	test('Create second table with default values', done => {
		alasql('create table two (b int, c int, d int)');
		for (var i = 0; i < 100; i++) {
			alasql('insert into two values (?,?,?)', [i * 10, i * 100, i % 5]);
		}
		var res = alasql('select value count(*) from two');
		expect(res == 100).toBe(true);
		done();
	});

	test('Cross join - FROM form', done => {
		var res = alasql('select * from one cross join two');
		//		console.log(res.length);
		expect(res.length == 10000).toBe(true); // cross join gives 1000000
		done();
	});

	test('Cross join - JOIN form', done => {
		var res = alasql('select * from one, two');
		//		console.log(res.length);
		expect(res.length == 10000).toBe(true); // cross join gives 1000000
		done();
	});

	test('Natural join', done => {
		var res = alasql('select * from one natural join two');
		//		console.log(res.length);
		expect(res.length == 100).toBe(true); // cross join gives 1000000
		done();
	});

	test('Natural left join', done => {
		var res = alasql('select * from one natural left outer join two');
		//		console.log(res.length);
		expect(res.length == 100).toBe(true); // cross join gives 1000000
		done();
	});
});
