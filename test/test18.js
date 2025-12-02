if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 18 - Binary operators (<<, >>, &, |, ^)', function () {
	const test = '18';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Left shift operator (<<)', function () {
		var res = alasql('SELECT 8 << 2 as result')[0].result;
		assert.equal(res, 32);

		res = alasql('SELECT 1 << 5 as result')[0].result;
		assert.equal(res, 32);

		res = alasql('SELECT 16 << 1 as result')[0].result;
		assert.equal(res, 32);
	});

	it('B) Right shift operator (>>)', function () {
		var res = alasql('SELECT 32 >> 2 as result')[0].result;
		assert.equal(res, 8);

		res = alasql('SELECT 16 >> 1 as result')[0].result;
		assert.equal(res, 8);

		res = alasql('SELECT 100 >> 3 as result')[0].result;
		assert.equal(res, 12);

		// Test sign-propagating right shift
		res = alasql('SELECT -8 >> 2 as result')[0].result;
		assert.equal(res, -2);
	});

	it('C) Bitwise AND operator (&)', function () {
		var res = alasql('SELECT 5 & 3 as result')[0].result;
		assert.equal(res, 1);

		res = alasql('SELECT 12 & 10 as result')[0].result;
		assert.equal(res, 8);

		res = alasql('SELECT 15 & 7 as result')[0].result;
		assert.equal(res, 7);

		res = alasql('SELECT 255 & 15 as result')[0].result;
		assert.equal(res, 15);
	});

	it('D) Bitwise OR operator (|)', function () {
		var res = alasql('SELECT 5 | 3 as result')[0].result;
		assert.equal(res, 7);

		res = alasql('SELECT 12 | 10 as result')[0].result;
		assert.equal(res, 14);

		res = alasql('SELECT 8 | 4 as result')[0].result;
		assert.equal(res, 12);

		res = alasql('SELECT 1 | 2 | 4 | 8 as result')[0].result;
		assert.equal(res, 15);
	});

	it('E) Bitwise XOR operator (^)', function () {
		var res = alasql('SELECT 5 ^ 3 as result')[0].result;
		assert.equal(res, 6);

		res = alasql('SELECT 12 ^ 10 as result')[0].result;
		assert.equal(res, 6);

		res = alasql('SELECT 15 ^ 15 as result')[0].result;
		assert.equal(res, 0);

		// XOR twice with same value returns original
		res = alasql('SELECT 5 ^ 3 ^ 3 as result')[0].result;
		assert.equal(res, 5);
	});

	it('F) Binary operators with table data', function () {
		alasql('CREATE TABLE bitops (a INT, b INT)');
		alasql('INSERT INTO bitops VALUES (8, 2), (5, 3), (12, 4)');

		var res = alasql('SELECT a, b, a << b as left_shift FROM bitops');
		assert.equal(res[0].left_shift, 32); // 8 << 2
		assert.equal(res[1].left_shift, 40); // 5 << 3
		assert.equal(res[2].left_shift, 192); // 12 << 4

		res = alasql('SELECT a, b, a >> b as right_shift FROM bitops');
		assert.equal(res[0].right_shift, 2); // 8 >> 2
		assert.equal(res[1].right_shift, 0); // 5 >> 3
		assert.equal(res[2].right_shift, 0); // 12 >> 4

		res = alasql('SELECT a, b, a & b as bitwise_and FROM bitops');
		assert.equal(res[0].bitwise_and, 0); // 8 & 2
		assert.equal(res[1].bitwise_and, 1); // 5 & 3
		assert.equal(res[2].bitwise_and, 4); // 12 & 4

		res = alasql('SELECT a, b, a | b as bitwise_or FROM bitops');
		assert.equal(res[0].bitwise_or, 10); // 8 | 2
		assert.equal(res[1].bitwise_or, 7); // 5 | 3
		assert.equal(res[2].bitwise_or, 12); // 12 | 4

		res = alasql('SELECT a, b, a ^ b as bitwise_xor FROM bitops');
		assert.equal(res[0].bitwise_xor, 10); // 8 ^ 2
		assert.equal(res[1].bitwise_xor, 6); // 5 ^ 3
		assert.equal(res[2].bitwise_xor, 8); // 12 ^ 4

		alasql('DROP TABLE bitops');
	});

	it('G) Complex expressions with multiple binary operators', function () {
		var res = alasql('SELECT (5 | 3) & 6 as result')[0].result;
		assert.equal(res, 6); // (5 | 3) = 7, 7 & 6 = 6

		res = alasql('SELECT 5 ^ 3 ^ 5 as result')[0].result;
		assert.equal(res, 3); // XOR is associative

		res = alasql('SELECT (8 << 2) >> 1 as result')[0].result;
		assert.equal(res, 16); // 32 >> 1

		res = alasql('SELECT (12 & 10) | (5 ^ 3) as result')[0].result;
		assert.equal(res, 14); // 8 | 6 = 14
	});

	it('H) Binary operators in WHERE clause', function () {
		alasql('CREATE TABLE flags (value INT)');
		alasql('INSERT INTO flags VALUES (1), (2), (3), (4), (5), (6), (7), (8)');

		// Find values where bit 1 (2^0) is set
		var res = alasql('SELECT value FROM flags WHERE (value & 1) = 1');
		assert.equal(res.length, 4);
		assert.deepEqual(
			res.map(r => r.value).sort(),
			[1, 3, 5, 7]
		);

		// Find values where bit 2 (2^1) is set
		res = alasql('SELECT value FROM flags WHERE (value & 2) = 2');
		assert.equal(res.length, 4);
		assert.deepEqual(
			res.map(r => r.value).sort(),
			[2, 3, 6, 7]
		);

		alasql('DROP TABLE flags');
	});

	it('I) Binary operators with NULL values', function () {
		var res = alasql('SELECT NULL << 2 as result')[0].result;
		assert.equal(res, undefined);

		res = alasql('SELECT 5 & NULL as result')[0].result;
		assert.equal(res, undefined);

		res = alasql('SELECT NULL | NULL as result')[0].result;
		assert.equal(res, undefined);
	});

	it('J) Binary operators with zero', function () {
		var res = alasql('SELECT 5 & 0 as result')[0].result;
		assert.equal(res, 0);

		res = alasql('SELECT 5 | 0 as result')[0].result;
		assert.equal(res, 5);

		res = alasql('SELECT 5 ^ 0 as result')[0].result;
		assert.equal(res, 5);

		res = alasql('SELECT 0 << 5 as result')[0].result;
		assert.equal(res, 0);

		res = alasql('SELECT 0 >> 5 as result')[0].result;
		assert.equal(res, 0);
	});
});
