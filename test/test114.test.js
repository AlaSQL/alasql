// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 114 - RANDOM()', () => {
	test('Select random values', done => {
		var res = alasql(
			'select row random() AS 0, random() AS 1, random(100) AS 2, random(100) AS 3 from ? a',
			[[1]]
		);
		expect(res.length == 4).toBe(true);
		expect(res[0] < 1).toBe(true);
		expect(res[1] < 1).toBe(true);
		expect(res[2] < 100).toBe(true);
		expect(res[3] < 100).toBe(true);
		done();
	});

	test('Create table with default constraint', done => {
		alasql('create database rnd');
		alasql('use rnd');
		alasql('create table one (a int default random(100))');
		alasql('insert into one values (10)');
		var res = alasql('select value count(*) from one');
		expect(res == 1).toBe(true);
		var res = alasql('select value a from one where a = 10');
		expect(res == 10).toBe(true);
		done();
	});

	test('Fill with random values', done => {
		alasql('insert into one default values');
		expect(alasql.databases.rnd.tables.one.data[1].a < 100).toBe(true);
		var res = alasql('select value count(*) from one');
		expect(res == 2).toBe(true);
		done();
	});
});
