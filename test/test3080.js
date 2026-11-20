if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '3080';

describe(`Test ${testId} - lowercase alasql.fn overrides keyword functions when casesensitive is false`, function () {
	const fnNames = ['datediff', 'dateadd', 'timestampdiff', 'DATEDIFF', 'DATEADD', 'TIMESTAMPDIFF'];
	let casesensitive;

	before(function () {
		casesensitive = alasql.options.casesensitive;
	});

	afterEach(function () {
		alasql.options.casesensitive = casesensitive;
		fnNames.forEach(function (name) {
			delete alasql.fn[name];
		});
	});

	// a different alias per call keeps each query out of the compiled-query cache
	let n = 0;
	const sql = function (fn) {
		n++;
		return `SELECT ${fn}(day, '2026-01-01T23:00:00Z', '2026-01-02T01:00:00Z') AS d, ${n} AS n`;
	};
	const run = function (fn) {
		return alasql(sql(fn)).map(function (row) {
			return {d: row.d};
		});
	};

	it('A) lowercase registration is used when casesensitive is false', function () {
		alasql.options.casesensitive = false;
		['datediff', 'dateadd', 'timestampdiff'].forEach(function (name) {
			alasql.fn[name] = function () {
				return 'user-defined ' + name;
			};
			assert.deepStrictEqual(run(name.toUpperCase()), [{d: 'user-defined ' + name}]);
			assert.deepStrictEqual(run(name), [{d: 'user-defined ' + name}]);
		});
	});

	it('B) built-in still runs when nothing is registered and casesensitive is false', function () {
		alasql.options.casesensitive = false;
		assert.deepStrictEqual(run('DATEDIFF'), [{d: 0}]);
	});

	it('C) uppercase registration is still required when casesensitive is true', function () {
		alasql.options.casesensitive = true;
		alasql.fn.datediff = function () {
			return 'user-defined';
		};
		assert.deepStrictEqual(run('DATEDIFF'), [{d: 0}]);
		alasql.fn.DATEDIFF = function () {
			return 'user-defined';
		};
		assert.deepStrictEqual(run('DATEDIFF'), [{d: 'user-defined'}]);
	});
});
