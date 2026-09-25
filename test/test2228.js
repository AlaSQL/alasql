if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2228 - TIMESTAMPDIFF with quoted period', function () {
	const testId = '2228';

	before(function () {
		alasql.options.mysql = true;
		// test203.js replaces alasql.fn with an empty object, so re-register the
		// mysql-only TIMESTAMPDIFF (mirror of src/822mysql.js).
		alasql.fn.TIMESTAMPDIFF = function (unit, date1, date2) {
			return alasql.stdfn.DATEDIFF(unit, date1, date2);
		};
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) TIMESTAMPDIFF works with a single-quoted period', function () {
		var res = alasql("SELECT TIMESTAMPDIFF('day', '2023-01-01', '2023-01-10') AS val")[0].val;
		assert.strictEqual(res, 9);
	});

	it('B) TIMESTAMPDIFF works with a double-quoted period', function () {
		var res = alasql('SELECT TIMESTAMPDIFF("day", "2023-01-01", "2023-01-10") AS val')[0].val;
		assert.strictEqual(res, 9);
	});

	it('C) TIMESTAMPDIFF with an unquoted lowercase period', function () {
		var res = alasql("SELECT TIMESTAMPDIFF(day, '2023-01-01', '2023-01-10') AS val")[0].val;
		assert.strictEqual(res, 9);
	});

	it('D) TIMESTAMPDIFF with an unquoted uppercase period', function () {
		var res = alasql("SELECT TIMESTAMPDIFF(MONTH, '2018-04-01', '2018-05-01') AS val")[0].val;
		assert.strictEqual(res, 1);
	});

	it('E) TIMESTAMPDIFF with a quoted month period', function () {
		var res = alasql("SELECT TIMESTAMPDIFF('month', '2018-04-01', '2018-05-01') AS val")[0].val;
		assert.strictEqual(res, 1);
	});

	it('F) TIMESTAMPDIFF with a year period', function () {
		var res = alasql("SELECT TIMESTAMPDIFF(year, '2018-04-01', '2019-04-01') AS val")[0].val;
		assert.strictEqual(res, 1);
	});
});
