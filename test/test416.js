if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 416;

describe('Test ' + test + ' Loosing expression with GROUP BY', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Test', function(done) {
		// prettier-ignore
		var res = alasql(function(){/*
	create table data( id INTEGER PRIMARY KEY, grp INTEGER);
	insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
	matrix of select id, id +1 from data group by id;
  */});

		assert.deepEqual(res[2], [
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
			[5, 6],
			[6, 7],
			[7, 8],
			[8, 9],
			[9, 10],
		]);

		done();
	});

	it.skip('2. Test', function(done) {
		var res = alasql(
			'matrix of select a.id, a.id +1, CAST(a.id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id'
		);

		assert.deepEqual(
			res[3],

			[[0, 1, 1], [1, 2, 2], [2, 3, 3], [3, 4, 4], [4, 5, 5], [5, 6, 6], [6, 7, 7]]
		);

		done();
	});

	it('3. Test Modified', function(done) {
		var res = alasql(function() {
			/*
  drop table if exists data;
	create table data( id INTEGER PRIMARY KEY, grp INTEGER);
	insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
	matrix of select id, (id +1), CAST(id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id order by a.id
  */
		});

		assert.deepEqual(
			res[3],

			[[0, 1, 1], [1, 2, 2], [2, 3, 3], [3, 4, 4], [4, 5, 5], [5, 6, 6], [6, 7, 7]]
		);

		done();
	});
});
