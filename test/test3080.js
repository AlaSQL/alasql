if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 3080 - A function registered in alasql.fn in lowercase replaces the built-in for keyword functions when casesensitive is false', function () {
	var prevCasesensitive;
	var prevCache;

	before(function () {
		prevCasesensitive = alasql.options.casesensitive;
		prevCache = alasql.options.cache;
		// The compiled plan is cached per SQL text, so a query compiled while
		// the built-in was in use would keep calling it even after the user
		// function is registered. Disable the cache so each query resolves
		// the function at compile time, as a fresh query text would.
		alasql.options.cache = false;
	});

	after(function () {
		alasql.options.casesensitive = prevCasesensitive;
		alasql.options.cache = prevCache;
		delete alasql.fn.datediff;
		delete alasql.fn.DATEDIFF;
		delete alasql.fn.dateadd;
		delete alasql.fn.DATEADD;
		delete alasql.fn.timestampdiff;
		delete alasql.fn.TIMESTAMPDIFF;
		delete alasql.fn.my_fn;
	});

	beforeEach(function () {
		alasql.options.casesensitive = false;
		delete alasql.fn.datediff;
		delete alasql.fn.DATEDIFF;
		delete alasql.fn.dateadd;
		delete alasql.fn.DATEADD;
		delete alasql.fn.timestampdiff;
		delete alasql.fn.TIMESTAMPDIFF;
		delete alasql.fn.my_fn;
	});

	it('1. Lowercase alasql.fn.datediff replaces the built-in DATEDIFF', function () {
		alasql.fn.datediff = function () {
			return 'user-defined';
		};
		var res = alasql("SELECT DATEDIFF(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d");
		assert.deepStrictEqual(res, [{d: 'user-defined'}]);
	});

	it('2. Uppercase alasql.fn.DATEDIFF still replaces the built-in DATEDIFF', function () {
		alasql.fn.DATEDIFF = function () {
			return 'user-defined';
		};
		var res = alasql("SELECT DATEDIFF(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d");
		assert.deepStrictEqual(res, [{d: 'user-defined'}]);
	});

	it('3. With casesensitive=true, lowercase alasql.fn.datediff is ignored', function () {
		alasql.options.casesensitive = true;
		alasql.fn.datediff = function () {
			return 'user-defined';
		};
		var res = alasql("SELECT DATEDIFF(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d");
		// The built-in runs: 2 hours apart is 0 whole days
		assert.deepStrictEqual(res, [{d: 0}]);
	});

	it('4. Lowercase alasql.fn.dateadd replaces the built-in DATEADD', function () {
		alasql.fn.dateadd = function () {
			return 'user-defined';
		};
		var res = alasql("SELECT DATEADD(day, 1, '2026-01-01') AS d");
		assert.deepStrictEqual(res, [{d: 'user-defined'}]);
	});

	it('5. Lowercase alasql.fn.timestampdiff replaces the built-in TIMESTAMPDIFF', function () {
		alasql.fn.timestampdiff = function () {
			return 'user-defined';
		};
		var res = alasql(
			"SELECT TIMESTAMPDIFF(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d"
		);
		assert.deepStrictEqual(res, [{d: 'user-defined'}]);
	});

	it('6. Without any user function the built-in DATEDIFF still runs', function () {
		var res = alasql("SELECT DATEDIFF(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d");
		assert.deepStrictEqual(res, [{d: 0}]);
	});

	it('7. Ordinary (non-keyword) function behaviour is unchanged', function () {
		alasql.fn.my_fn = function (x) {
			return x * 2;
		};
		var res = alasql('SELECT MY_FN(21) AS v');
		assert.deepStrictEqual(res, [{v: 42}]);
	});
});
