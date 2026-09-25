if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2225 - LEFT and RIGHT string functions', function () {
	const testId = '2225';

	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) LEFT returns the leftmost N characters', function () {
		var res = alasql('SELECT LEFT("hello", 2) AS val')[0].val;
		assert.strictEqual(res, 'he');
	});

	it('B) RIGHT returns the rightmost N characters', function () {
		var res = alasql('SELECT RIGHT("hello", 2) AS val')[0].val;
		assert.strictEqual(res, 'lo');
	});

	it('C) LEFT with length larger than the string returns the whole string', function () {
		var res = alasql('SELECT LEFT("hello", 20) AS val')[0].val;
		assert.strictEqual(res, 'hello');
	});

	it('D) RIGHT with length larger than the string returns the whole string', function () {
		var res = alasql('SELECT RIGHT("hello", 20) AS val')[0].val;
		assert.strictEqual(res, 'hello');
	});

	it('E) LEFT and RIGHT with zero length return an empty string', function () {
		assert.strictEqual(alasql('SELECT LEFT("hello", 0) AS val')[0].val, '');
		assert.strictEqual(alasql('SELECT RIGHT("hello", 0) AS val')[0].val, '');
	});

	it('F) LEFT and RIGHT with NULL input return NULL', function () {
		assert.strictEqual(alasql('SELECT LEFT(NULL, 2) AS val')[0].val, null);
		assert.strictEqual(alasql('SELECT RIGHT(NULL, 2) AS val')[0].val, null);
	});

	it('G) work over table columns', function () {
		alasql('CREATE TABLE words (word VARCHAR(20))');
		alasql('INSERT INTO words VALUES ("banana"), ("kiwi")');
		var left = alasql('SELECT LEFT(word, 3) AS val FROM words ORDER BY word');
		var right = alasql('SELECT RIGHT(word, 3) AS val FROM words ORDER BY word');
		assert.deepStrictEqual(
			left.map(row => row.val),
			['ban', 'kiw']
		);
		assert.deepStrictEqual(
			right.map(row => row.val),
			['ana', 'iwi']
		);
	});

	it('H) are not confused with LEFT/RIGHT JOIN', function () {
		alasql('CREATE TABLE ta (id INT)');
		alasql('CREATE TABLE tb (id INT)');
		alasql('INSERT INTO ta VALUES (1), (2)');
		alasql('INSERT INTO tb VALUES (2)');
		var leftJoin = alasql('SELECT ta.id FROM ta LEFT JOIN tb ON ta.id = tb.id');
		var rightJoin = alasql('SELECT tb.id FROM ta RIGHT JOIN tb ON ta.id = tb.id');
		assert.strictEqual(leftJoin.length, 2);
		assert.strictEqual(rightJoin.length, 1);
	});
});
