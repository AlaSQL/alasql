if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2377B'; // Deleted rows are copied only when OUTPUT or an AFTER DELETE trigger needs them

describe(`Test ${testId} - DELETE keeps deleted rows only when needed`, function () {
	var got = [];

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql.fn.LOG2377B = function (row) {
			got.push(row);
		};
		alasql('CREATE TABLE t (id INT)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Without a trigger', function () {
		alasql('INSERT INTO t VALUES (1), (2), (3)');
		assert.strictEqual(alasql('DELETE FROM t WHERE id = 1'), 1);
		assert.deepStrictEqual(alasql('SELECT * FROM t'), [{id: 2}, {id: 3}]);
	});

	it('B) The same DELETE after a trigger is added passes the deleted row', function () {
		alasql('INSERT INTO t VALUES (1)');
		alasql('CREATE TRIGGER tr2377b AFTER DELETE ON t LOG2377B');
		assert.strictEqual(alasql('DELETE FROM t WHERE id = 1'), 1);
		assert.deepStrictEqual(got, [{id: 1}]);
	});

	it('C) After the trigger is dropped, no row is passed', function () {
		alasql('DROP TRIGGER tr2377b');
		alasql('INSERT INTO t VALUES (1)');
		alasql('DELETE FROM t WHERE id = 1');
		assert.deepStrictEqual(got, [{id: 1}]);
	});

	it('D) OUTPUT still returns the deleted rows', function () {
		var res = alasql('DELETE FROM t WHERE id = 2 OUTPUT DELETED.id');
		assert.deepStrictEqual(res, [{id: 2}]);
	});
});
