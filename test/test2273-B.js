if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2273B'; // WITH RECURSIVE ... UNION adds a row only once, so a cycle ends

describe(`Test ${testId} - recursive CTE with UNION`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE e (s INT, t INT)');
		alasql('INSERT INTO e VALUES (1, 2), (2, 3), (3, 1), (3, 4)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) UNION stops on a cycle, as in SQLite', function () {
		var res = alasql(
			'WITH RECURSIVE r(n) AS (SELECT 1 UNION SELECT e.t FROM e JOIN r ON e.s = r.n) SELECT n FROM r'
		);
		assert.deepStrictEqual(res, [{n: 1}, {n: 2}, {n: 3}, {n: 4}]);
	});

	it('B) UNION ALL still keeps every row', function () {
		var res = alasql(
			'WITH RECURSIVE r(n, d) AS (SELECT 1, 0 UNION ALL SELECT e.t, r.d + 1 FROM e JOIN r ON e.s = r.n WHERE r.d < 4) SELECT n FROM r'
		);
		assert.deepStrictEqual(
			res.map(r => r.n),
			[1, 2, 3, 1, 4, 2]
		);
	});

	it('C) UNION removes duplicates in the anchor too', function () {
		var res = alasql(
			'WITH RECURSIVE r(n) AS (SELECT s FROM e WHERE s = 3 UNION SELECT e.t FROM e JOIN r ON e.s = r.n WHERE e.t = 9) SELECT n FROM r'
		);
		assert.deepStrictEqual(res, [{n: 3}]);
	});
});
