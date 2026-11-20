if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2879 - JOIN subquery with its own subquery', function () {
	it('A) Scalar subquery in SELECT list next to IN subquery inside JOIN subquery', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE one (a INT); CREATE TABLE two (a INT, c INT)');
		db.exec('INSERT INTO one VALUES (1),(2); INSERT INTO two VALUES (1,10),(2,20)');
		var res = db.exec(
			'SELECT one.a, s.c, (SELECT COUNT(*) FROM two) AS n ' +
				'FROM one JOIN (SELECT a, c FROM two WHERE c IN (SELECT c FROM two WHERE a = 2)) s ON one.a = s.a'
		);
		assert.deepStrictEqual(res, [{a: 2, c: 20, n: 2}]);
	});

	it('B) Same shape with the subquery in FROM instead of JOIN', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE one (a INT); CREATE TABLE two (a INT, c INT)');
		db.exec('INSERT INTO one VALUES (1),(2); INSERT INTO two VALUES (1,10),(2,20)');
		var res = db.exec(
			'SELECT one.a, s.c, (SELECT COUNT(*) FROM two) AS n ' +
				'FROM one, (SELECT a, c FROM two WHERE c IN (SELECT c FROM two WHERE a = 2)) s WHERE one.a = s.a'
		);
		assert.deepStrictEqual(res, [{a: 2, c: 20, n: 2}]);
	});

	it('C) Scalar subquery inside the IN subquery itself', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE one (a INT); CREATE TABLE two (a INT, c INT)');
		db.exec('INSERT INTO one VALUES (1),(2); INSERT INTO two VALUES (1,10),(2,20)');
		var res = db.exec(
			'SELECT one.a, s.c, (SELECT COUNT(*) FROM two) AS n ' +
				'FROM one JOIN (SELECT a, c FROM two WHERE c IN ' +
				'(SELECT c FROM two WHERE a = (SELECT MAX(a) FROM two))) s ON one.a = s.a'
		);
		assert.deepStrictEqual(res, [{a: 2, c: 20, n: 2}]);
	});
});
