if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2814'; // UPDATE and DELETE with a table-qualified column

describe(`Test ${testId} - UPDATE and DELETE with a table-qualified column`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) A qualified column in SET and WHERE of UPDATE', function () {
		alasql('CREATE TABLE t (u INT)');
		alasql('INSERT INTO t VALUES (1), (2)');
		assert.strictEqual(alasql('UPDATE t SET u = t.u + 1'), 2);
		assert.strictEqual(alasql('UPDATE t SET u = 0 WHERE t.u > 2'), 1);
		assert.deepStrictEqual(alasql('SELECT u FROM t'), [{u: 2}, {u: 0}]);
	});

	it('B) The bare column still works', function () {
		alasql('UPDATE t SET u = u + 10 WHERE u = 0');
		assert.deepStrictEqual(alasql('SELECT u FROM t'), [{u: 2}, {u: 10}]);
	});

	it('C) A qualified column in WHERE of DELETE', function () {
		assert.strictEqual(alasql('DELETE FROM t WHERE t.u > 5'), 1);
		assert.deepStrictEqual(alasql('SELECT u FROM t'), [{u: 2}]);
	});

	it('D) A qualified column with a parameter', function () {
		alasql('UPDATE t SET u = t.u * ? WHERE t.u = ?', [3, 2]);
		assert.deepStrictEqual(alasql('SELECT u FROM t'), [{u: 6}]);
	});
	it('E) A subquery that reads the changed row by the table name', function () {
		alasql('CREATE TABLE staff (empnum CHAR(3), grade INT, city CHAR(15))');
		alasql(
			"INSERT INTO staff VALUES ('E1', 12, 'Deale'), ('E2', 10, 'Vienna'), ('E3', 13, 'Vienna')"
		);
		alasql('CREATE TABLE works (empnum CHAR(3), pnum CHAR(3), hours INT)');
		alasql("INSERT INTO works VALUES ('E1', 'P1', 40), ('E2', 'P1', 20)");
		alasql(
			'UPDATE staff SET grade = 10 * staff.grade WHERE staff.empnum NOT IN (SELECT works.empnum FROM works WHERE staff.empnum = works.empnum)'
		);
		assert.deepStrictEqual(alasql('SELECT empnum, grade FROM staff'), [
			{empnum: 'E1', grade: 12},
			{empnum: 'E2', grade: 10},
			{empnum: 'E3', grade: 130},
		]);
		alasql(
			"DELETE FROM works WHERE EXISTS (SELECT * FROM staff WHERE staff.empnum = works.empnum AND staff.city = 'Vienna')"
		);
		assert.deepStrictEqual(alasql('SELECT empnum FROM works'), [{empnum: 'E1'}]);
	});

	it('F) A subquery over the same table is not correlated', function () {
		alasql('DELETE FROM staff WHERE grade < (SELECT MAX(grade) FROM staff)');
		assert.deepStrictEqual(alasql('SELECT empnum FROM staff'), [{empnum: 'E3'}]);
	});
});
