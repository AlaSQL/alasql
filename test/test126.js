if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 126 ALTER TABLE RENAME COLUMN', function () {
	it('1. Rename column', function (done) {
		alasql('create database test126');
		alasql('use test126');
		alasql('create table one (a int, b int, c string)');
		alasql('insert into one values (1,1,1), (2,2,2)');
		alasql('alter table one rename column b to bbb');
		assert(!alasql.tables.one.xcolumns.b);
		assert(!!alasql.tables.one.xcolumns.bbb);

		var res = alasql('select * from one');
		assert.deepEqual(res, [
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);
		done();
	});

	it('2. Rename table', function (done) {
		alasql('rename table one to two');
		assert(!alasql.tables.one);
		assert(!!alasql.tables.two);

		var res = alasql('select * from two');
		assert.deepEqual(res, [
			{a: 1, bbb: 1, c: 1},
			{a: 2, bbb: 2, c: 2},
		]);
		done();
	});

	it('3. Drop column', function (done) {
		alasql('alter table two drop column a');
		assert(!alasql.tables.two.xcolumns.a);

		var res = alasql('select * from two');
		assert.deepEqual(res, [
			{bbb: 1, c: 1},
			{bbb: 2, c: 2},
		]);

		alasql('drop database test126');
		done();
	});
});
