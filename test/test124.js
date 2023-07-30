if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 124 - column AS alias syntax', function () {
	it('1. Prepare database and select', function (done) {
		alasql('create database test124');
		alasql('use test124');
		alasql('create table one (a int, b int, c string)');
		alasql('create table two (b int)');
		alasql('insert into one values (1,1,1), (2,2,2), (4,4,4), (5,5,5), (6,6,6)');
		alasql('insert into two values (1),(2),(3),(6)');

		var res = alasql('select one.a q, two.b AS w from one join two using b');

		assert.deepEqual(res, [
			{q: 1, w: 1},
			{q: 2, w: 2},
			{q: 6, w: 6},
		]);
		alasql('drop database test124');
		done();
	});
});
