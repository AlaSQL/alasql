if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2263B'; // BREAK and CONTINUE in WHILE also work when run asynchronously

describe(`Test ${testId} - BREAK and CONTINUE in an asynchronous WHILE`, function () {
	it('A) BREAK ends the loop', async function () {
		var sql =
			'DECLARE @i INT; SET @i = 0; WHILE @i < 10 BEGIN SET @i = @i + 1; IF @i = 3 BREAK; END; SELECT @i AS i';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res[res.length - 1], [{i: 3}]);
		assert.deepStrictEqual(res, alasql(sql));
	});

	it('B) CONTINUE skips to the next round', async function () {
		var sql =
			'DECLARE @i INT; DECLARE @n INT; SET @i = 0; SET @n = 0; WHILE @i < 5 BEGIN SET @i = @i + 1; IF @i = 2 CONTINUE; SET @n = @n + 1; END; SELECT @i AS i, @n AS n';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res[res.length - 1], [{i: 5, n: 4}]);
		assert.deepStrictEqual(res, alasql(sql));
	});

	it('C) A loop without BREAK runs to the end', async function () {
		var sql = 'DECLARE @i INT; SET @i = 0; WHILE @i < 3 SET @i = @i + 1; SELECT @i AS i';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res, alasql(sql));
	});
});
