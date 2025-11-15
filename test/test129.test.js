//
// tselect01.js
// Test for select
//

// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 129 - * /STAR / MULTIPLICATION', () => {
	test('UPDATE WHERE with multiplication in assignment and conditions', done => {
		var db = new alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT)');
		db.exec('INSERT INTO test VALUES (1,10,100)');
		db.exec('INSERT INTO test VALUES (2,20,200)');
		db.exec('INSERT INTO test VALUES (3,30,300)');
		db.exec('INSERT INTO test VALUES (4,40,400)');
		db.exec('INSERT INTO test VALUES (5,50,500)');

		//		console.log('There is a bug in parser')

		var res = db.exec('UPDATE test SET a = (c*100) WHERE b<=(3*10)');

		// console.log(res);
		// console.log(db.tables.test.recs);

		expect(3).toEqual(res);
		expect(10000).toEqual(db.tables.test.data[0].a);
		expect(20000).toEqual(db.tables.test.data[1].a);
		expect(30000).toEqual(db.tables.test.data[2].a);
		expect(4).toEqual(db.tables.test.data[3].a);
		expect(5).toEqual(db.tables.test.data[4].a);

		done();
	});
});
