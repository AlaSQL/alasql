if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2227 - ISNULL function', function () {
	const testId = '2227';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) ISNULL returns the replacement for NULL', function () {
		var res = alasql('SELECT ISNULL(NULL, 9) AS val')[0].val;
		assert.strictEqual(res, 9);
	});

	it('B) ISNULL returns the first argument when it is not NULL', function () {
		var res = alasql('SELECT ISNULL(5, 9) AS val')[0].val;
		assert.strictEqual(res, 5);
	});

	it('C) ISNULL does not treat a non-NULL value equal to the replacement as NULL', function () {
		var res = alasql('SELECT ISNULL(9, 9) AS val')[0].val;
		assert.strictEqual(res, 9);
	});

	it('D) ISNULL returns the replacement for an undefined column', function () {
		var res = alasql('SELECT ISNULL(b, 42) AS val FROM (SELECT NULL AS b) x')[0].val;
		assert.strictEqual(res, 42);
	});

	it('E) ISNULL works over columns', function () {
		var one = alasql('SELECT ISNULL(b, a) AS val FROM (SELECT 1 AS a, NULL AS b) x')[0].val;
		var two = alasql('SELECT ISNULL(b, a) AS val FROM (SELECT NULL AS a, 2 AS b) x')[0].val;
		assert.strictEqual(one, 1);
		assert.strictEqual(two, 2);
	});

	it('F) NULLIF is not affected (returns NULL/undefined when both arguments are equal)', function () {
		assert.strictEqual(alasql('SELECT NULLIF(5, 5) AS val')[0].val, undefined);
		assert.strictEqual(alasql('SELECT NULLIF(5, 9) AS val')[0].val, 5);
	});

	it('G) the "IS NULL" expression is not affected', function () {
		assert.strictEqual(alasql('SELECT NULL IS NULL AS first, 1 IS NULL AS second')[0].first, true);
		assert.strictEqual(
			alasql('SELECT NULL IS NULL AS first, 1 IS NULL AS second')[0].second,
			false
		);
	});
});
