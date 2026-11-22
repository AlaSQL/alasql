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

	it('D) 40 IN subqueries in one statement finish in normal time (#3082)', function () {
		var db = new alasql.Database();
		db.exec('CREATE TABLE one (a INT); CREATE TABLE two (a INT, c INT)');
		db.exec('INSERT INTO one VALUES (1),(2); INSERT INTO two VALUES (1,10),(2,20)');
		var conds = [];
		for (var i = 0; i < 40; i++) {
			conds.push('a IN (SELECT a FROM two WHERE c > ' + i + ')');
		}
		var t0 = Date.now();
		var res = db.exec('SELECT * FROM one WHERE ' + conds.join(' OR '));
		var ms = Date.now() - t0;
		assert.deepStrictEqual(res, [{a: 1}, {a: 2}]);
		// Each subquery holds only its own inner subqueries and is compiled once:
		// before the fix this statement ran out of memory (see #3082).
		assert.ok(ms < 10000, 'expected under 10s, took ' + ms + 'ms');
	});
});
