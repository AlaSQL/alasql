if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2801'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - INTERSECT ALL and EXCEPT ALL`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE a (x INT)');
		alasql('INSERT INTO a VALUES (1), (1), (1), (2)');
		alasql('CREATE TABLE b (x INT)');
		alasql('INSERT INTO b VALUES (1), (1), (3)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) INTERSECT ALL keeps each row as often as it is in both', function () {
		assert.deepStrictEqual(alasql('SELECT x FROM a INTERSECT ALL SELECT x FROM b'), [
			{x: 1},
			{x: 1},
		]);
	});

	it('B) EXCEPT ALL subtracts the counts', function () {
		assert.deepStrictEqual(alasql('SELECT x FROM a EXCEPT ALL SELECT x FROM b'), [{x: 1}, {x: 2}]);
	});

	it('C) lower case with ORDER BY', function () {
		assert.deepStrictEqual(alasql('select x from a except all select x from b order by x desc'), [
			{x: 2},
			{x: 1},
		]);
	});

	it('D) toString keeps ALL', function () {
		const sql = 'SELECT x FROM a INTERSECT ALL SELECT x FROM b';
		assert.deepStrictEqual(alasql(alasql.parse(sql).toString()), [{x: 1}, {x: 1}]);
	});
});
