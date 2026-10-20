if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 536 - GROUP BY on field of type INTEGER with table prefix', function () {
	const test = '536B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Simple GROUP BY with arithmetic on INTEGER field (baseline)', function () {
		alasql('create table data( id INTEGER PRIMARY KEY, grp INTEGER)');
		alasql('insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range');

		var res = alasql('select id, id +1 as id_plus_1 from data group by id');

		// Check that the arithmetic operation works correctly
		assert.strictEqual(res.length, 10);
		assert.strictEqual(res[0].id, 0);
		assert.strictEqual(res[0].id_plus_1, 1);
		assert.strictEqual(res[1].id, 1);
		assert.strictEqual(res[1].id_plus_1, 2);
		assert.strictEqual(res[9].id, 9);
		assert.strictEqual(res[9].id_plus_1, 10);
	});

	it('B) GROUP BY with table prefix in SELECT arithmetic operations', function () {
		alasql('create table data2( id INTEGER PRIMARY KEY, grp INTEGER)');
		alasql('insert into data2 select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range');

		// This is the failing case from the issue
		var res = alasql(
			'select a.id, a.id +1 as id_plus_1, CAST(a.id AS INTEGER) +1 as cast_plus_1 ' +
				'from data2 as a, data2 as b ' +
				'where a.id < b.id and a.grp = b.grp ' +
				'group by a.id'
		);

		// Should have 7 rows (0,1,2,3,4,5,6 have matching pairs)
		assert.strictEqual(res.length, 7);

		// Check first row
		assert.strictEqual(res[0].id, 0);
		assert.strictEqual(res[0].id_plus_1, 1, 'a.id + 1 should equal 1 for id=0');
		assert.strictEqual(res[0].cast_plus_1, 1, 'CAST(a.id AS INTEGER) + 1 should equal 1 for id=0');

		// Check another row
		assert.strictEqual(res[2].id, 2);
		assert.strictEqual(res[2].id_plus_1, 3, 'a.id + 1 should equal 3 for id=2');
		assert.strictEqual(res[2].cast_plus_1, 3, 'CAST(a.id AS INTEGER) + 1 should equal 3 for id=2');
	});

	it('C) GROUP BY with table prefix - without table prefix in expressions (workaround)', function () {
		alasql('create table data3( id INTEGER PRIMARY KEY, grp INTEGER)');
		alasql('insert into data3 select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range');

		// The workaround mentioned in the issue - use column names without table prefix in expressions
		var res = alasql(
			'select a.id, (id +1) as id_plus_1, CAST(id AS INTEGER) +1 as cast_plus_1 ' +
				'from data3 as a, data3 as b ' +
				'where a.id < b.id and a.grp = b.grp ' +
				'group by a.id'
		);

		// Should work correctly
		assert.strictEqual(res.length, 7);
		assert.strictEqual(res[0].id, 0);
		assert.strictEqual(res[0].id_plus_1, 1);
		assert.strictEqual(res[0].cast_plus_1, 1);
	});
});
