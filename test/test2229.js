if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2229 - NULL into numeric column without column list', function () {
	const testId = '2229';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) INT column: NULL is matched by WHERE v IS NULL', function () {
		alasql('create table t2229a (v INT)');
		alasql('insert into t2229a values (NULL), (5), (NULL)');

		assert.strictEqual(alasql('select * from t2229a where v IS NULL').length, 2);
		assert.strictEqual(alasql('select * from t2229a where v IS NOT NULL').length, 1);
	});

	it('B) INT column: an inserted number is still coerced to a number', function () {
		alasql('create table t2229b (v INT)');
		alasql("insert into t2229b values (NULL), ('3')");

		var res = alasql('select * from t2229b where v IS NOT NULL');
		assert.strictEqual(res.length, 1);
		assert.strictEqual(res[0].v, 3);
		assert.strictEqual(typeof res[0].v, 'number');
		assert.ok(!Number.isNaN(res[0].v));
	});

	it('C) FLOAT column: NULL is matched by WHERE v IS NULL', function () {
		alasql('create table t2229c (v FLOAT)');
		alasql('insert into t2229c values (NULL), (2.5)');

		assert.strictEqual(alasql('select * from t2229c where v IS NULL').length, 1);
		assert.strictEqual(alasql('select * from t2229c where v IS NOT NULL').length, 1);
	});

	it('D) with column list still behaves the same', function () {
		alasql('create table t2229d (v INT)');
		alasql('insert into t2229d (v) values (NULL)');

		assert.strictEqual(alasql('select * from t2229d where v IS NULL').length, 1);
	});

	it('E) non-numeric columns still match IS NULL', function () {
		alasql('create table t2229e (s STRING)');
		alasql('insert into t2229e values (NULL)');

		assert.strictEqual(alasql('select * from t2229e where s IS NULL').length, 1);
	});
});
