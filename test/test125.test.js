// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 125 - remove comments', () => {
	test('1. usual -- comments', done => {
		alasql('create database test125 -- this is a sample of comments');
		alasql('use test125');
		alasql('create table one (a int, /* int eeee, */ b int, c string)');
		//		alasql('-- my comments \n\r create table two (b int)');
		alasql('create  -- my comments \n table two (b int) ');
		alasql(
			'insert into one values (1,1,1), (2,2,2), /* (0,0,0), (1,2,3), -- */ (4,4,4), (5,5,5), (6,6,6)'
		);
		alasql('insert into two values (1),(2),(3),(6)');

		var res = alasql(
			'select one.a q, two.b AS w from one join two /* one on a=b*/ using b -- dddkjslkjas alksdj akj af;sdkj a'
		);

		expect(res).toEqual([
			{q: 1, w: 1},
			{q: 2, w: 2},
			{q: 6, w: 6},
		]);
		done();
	});
	test('2. Escape sequences', done => {
		var res = alasql("select 'Cote'");
		expect(res).toEqual([{"'Cote'": 'Cote'}]);
		var res = alasql("select 'Cote d\\'Ivoir'");
		expect(res).toEqual([{"'Cote d'Ivoir'": "Cote d'Ivoir"}]);
		var res = alasql("select 'Cote d''Ivoir'");
		expect(res).toEqual([{"'Cote d'Ivoir'": "Cote d'Ivoir"}]);
		var res = alasql('select "Cote d\\"Ivoir"');
		expect(res).toEqual([{"'Cote d\\\"Ivoir'": 'Cote d\\"Ivoir'}]);
		var res = alasql('select "\\r"');
		expect(res).toEqual([{"'\\r'": '\\r'}]);
		var res = alasql('select "\\n"');
		expect(res).toEqual([{"'\\n'": '\\n'}]);

		alasql('drop database test125');
		done();
	});
});
