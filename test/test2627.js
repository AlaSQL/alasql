if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2627'; // Keywords that are common field names can be used as names

describe(`Test ${testId} - non-reserved keywords used as names`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	function usedAsName(w) {
		alasql('DROP TABLE IF EXISTS t');
		assert.strictEqual(alasql(`CREATE TABLE t (${w} INT, data JSON)`), 1);
		assert.strictEqual(alasql(`INSERT INTO t (${w}, data) VALUES (2, ?)`, [{[w]: 5}]), 1);
		assert.strictEqual(alasql(`INSERT INTO t (${w}, data) VALUES (1, ?)`, [{[w]: 6}]), 1);
		assert.deepStrictEqual(alasql(`SELECT ${w} FROM t`), [{[w]: 2}, {[w]: 1}]);
		assert.deepStrictEqual(alasql(`SELECT * FROM t WHERE ${w} = 1`), [{[w]: 1, data: {[w]: 6}}]);
		assert.deepStrictEqual(alasql(`SELECT t.${w} FROM t`), [{[w]: 2}, {[w]: 1}]);
		assert.deepStrictEqual(alasql(`SELECT data->${w} FROM t`), [
			{[`data->${w}`]: 5},
			{[`data->${w}`]: 6},
		]);
		assert.deepStrictEqual(alasql(`SELECT * FROM t ORDER BY ${w}`), [
			{[w]: 1, data: {[w]: 6}},
			{[w]: 2, data: {[w]: 5}},
		]);
		alasql('DROP TABLE t');
	}

	it('A) TARGET', function () {
		usedAsName('target');
	});

	it('B) TEMP', function () {
		usedAsName('temp');
	});

	it('C) PLAN', function () {
		usedAsName('plan');
	});

	it('D) CALL', function () {
		usedAsName('call');
	});

	it('E) SHOW', function () {
		usedAsName('show');
	});
});
