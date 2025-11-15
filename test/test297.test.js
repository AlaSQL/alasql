// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 297 INSERT,DELETE,UDPATE with subqueries', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test297;USE test297');
		alasql('CREATE TABLE one(a INT, b INT)');
		alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30)');
		done();
	});

	test.skip('2. DELETE', done => {
		var res = alasql('DELETE FROM one WHERE a = (SELECT MAX(a) FROM one)');
		expect(res).toEqual(1);
		done();
	});

	test.skip('3. UPDATE', done => {
		var res = alasql('UPDATE one SET b = 100 WHERE a = (SELECT MAX(a) FROM one)');
		expect(res).toEqual(1);
		var res = alasql('SELECT * FROM one');
		expect(res).toEqual([
			{a: 1, b: 10},
			{a: 2, b: 100},
		]);
		done();
	});

	test.skip('4. INSERT', done => {
		var res = alasql('INSERT INTO one VALUES (5,(SELECT MAX(b) FROM one)+1)');
		expect(res).toEqual(1);
		var res = alasql('SELECT * FROM one');
		//    console.log(res);
		expect(res).toEqual([
			{a: 1, b: 10},
			{a: 2, b: 100},
			{a: 5, b: 101},
		]);
		done();
	});

	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test297');
		done();
	});
});
