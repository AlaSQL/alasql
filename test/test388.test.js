// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 388 UNION ALL bug issue #485', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test388;USE test388');
		done();
	});

	var data1 = [
		{ID: 111, Name: 'John', Month: 'January', Savings: 100},
		{ID: 122, Name: 'Rianna', Month: 'Feb', Savings: 200},
		{ID: 133, Name: 'Michael', Month: 'Mar', Savings: 300},
	];

	var data2 = [
		{ID: 101, Name: 'Valentin', Month: 'January', Savings: 10000},
		{ID: 102, Name: 'Olga', Month: 'Feb', Savings: 20000},
		{ID: 103, Name: 'Alesya', Month: 'Mar', Savings: 300000},
	];

	test('2. Prepare tables', done => {
		alasql(
			'CREATE TABLE t1 (' + 'ID INT,' + 'Name STRING,' + 'Month STRING,' + 'Savings MONEY' + ')'
		);
		alasql('SELECT * INTO t1 FROM ?', [data1]);

		alasql(
			'CREATE TABLE t2 (' + 'ID INT,' + 'Name STRING,' + 'Month STRING,' + 'Savings MONEY' + ')'
		);
		alasql('SELECT * INTO t2 FROM ?', [data2]);

		done();
	});

	test('3. SELECTs', done => {
		var res = alasql('SELECT * FROM t1 UNION SELECT * FROM t2');
		//console.log(res);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test388');
		done();
	});
});
