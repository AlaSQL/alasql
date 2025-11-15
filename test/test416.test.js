// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 416;

describe('Test ' + testId + ' Loosing expression with GROUP BY', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Test', done => {
		var res = alasql(`
create table data( id INTEGER PRIMARY KEY, grp INTEGER);
insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
matrix of select id, id +1 from data group by id;
`);

		expect(res[2]).toEqual([
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
			[5, 6],
			[6, 7],
			[7, 8],
			[8, 9],
			[9, 10],
		]);

		done();
	});

	test.skip('2. Test', done => {
		var res = alasql(
			'matrix of select a.id, a.id +1, CAST(a.id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id'
		);

		expect(res[3]).toEqual([
			[0, 1, 1],
			[1, 2, 2],
			[2, 3, 3],
			[3, 4, 4],
			[4, 5, 5],
			[5, 6, 6],
			[6, 7, 7],
		]);

		done();
	});

	test('3. Test Modified', done => {
		var res = alasql(`
  drop table if exists data;
create table data( id INTEGER PRIMARY KEY, grp INTEGER);
insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
matrix of select id, (id +1), CAST(id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id order by a.id
  `);

		expect(res[3]).toEqual([
			[0, 1, 1],
			[1, 2, 2],
			[2, 3, 3],
			[3, 4, 4],
			[4, 5, 5],
			[5, 6, 6],
			[6, 7, 7],
		]);

		done();
	});
});
