if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var zt = require('../lib/zt/zt.js');
}

describe('Test 114 - RANDOM()', function () {
	it('Select random values', function (done) {
		var res = alasql(
			'select row random() AS 0, random() AS 1, random(100) AS 2, random(100) AS 3 from ? a',
			[[1]]
		);
		assert(res.length == 4);
		assert(res[0] < 1);
		assert(res[1] < 1);
		assert(res[2] < 100);
		assert(res[3] < 100);
		done();
	});

	it('Create table with default constraint', function (done) {
		alasql('create database rnd');
		alasql('use rnd');
		alasql('create table one (a int default random(100))');
		alasql('insert into one values (10)');
		var res = alasql('select value count(*) from one');
		assert(res == 1);
		var res = alasql('select value a from one where a = 10');
		assert(res == 10);
		done();
	});

	it('Fill with random values', function (done) {
		alasql('insert into one default values');
		assert(alasql.databases.rnd.tables.one.data[1].a < 100);
		var res = alasql('select value count(*) from one');
		assert(res == 2);
		done();
	});
});
