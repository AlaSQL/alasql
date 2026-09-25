if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2226 - DATEADD and DATEDIFF with quoted period', function () {
	const testId = '2226';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) DATEADD works with a single-quoted period', function () {
		var res = alasql("SELECT DATEADD('day', 1, '2023-01-31') AS val")[0].val;
		assert.strictEqual(new Date(res).toISOString(), '2023-02-01T00:00:00.000Z');
	});

	it('B) DATEADD works with a double-quoted period', function () {
		var res = alasql('SELECT DATEADD("day", 1, "2023-01-31") AS val')[0].val;
		assert.strictEqual(new Date(res).toISOString(), '2023-02-01T00:00:00.000Z');
	});

	it('C) DATEADD still works with an unquoted period', function () {
		var res = alasql("SELECT DATEADD(day, 1, '2023-01-31') AS val")[0].val;
		assert.strictEqual(new Date(res).toISOString(), '2023-02-01T00:00:00.000Z');
	});

	it('D) DATEADD can subtract a quoted period', function () {
		var res = alasql("SELECT DATEADD('day', -1, '2023-01-31') AS val")[0].val;
		assert.strictEqual(new Date(res).toISOString(), '2023-01-30T00:00:00.000Z');
	});

	it('E) DATEDIFF works with a single-quoted period', function () {
		var res = alasql("SELECT DATEDIFF('day', '2023-01-01', '2023-01-10') AS val")[0].val;
		assert.strictEqual(res, 9);
	});

	it('F) DATEDIFF works with a double-quoted period', function () {
		var res = alasql('SELECT DATEDIFF("day", "2023-01-01", "2023-01-10") AS val')[0].val;
		assert.strictEqual(res, 9);
	});

	it('G) DATEDIFF still works with an unquoted period', function () {
		var res = alasql("SELECT DATEDIFF(day, '2023-01-01', '2023-01-10') AS val")[0].val;
		assert.strictEqual(res, 9);
	});

	it('H) work with a date parameter', function () {
		var res = alasql("SELECT DATEADD('day', 1, ?) AS val", [new Date('2023-01-31')])[0].val;
		assert.strictEqual(new Date(res).toISOString(), '2023-02-01T00:00:00.000Z');
	});
});
