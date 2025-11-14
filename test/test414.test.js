// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testNum = 414;

describe('Test ' + testNum + ' SELECT FROM VIEW', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testNum + ';USE test' + testNum);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testNum);
	});

	test('3. Test', function (done) {
		var res = alasql(`
			create table data( id INTEGER PRIMARY KEY);
			insert into data values (1);
			insert into data values (2);
			select a.id , ifNULL((select MIN(b.id) from data as b where a.id < b.id), 0) b_id from data as a;
		`);
		done();
	});

	test('4. Test', function (done) {
		var res = alasql(`
			create view view1 as select a.id , ifNULL((select MIN(b.id) from data as b where a.id < b.id), 0) b_id from data as a;
		`);
		done();
	});

	test.skip('5. Test', function (done) {
		var res = alasql(`
			select a.id from view1;
		`);
		done();
	});
});
