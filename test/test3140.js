if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3140';

describe(`Test ${testId} - UPDATE with a subquery in SET`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE u (x INT); INSERT INTO u VALUES (1),(2)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) Scalar subquery in SET without WHERE', function () {
		alasql('CREATE TABLE a (v INT); INSERT INTO a VALUES (1),(2)');
		alasql('UPDATE a SET v = (SELECT MAX(x) FROM u)');
		assert.deepStrictEqual(alasql('SELECT COLUMN v FROM a'), [2, 2]);
	});

	it('B) Scalar subquery in SET with a WHERE', function () {
		alasql('CREATE TABLE b (v INT); INSERT INTO b VALUES (1),(2)');
		alasql('UPDATE b SET v = (SELECT MAX(x) FROM u) + 10 WHERE v = 1');
		assert.deepStrictEqual(alasql('SELECT COLUMN v FROM b'), [12, 2]);
	});

	it('C) Subqueries in both SET and WHERE', function () {
		alasql('CREATE TABLE c (v INT); INSERT INTO c VALUES (1),(2),(3)');
		alasql('UPDATE c SET v = (SELECT MIN(x) FROM u) * 100 WHERE v IN (SELECT x FROM u)');
		assert.deepStrictEqual(alasql('SELECT COLUMN v FROM c'), [100, 100, 3]);
	});

	it('D) EXISTS subquery in SET', function () {
		alasql('CREATE TABLE d (f BOOLEAN, g BOOLEAN); INSERT INTO d VALUES (false, true)');
		alasql(
			'UPDATE d SET f = EXISTS (SELECT 1 FROM u WHERE x = 2), g = EXISTS (SELECT 1 FROM u WHERE x = 3)'
		);
		assert.deepStrictEqual(alasql('SELECT * FROM d'), [{f: true, g: false}]);
	});

	it('E) Subquery in SET of an UPDATE run more than once', function () {
		alasql('CREATE TABLE e (v INT); INSERT INTO e VALUES (0)');
		var upd = alasql.compile('UPDATE e SET v = (SELECT MAX(x) FROM u)');
		upd();
		alasql('INSERT INTO u VALUES (9)');
		upd();
		alasql('DELETE FROM u WHERE x = 9');
		assert.deepStrictEqual(alasql('SELECT COLUMN v FROM e'), [9]);
	});

	it('F) Subquery in SET reads a parameter', function () {
		alasql('CREATE TABLE f (v INT); INSERT INTO f VALUES (0)');
		alasql('UPDATE f SET v = (SELECT MAX(x) FROM u WHERE x < ?)', [2]);
		assert.deepStrictEqual(alasql('SELECT COLUMN v FROM f'), [1]);
	});
});
