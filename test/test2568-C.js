if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2568C'; // toString() keeps ESCAPE, so LIKE with and without it stay apart

describe(`Test ${testId} - LIKE with and without ESCAPE are different expressions`, function () {
	var data = [{s: 'a%b'}, {s: 'a!b'}, {s: 'a!b'}];

	it('A) toString() keeps ESCAPE', function () {
		var sql = "SELECT * FROM t WHERE a LIKE 'x!%' ESCAPE '!' OR a NOT LIKE 'y#_' ESCAPE '#'";
		assert.strictEqual(alasql.parse(sql).toString(), sql);
	});

	it('B) Two aggregates that differ only in ESCAPE', function () {
		var res = alasql(
			"SELECT SUM(CASE WHEN s LIKE '%!%%' THEN 1 ELSE 0 END) AS x, " +
				"SUM(CASE WHEN s LIKE '%!%%' ESCAPE '!' THEN 1 ELSE 0 END) AS y FROM ?",
			[data]
		);
		assert.deepStrictEqual(res, [{x: 2, y: 1}]);
	});

	it('C) Two columns that differ only in ESCAPE', function () {
		var res = alasql("SELECT s LIKE '%!%%' ESCAPE '!' AS e, s LIKE '%!%%' AS n FROM ?", [data]);
		assert.deepStrictEqual(res[0], {e: true, n: false});
		res = alasql("SELECT s LIKE '%!%%' ESCAPE '!', s LIKE '%!%%' FROM ?", [data]);
		assert.strictEqual(Object.keys(res[0]).length, 2);
	});
});
