// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 121 - Views', function () {
	test('0. Create database', function (done) {
		alasql('create database test121');
		alasql('use test121');
		done();
	});

	test('1. CREATE VIEW', function (done) {
		alasql('create table one (a int, b int)');
		alasql('insert into one values (1,10), (2,20), (3,30)');

		alasql('create view two as select a from one');
		//		assert(!!alasql.databases.test121.tables.two);

		var res = alasql('select value sum(a) from two');
		assert(res == 6);

		alasql('drop view two');
		//		assert(!alasql.databases.test121.tables.two);
		done();
	});

	test('Clear database', function (done) {
		alasql('drop database test121');
		done();
	});
});
