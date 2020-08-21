if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 11', function () {
	it('Test compile with parameters', function (done) {
		alasql.exec('DROP TABLE IF EXISTS test');

		alasql.exec('CREATE TABLE test (a int, b int)');
		var insert = alasql.compile('INSERT INTO test VALUES ($a,$b)');
		insert({a: 1, b: 1});
		insert({a: 2, b: 2});

		var insert2 = alasql.compile('INSERT INTO test VALUES (:a,:b)');
		insert2({a: 3, b: 3});
		insert2({a: 4, b: 4});

		alasql.exec('INSERT INTO test VALUES (?,?)', [5, 5]);

		alasql.exec('UPDATE test SET b = 6 WHERE b = ?', [5]);

		var res = alasql.exec('SELECT * FROM test WHERE b > 5');
		assert.deepEqual([{a: 5, b: 6}], res);

		alasql.exec('DELETE FROM test WHERE a > :val', {val: 1});

		var res = alasql.exec('SELECT * FROM test');
		assert.deepEqual([{a: 1, b: 1}], res);

		done();
	});
});
