if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

describe('Test 412 ORDER BY unselected column (issue #379)', function () {
	before(function () {
		alasql('CREATE DATABASE test412; USE test412');
	});

	after(function () {
		alasql('DROP DATABASE test412');
	});

	it('1. CREATE TABLE, INSERT and SELECT', function (done) {
		alasql('create table sun (a int, b int); \
						insert into sun values (1,10),(2,5),(3,20);');

		var res1 = alasql('select a from sun order by b');
		var res2 = alasql('select a,b remove columns b from sun order by b');
		assert.deepEqual(res1, res2);
		done();
	});

	it('2. CREATE TABLE, INSERT and SELECT', function (done) {
		var res = alasql('SELECT a FROM ? ORDER BY id', [
			[
				{id: 2, a: 123},
				{id: 1, a: null},
			],
		]);
		//console.log(res);
		assert(res, [{a: null}, {a: 123}]);

		done();
	});

	it('3. CREATE TABLE, INSERT and SELECT', function (done) {
		var res = alasql('SELECT a, id REMOVE id FROM ? ORDER BY id', [
			[
				{id: 2, a: 123},
				{id: 1, a: null},
			],
		]);
		//console.log(res);
		assert(res, [{a: null}, {a: 123}]);
		done();
	});

	it('4. CREATE TABLE, INSERT and SELECT', function (done) {
		var res = alasql('SELECT a, id FROM ? ORDER BY 2', [
			[
				{id: 2, a: 1},
				{id: 1, a: 2},
				{id: 3, a: 3},
			],
		]);
		//  console.log(res);
		assert(res, [
			{a: 2, id: 1},
			{a: 1, id: 2},
			{a: 3, id: 3},
		]);
		done();
	});
});
