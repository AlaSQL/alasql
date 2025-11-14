// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 417;

describe('Test ' + testId + ' Add JSON data directly to the table', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Create table', function (done) {
		alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
		alasql.tables.one.data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		alasql.tables.one.indexColumns();
		done();
	});

	test.skip('2. Test inserr', function (done) {
		assert.throws(Error, function () {
			alasql('INSERT INTO one VALUES (3,30)');
		});
		done();
	});

	// test('3. Test wrong insert',function(done){
	//   alasql('INSERT INTO one VALUES (1,40)');
	//   var res = alasql('select * from one');
	//   console.log(res);
	//   done();
	// });
});
