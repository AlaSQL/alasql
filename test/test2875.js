if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2875';

describe(`Test ${testId} - reuse statements after a synchronous error`, function () {
	var failure = new Error('query failed');

	before(function () {
		alasql('CREATE DATABASE test' + testId);
		alasql('USE test' + testId);
		alasql('CREATE TABLE one (a INT); INSERT INTO one VALUES (1)');
		alasql.fn.FAIL2875 = function (value) {
			if (value === 99) throw failure;
			return value;
		};
	});

	after(function () {
		delete alasql.fn.FAIL2875;
		alasql('DROP DATABASE test' + testId);
	});

	['compiled', 'cached'].forEach(function (api) {
		['callback', 'promise'].forEach(function (mode) {
			it(`Reuses a ${api} statement after an error through ${mode}`, async function () {
				var sql = `SELECT FAIL2875(?) AS value FROM one /* ${api}-${mode} */`;
				var statement = api === 'compiled' ? alasql.compile(sql) : null;
				var run = (params, cb) => (statement ? statement(params, cb) : alasql(sql, params, cb));
				assert.deepStrictEqual(run([1]), [{value: 1}]);

				if (mode === 'promise') {
					await assert.rejects(
						statement ? statement.promise([99]) : alasql.promise(sql, [99]),
						err => err === failure
					);
				} else {
					assert.throws(
						() => run([99], () => {}),
						err => err === failure
					);
				}

				var parse = alasql.parse;
				var reparses = 0;
				alasql.parse = function () {
					reparses++;
					return parse.apply(this, arguments);
				};
				try {
					assert.deepStrictEqual([run([2]), run([3])], [[{value: 2}], [{value: 3}]]);
					assert.strictEqual(reparses, 0);
				} finally {
					alasql.parse = parse;
				}
			});
		});
	});
});
