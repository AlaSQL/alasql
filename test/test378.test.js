// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('378. Primary key with DELETE ALL', function () {
	test('1. ', function (done) {
		function range(i) {
			return i ? range(i - 1).concat({id: i}) : [];
		}
		var data = range(100);
		var db = new alasql.Database('db');
		db.exec('CREATE TABLE test (id INT NOT NULL PRIMARY KEY)');
		db.exec('INSERT INTO test SELECT * FROM ?', [data]);
		//console.log(db.exec("SELECT * FROM test"));
		assert(db.exec('SELECT * FROM test').length == 100);

		db.exec('DELETE FROM test');
		db.exec('INSERT INTO test SELECT * FROM ?', [data]);
		assert(db.exec('SELECT * FROM test').length == 100);
		//      console.log(db.exec("select * from test"))

		//        assert(success);
		done();
	});
});
