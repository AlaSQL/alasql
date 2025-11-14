// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
 This sample beased on this article:

*/
describe('Test 390 Export nested array to XLSX', function () {
	test('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test390;USE test390');
		done();
	});

	test('2. Prepare tables', function (done) {
		var data = [
			{
				a: 'test',
				b: [
					{
						c: 'test1',
						d: 'test2',
					},
					{c: 'test2', d: 'test1'},
				],
			},
			{
				a: 'testB',
				b: [
					{
						c: 'test3',
						d: 'test4',
					},
					{c: 'test5', d: 'test6'},
				],
			},
		];
		var res = alasql(
			'SEARCH / AS @p b / CLONEDEEP() SET(a=@p->a) INTO XLSX("test390.xlsx",{headers:true}) FROM ?',
			[data]
		);
		assert(res == 1);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test390');
		done();
	});
});
