if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 155-B - Binary operators (<<, >>, &, |, ^)', function () {
	const test = '155B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Left shift operator (<<)', function () {
		var res = [
			alasql('SELECT 8 << 2 as result')[0],
			alasql('SELECT 1 << 5 as result')[0],
			alasql('SELECT 16 << 1 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 32}, {result: 32}, {result: 32}]);
	});

	it('B) Right shift operator (>>)', function () {
		var res = [
			alasql('SELECT 32 >> 2 as result')[0],
			alasql('SELECT 16 >> 1 as result')[0],
			alasql('SELECT 100 >> 3 as result')[0],
			alasql('SELECT -8 >> 2 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 8}, {result: 8}, {result: 12}, {result: -2}]);
	});

	it('C) Bitwise AND operator (&)', function () {
		var res = [
			alasql('SELECT 5 & 3 as result')[0],
			alasql('SELECT 12 & 10 as result')[0],
			alasql('SELECT 15 & 7 as result')[0],
			alasql('SELECT 255 & 15 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 1}, {result: 8}, {result: 7}, {result: 15}]);
	});

	it('D) Bitwise OR operator (|)', function () {
		var res = [
			alasql('SELECT 5 | 3 as result')[0],
			alasql('SELECT 12 | 10 as result')[0],
			alasql('SELECT 8 | 4 as result')[0],
			alasql('SELECT 1 | 2 | 4 | 8 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 7}, {result: 14}, {result: 12}, {result: 15}]);
	});

	it('E) Bitwise XOR operator (^)', function () {
		var res = [
			alasql('SELECT 5 ^ 3 as result')[0],
			alasql('SELECT 12 ^ 10 as result')[0],
			alasql('SELECT 15 ^ 15 as result')[0],
			alasql('SELECT 5 ^ 3 ^ 3 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 6}, {result: 6}, {result: 0}, {result: 5}]);
	});

	it('F) Binary operators with table data', function () {
		alasql('CREATE TABLE bitops (a INT, b INT)');
		alasql('INSERT INTO bitops VALUES (8, 2), (5, 3), (12, 4)');

		var res = alasql('SELECT a, b, a << b as left_shift FROM bitops');
		assert.deepStrictEqual(res, [
			{a: 8, b: 2, left_shift: 32},
			{a: 5, b: 3, left_shift: 40},
			{a: 12, b: 4, left_shift: 192},
		]);

		res = alasql('SELECT a, b, a >> b as right_shift FROM bitops');
		assert.deepStrictEqual(res, [
			{a: 8, b: 2, right_shift: 2},
			{a: 5, b: 3, right_shift: 0},
			{a: 12, b: 4, right_shift: 0},
		]);

		res = alasql('SELECT a, b, a & b as bitwise_and FROM bitops');
		assert.deepStrictEqual(res, [
			{a: 8, b: 2, bitwise_and: 0},
			{a: 5, b: 3, bitwise_and: 1},
			{a: 12, b: 4, bitwise_and: 4},
		]);

		res = alasql('SELECT a, b, a | b as bitwise_or FROM bitops');
		assert.deepStrictEqual(res, [
			{a: 8, b: 2, bitwise_or: 10},
			{a: 5, b: 3, bitwise_or: 7},
			{a: 12, b: 4, bitwise_or: 12},
		]);

		res = alasql('SELECT a, b, a ^ b as bitwise_xor FROM bitops');
		assert.deepStrictEqual(res, [
			{a: 8, b: 2, bitwise_xor: 10},
			{a: 5, b: 3, bitwise_xor: 6},
			{a: 12, b: 4, bitwise_xor: 8},
		]);

		alasql('DROP TABLE bitops');
	});

	it('G) Complex expressions with multiple binary operators', function () {
		var res = [
			alasql('SELECT (5 | 3) & 6 as result')[0],
			alasql('SELECT 5 ^ 3 ^ 5 as result')[0],
			alasql('SELECT (8 << 2) >> 1 as result')[0],
			alasql('SELECT (12 & 10) | (5 ^ 3) as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 6}, {result: 3}, {result: 16}, {result: 14}]);
	});

	it('H) Binary operators in WHERE clause', function () {
		alasql('CREATE TABLE flags (num INT)');
		alasql('INSERT INTO flags VALUES (1), (2), (3), (4), (5), (6), (7), (8)');

		var res = alasql('SELECT num FROM flags WHERE (num & 1) = 1');
		assert.deepStrictEqual(res, [{num: 1}, {num: 3}, {num: 5}, {num: 7}]);

		res = alasql('SELECT num FROM flags WHERE (num & 2) = 2');
		assert.deepStrictEqual(res, [{num: 2}, {num: 3}, {num: 6}, {num: 7}]);

		alasql('DROP TABLE flags');
	});

	it('I) Binary operators with NULL values', function () {
		var res = [
			alasql('SELECT NULL << 2 as result')[0],
			alasql('SELECT 5 & NULL as result')[0],
			alasql('SELECT NULL | NULL as result')[0],
		];
		assert.deepStrictEqual(res, [{result: undefined}, {result: undefined}, {result: undefined}]);
	});

	it('J) Binary operators with zero', function () {
		var res = [
			alasql('SELECT 5 & 0 as result')[0],
			alasql('SELECT 5 | 0 as result')[0],
			alasql('SELECT 5 ^ 0 as result')[0],
			alasql('SELECT 0 << 5 as result')[0],
			alasql('SELECT 0 >> 5 as result')[0],
		];
		assert.deepStrictEqual(res, [{result: 0}, {result: 5}, {result: 5}, {result: 0}, {result: 0}]);
	});
});
