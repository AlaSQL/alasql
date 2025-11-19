// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
 This sample beased on this article:

*/
describe.concurrent('Test 390 Export nested array to XLSX', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test390;USE test390');
		done();
	});

	test('2. Prepare tables', done => {
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
			'SEARCH / AS @p b / CLONEDEEP() SET(a=@p->a) INTO XLSX("./test/test390.xlsx",{headers:true}) FROM ?',
			[data]
		);
		expect(res == 1).toBe(true);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test390');
		done();
	});
});
