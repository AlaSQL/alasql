if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 117 - Table name resolution', function () {
	before(function () {
		alasql('create database test117');
		alasql('use test117');
		alasql('create table one (a int, b int)');
		alasql('insert into one values (10,100), (20,200), (30,300)');
		alasql('create table two (a int, b int, c int)');
		alasql('insert into two values (10,1,1), (20,2,2), (30,3,3)');
	});

	after(function () {
		alasql('drop database test117');
	});

	it('1. One table', function (done) {
		var res = alasql('select value sum(c) from one join two using a');
		assert(res == 6);
		done();
	});

	it.skip('2. One table', function (done) {
		var res = alasql('select value sum(b) from one join two using a');
		assert(res == 600);
		done();
	});

	it.skip('3. One table', function (done) {
		var res = alasql('select value sum(one.b) from one join two using a');
		assert(res == 600);
		done();
	});

	it.skip('4. One table', function (done) {
		var res = alasql('select value sum(two.b) from one join two using a');
		assert(res == 6);
		done();
	});
});
