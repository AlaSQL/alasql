// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 43', () => {
	//	describe('Dates', function(){

	var db = new alasql.Database('test43');

	test('Create database', done => {
		// alasql('create database test43');
		// alasql('use test43');

		alasql.fn.Date = Date;
		db.exec('DROP TABLE IF EXISTS orders');
		db.exec('CREATE TABLE orders (orderid INT, orderdate Date)');

		// db = alasql.databases.test43;
		var data = db.tables.orders.data;
		data.push({orderid: 1, orderdate: new Date(2014, 1, 1)});
		data.push({orderid: 2, orderdate: new Date(2012, 0, 5)});
		data.push({orderid: 3, orderdate: new Date(2014, 0, 1)});
		data.push({orderid: 4, orderdate: new Date(2014, 0, 3)});
		data.push({orderid: 5, orderdate: new Date(2013, 10, 12)});
		data.push({orderid: 6, orderdate: new Date(2014, 3, 28)});
		data.push({orderid: 7, orderdate: new Date(2014, 7, 6)});
		data.push({orderid: 8, orderdate: new Date(2013, 10, 12)});
		done();
	});

	test('Order by dates ASC', done => {
		var res = db.exec('SELECT COLUMN orderdate FROM orders ORDER BY orderdate');

		var ok =
			res[0] <= res[1] &&
			res[1] <= res[2] &&
			res[2] <= res[3] &&
			res[3] <= res[4] &&
			res[4] <= res[5] &&
			res[5] <= res[6] &&
			res[6] <= res[7];

		expect(true).toEqual(ok);
		done();
	});

	test('Order by dates DESC', done => {
		var res = db.exec('SELECT COLUMN orderdate FROM orders ORDER BY orderdate DESC');

		var ok =
			res[0] >= res[1] &&
			res[1] >= res[2] &&
			res[2] >= res[3] &&
			res[3] >= res[4] &&
			res[4] >= res[5] &&
			res[5] >= res[6] &&
			res[6] >= res[7];

		expect(true).toEqual(ok);
		done();
	});

	test('Dates parsing in INSERT', done => {
		db.exec("INSERT INTO orders VALUES (10,'2015-10-20')");

		var res = db.exec('SELECT VALUE orderdate FROM orders WHERE orderid = 10');
		expect(res.valueOf()).toEqual(new Date('2015-10-20').valueOf());
		done();
	});

	/*
		test('Dates parsing in SELECT', function(done){
			db.exec("SELECT orders VALUES (10,'2015-10-20')");

			var res = db.queryValue('SELECT orderdate FROM orders WHERE orderid = 10');
			expect(res.valueOf()).toEqual(new Date("2015-10-20").valueOf());
			done();
		});
*/

	//	});
});
