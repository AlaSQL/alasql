if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2884'; // SET @x = f() in a trigger body sets the variable, only CALL f() gets the row

describe(`Test ${testId} - SET with a function in a trigger`, function () {
	var got = [];

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql.fn.MYF2884 = function () {
			got.push(Array.from(arguments));
			return 42;
		};
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	beforeEach(function () {
		got.length = 0;
	});

	it('A) SET @x = f() sets the variable and f gets no row', function () {
		alasql('CREATE TABLE a (id INT)');
		alasql('CREATE TRIGGER a2884 AFTER INSERT ON a SET @v2884 = MYF2884()');
		alasql('INSERT INTO a VALUES (1)');
		assert.deepStrictEqual([got, alasql.vars.v2884], [[[]], 42]);
	});

	it('B) CALL f() without arguments still gets the row', function () {
		alasql('CREATE TABLE b (id INT)');
		alasql('CREATE TRIGGER b2884 AFTER INSERT ON b CALL MYF2884()');
		alasql('INSERT INTO b VALUES (2)');
		assert.deepStrictEqual(got, [[{id: 2}]]);
	});
});
