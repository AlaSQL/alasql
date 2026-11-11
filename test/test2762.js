if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2762'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - INDEXED BY and NOT INDEXED after a table name`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (x INTEGER)');
		alasql('INSERT INTO t1 VALUES (1), (2)');
		alasql('CREATE INDEX t1i1 ON t1 (x)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) INDEXED BY is accepted and ignored', function () {
		assert.deepStrictEqual(alasql('SELECT x FROM t1 INDEXED BY t1i1 WHERE x > 1'), [{x: 2}]);
	});

	it('B) after an alias', function () {
		let res = [];
		res.push(alasql('SELECT a.x FROM t1 AS a INDEXED BY t1i1 ORDER BY a.x'));
		res.push(alasql('SELECT a.x FROM t1 a NOT INDEXED WHERE a.x = 1'));
		assert.deepStrictEqual(res, [[{x: 1}, {x: 2}], [{x: 1}]]);
	});

	it('C) group_concat with the separator as second argument', function () {
		assert.deepStrictEqual(alasql("SELECT group_concat(x, ':') AS g FROM t1 NOT INDEXED"), [
			{g: '1:2'},
		]);
	});
});
