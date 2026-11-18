if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2979'; // An async WHILE loop does not wait for a timer before each iteration

describe(`Test ${testId} - Asynchronous WHILE loop without a timer per iteration`, function () {
	var realSetTimeout = globalThis.setTimeout;
	var timers;

	beforeEach(function () {
		timers = 0;
		globalThis.setTimeout = function () {
			timers++;
			return realSetTimeout.apply(this, arguments);
		};
	});

	afterEach(function () {
		globalThis.setTimeout = realSetTimeout;
		delete alasql.fn.probe2979;
	});

	it('A) 1000 iterations do not schedule a timer per iteration', async function () {
		var sql = 'DECLARE @i INT; SET @i = 0; WHILE @i < 1000 SET @i = @i + 1; SELECT @i AS i';
		var res = await alasql.promise(sql);
		var used = timers;
		globalThis.setTimeout = realSetTimeout;
		assert.deepStrictEqual(res[res.length - 1], [{i: 1000}]);
		assert.deepStrictEqual(res, alasql(sql));
		assert(used < 100, 'WHILE scheduled ' + used + ' timers for 1000 iterations');
	});

	it('B) 100000 iterations finish without a stack overflow', async function () {
		var sql = 'DECLARE @i INT; SET @i = 0; WHILE @i < 100000 SET @i = @i + 1; SELECT @i AS i';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res[res.length - 1], [{i: 100000}]);
	});

	it('C) The loop gives the event loop a turn without help from the loop body', async function () {
		var fired = false;
		var firedAt = -1;
		realSetTimeout(function () {
			fired = true;
		}, 0);
		alasql.fn.probe2979 = function (i) {
			if (fired && firedAt < 0) firedAt = i;
			return i;
		};
		var sql =
			'DECLARE @i INT; SET @i = 0; WHILE @i < 100000 SET @i = probe2979(@i) + 1; SELECT @i AS i';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res[res.length - 1], [{i: 100000}]);
		assert(firedAt >= 0 && firedAt < 100000, 'a timer set before the loop ran only after it');
	});

	it('D) BREAK and CONTINUE still work after a yield', async function () {
		var sql =
			'DECLARE @i INT; DECLARE @n INT; SET @i = 0; SET @n = 0; ' +
			'WHILE @i < 50000 BEGIN SET @i = @i + 1; IF @i % 2 = 0 CONTINUE; IF @i > 40000 BREAK; SET @n = @n + 1; END; ' +
			'SELECT @i AS i, @n AS n';
		var res = await alasql.promise(sql);
		assert.deepStrictEqual(res[res.length - 1], [{i: 40001, n: 20000}]);
		assert.deepStrictEqual(res, alasql(sql));
	});
});
