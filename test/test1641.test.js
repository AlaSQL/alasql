// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// only run in browser
if (typeof window !== 'undefined')
	describe('Test 1641 - indexdb should be able to run multiple statement queries', () => {
		beforeAll(() => {
			// delete indexeddb
			return alasql.promise('DROP IndexedDB DATABASE IF EXISTS alatest;');
		});
		test('A) From single lines', done => {
			return alasql
				.promise(
					'CREATE INDEXEDDB DATABASE IF NOT EXISTS alatest;' +
						'ATTACH INDEXEDDB DATABASE alatest;' +
						'USE alatest'
				)
				.then(function (res) {
					return alasql.promise([
						'CREATE TABLE IF NOT EXISTS mytable1 ( myid STRING, myname STRING )',
						'CREATE TABLE IF NOT EXISTS mytable2 ( myid STRING, myname STRING )',
					]);
				})
				.then(function (res) {
					return alasql.promise([
						"INSERT INTO mytable1 (myid,myname) VALUES ( '1', 'Mr. One' )",
						"INSERT INTO mytable2 (myid,myname) VALUES ( '2', 'Mr. Two' )",
					]);
				})
				.then(function (res) {
					return alasql.promise(['SELECT * from mytable1', 'SELECT * from mytable2']);
				})
				.then(function ([data1, data2]) {
					expect(data1).toEqual([{myid: '1', myname: 'Mr. One'}]);
					expect(data2).toEqual([{myid: '2', myname: 'Mr. Two'}]);
					done();
				});
		});
	});
