// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 417;

describe('Test ' + testId + ' Add JSON data directly to the table', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Create table', done => {
		alasql('CREATE TABLE test417.one (a INT PRIMARY KEY, b INT)');
		alasql.databases.test417.tables.one.data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		alasql.databases.test417.tables.one.indexColumns();
		done();
	});

	test.skip('2. Test inserr', done => {
		expect(() => {
			alasql('INSERT INTO test417.one VALUES (3,30)');
		}).toThrow(Error);
		done();
	});

	// test('3. Test wrong insert',function(done){
	//   alasql('INSERT INTO one VALUES (1,40)');
	//   var res = alasql('select * from one');
	//   console.log(res);
	//   done();
	// });
});
