// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('378. Primary key with DELETE ALL', () => {
	test('1. ', done => {
		function range(i) {
			return i ? range(i - 1).concat({id: i}) : [];
		}
		var data = range(100);
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (id INT NOT NULL PRIMARY KEY)');
		db.exec('INSERT INTO test SELECT * FROM ?', [data]);
		//console.log(db.exec("SELECT * FROM test"));
		expect(db.exec('SELECT * FROM test').length == 100).toBe(true);

		db.exec('DELETE FROM test');
		db.exec('INSERT INTO test SELECT * FROM ?', [data]);
		expect(db.exec('SELECT * FROM test').length == 100).toBe(true);
		//      console.log(db.exec("select * from test"))

		//        expect(success).toBe(true);
		done();
	});
});
