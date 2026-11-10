if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2685'; // A CALL trigger with arguments gets the arguments it was written with

describe(`Test ${testId} - CALL trigger arguments`, function () {
	var got = [];

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql.fn.LOG2685 = function () {
			got.push(Array.from(arguments));
		};
		alasql('CREATE TABLE t (id INT)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	beforeEach(function () {
		got.length = 0;
	});

	it('A) CALL with arguments gets those arguments', function () {
		alasql("CREATE TRIGGER a2685 AFTER INSERT ON t CALL LOG2685('hello', 42)");
		alasql('INSERT INTO t VALUES (1)');
		assert.deepStrictEqual(got, [['hello', 42]]);
		alasql('DROP TRIGGER a2685');
	});

	it('B) CALL without arguments gets the row', function () {
		alasql('CREATE TRIGGER b2685 AFTER INSERT ON t CALL LOG2685()');
		alasql('INSERT INTO t VALUES (2)');
		assert.deepStrictEqual(got, [[{id: 2}]]);
		alasql('DROP TRIGGER b2685');
	});

	it('C) CALL with arguments on UPDATE and DELETE', function () {
		alasql("CREATE TRIGGER c2685 BEFORE UPDATE ON t CALL LOG2685('upd')");
		alasql("CREATE TRIGGER d2685 AFTER DELETE ON t CALL LOG2685('del')");
		alasql('UPDATE t SET id = 3 WHERE id = 2');
		alasql('DELETE FROM t WHERE id = 3');
		assert.deepStrictEqual(got, [['upd'], ['del']]);
	});
});
