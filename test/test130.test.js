//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 130 - UPDATE', () => {
	test('UPDATE without conditions', done => {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a int, b int)');
		db.exec('INSERT INTO test VALUES (1,1)');
		db.exec('INSERT INTO test VALUES (1,7)');
		db.exec('INSERT INTO test VALUES (2,2)');
		db.exec('INSERT INTO test VALUES (3,3)');

		var res = db.exec('UPDATE test SET a = (b+100)');

		expect(4).toEqual(res);
		expect(101).toEqual(db.tables.test.data[0].a);
		done();
	});

	test('UPDATE WHERE with conditions', done => {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		var res = db.exec('UPDATE test SET a = c WHERE b<=30');

		// console.log(res);
		// console.log(db.tables.test.recs);

		expect(3).toEqual(res);
		expect(100).toEqual(db.tables.test.data[0].a);
		expect(200).toEqual(db.tables.test.data[1].a);
		expect(300).toEqual(db.tables.test.data[2].a);
		expect(4).toEqual(db.tables.test.data[3].a);
		expect(5).toEqual(db.tables.test.data[4].a);

		done();
	});
});
