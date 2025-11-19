// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var testId = 3;

describe.skip('Test 03 - ' + testId + 'times', () => {
	var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
	var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (999,'Northern Pacific School')";
	var sql3 = "INSERT INTO schools VALUES (998,'Western Pacific School')";

	// zt('Start', testId, () => {});

	test('0. Create table', () => {
		alasql('create database test03; use test03');
		alasql('drop table if exists schools');
		var res = alasql(sql1);
		expect(res).toEqual(1, 'CREATE TABLE should return 1');
	});

	test('1. Test insert with columns ', () => {
		var res = alasql(sql2);
		expect(res).toEqual(1, 'INSERT should affect 1 row');
	});

	test('2. Test insert without columns', () => {
		var res = alasql(sql3);
		expect(res).toEqual(1, 'INSERT should affect 1 row');
	});

	test('3. Test insert without compilation #1', () => {
		var res = alasql(sql3);
		expect(res).toEqual(1, 'INSERT should affect 1 row');
	});

	test('4. Test insert without compilation and caching', () => {
		var res = alasql(sql3.replace('999', (Math.random() * 1000) | 0));
		expect(res).toEqual(1, 'INSERT should affect 1 row');
	});

	test('5. Test compiled insert', () => {
		var insert1 = alasql.compile(sql3);
		var res = insert1();
		expect(res).toEqual(1, 'Compiled INSERT should affect 1 row');
	});

	test('6. Test compiled insert with parameters', () => {
		var insert2 = alasql.compile('INSERT INTO schools VALUES (?,?)');
		var res = insert2([1, 'Canterberry High School']);
		expect(res).toEqual(1, 'Compiled INSERT with params should affect 1 row');
	});

	test('COUNT(*)', () => {
		var res = alasql('SELECT COUNT(*) FROM schools');
		//		console.log(res);
		expect(6 * testId).toEqual(res[0]['COUNT(*)']);
	});

	test('Drop database', () => {
		alasql('drop database test03');
	});

	//    zt.log();
});
