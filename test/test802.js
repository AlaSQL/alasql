if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '802'; // insert test file number

describe('Test ' + test + ' - ORDER BY does not support parameter #1100', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE TABLE example1 (a INT, b INT)');
		alasql.tables.example1.data = [
			{a: 2, b: 6},
			{a: 3, b: 4},
			{a: 1, b: 5},
		];
		done();
	});

	it('2. Async ORDERBY operation works without argument', function (done) {
		//
		alasql.promise('SELECT * FROM example1 ORDER BY b').then(function (res) {
			assert.deepEqual(res, [
				{
					a: 3,
					b: 4,
				},
				{
					a: 1,
					b: 5,
				},
				{
					a: 2,
					b: 6,
				},
			]);
			done();
		});
	});

	it('3. Async ORDERBY operation works with arguments passed', function (done) {
		//
		alasql.promise('SELECT * FROM example1 ORDER BY ?', ['b']).then(function (res) {
			assert.deepEqual(res, [
				{
					a: 3,
					b: 4,
				},
				{
					a: 1,
					b: 5,
				},
				{
					a: 2,
					b: 6,
				},
			]);
			done();
		});
	});
});
