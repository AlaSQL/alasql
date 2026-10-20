if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 63 - PIVOT', function () {
	it('Create new table', function (done) {
		alasql('create database test63');
		alasql('use database test63');
		alasql('drop table if exists sales');
		alasql('create table sales (city string, product string, qty int)');
		alasql('insert into sales values ("Minsk","Pen",100)');
		alasql('insert into sales values ("Minsk","Pencil",100)');
		alasql('insert into sales values ("Bratislava","Pen",50)');
		assert.equal(250, alasql('select value sum(qty) from sales'));
		done();
	});

	it('PIVOT - not yet created', function (done) {
		var res = alasql('select * from sales');

		//		alasql('drop database test63');
		done();
	});
});
