if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 118 - ADD COLUMN/MODIFY COLUMN/DROP COLUMN', function () {
	it('ADD COLUMN', function (done) {
		alasql('create database test118');
		alasql('use test118');

		alasql('create table one (a int)');
		alasql('insert into one values (1), (2), (3)');
		var res = alasql('select * from one order by a');
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}]);

		alasql('alter table one add column b int');
		alasql('insert into one values (4,40)');
		var res = alasql('select * from one where b = 40');
		assert.deepEqual(res, [{a: 4, b: 40}]);

		alasql('alter table one modify column b string');
		// Tests are not yet defined

		alasql('alter table one drop column b');
		var res = alasql('select * from one order by a');
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}, {a: 4}]);

		done();
	});

	it('Clear database', function (done) {
		alasql('drop database test118');
		done();
	});
});
