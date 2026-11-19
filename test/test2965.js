if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2965'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - join on NULL keys`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) JOIN ON does not match NULL keys', function () {
		let res = [];
		res.push(alasql('create table t1 (id INTEGER, k INTEGER)'));
		res.push(alasql('insert into t1 values (1, NULL), (2, 0), (3, 5)'));
		res.push(alasql('create table t2 (id INTEGER, k INTEGER)'));
		res.push(alasql('insert into t2 values (10, NULL), (20, 0), (30, 5), (40, NULL)'));
		res.push(alasql('select t1.id, t2.id as j from t1 join t2 on t1.k = t2.k'));
		assert.deepStrictEqual(res, [
			1,
			3,
			1,
			4,
			[
				{id: 2, j: 20},
				{id: 3, j: 30},
			],
		]);
	});

	it('B) LEFT JOIN ON keeps the NULL-key row unmatched', function () {
		let res = alasql('select t1.id, t2.id as j from t1 left join t2 on t1.k = t2.k');
		assert.deepStrictEqual(res, [
			{id: 1, j: undefined},
			{id: 2, j: 20},
			{id: 3, j: 30},
		]);
	});

	it('C) JOIN USING does not match NULL keys', function () {
		let res = alasql('select t1.id, t2.id as j from t1 join t2 using (k)');
		assert.deepStrictEqual(res, [
			{id: 2, j: 20},
			{id: 3, j: 30},
		]);
	});

	it('D) A repeated JOIN still skips NULL keys with the cached index', function () {
		let res = [];
		res.push(alasql('select t1.id, t2.id as j from t1 join t2 on t1.k = t2.k'));
		res.push(alasql('select t1.id, t2.id as j from t1 join t2 on t1.k = t2.k'));
		assert.deepStrictEqual(res, [
			[
				{id: 2, j: 20},
				{id: 3, j: 30},
			],
			[
				{id: 2, j: 20},
				{id: 3, j: 30},
			],
		]);
	});

	it('E) WHERE still drops NULL keys', function () {
		let res = alasql('select t1.id, t2.id as j from t1, t2 where t1.k = t2.k');
		assert.deepStrictEqual(res, [
			{id: 2, j: 20},
			{id: 3, j: 30},
		]);
	});

	it('F) RIGHT JOIN ON keeps the NULL-key rows unmatched', function () {
		let res = alasql('select t1.id, t2.id as j from t1 right join t2 on t1.k = t2.k');
		assert.deepStrictEqual(res, [
			{id: 2, j: 20},
			{id: 3, j: 30},
			{j: 10, id: undefined},
			{j: 40, id: undefined},
		]);
	});
});
