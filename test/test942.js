if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 942 - GROUP_CONCAT null handling', function () {
	it('A) GROUP_CONCAT should skip null values', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 1, b: null},
			{a: 1, b: 'z'},
		];
		var res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, 'x,z');
	});

	it('B) GROUP_CONCAT with all nulls should return null', function () {
		var data = [
			{a: 1, b: null},
			{a: 1, b: null},
		];
		var res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a', [data]);
		assert.strictEqual(res[0].b, null);
	});

	it('C) GROUP_CONCAT DISTINCT with nulls should skip nulls', function () {
		var data = [
			{a: 1, b: 'x'},
			{a: 1, b: null},
			{a: 1, b: 'x'},
			{a: 1, b: null},
		];
		var res = alasql('SELECT a, GROUP_CONCAT(DISTINCT b) AS b FROM ? GROUP BY a', [data]);
		assert.equal(res[0].b, 'x');
	});

	it('D) GROUP_CONCAT with mixed values and nulls', function () {
		var data = [
			{a: 1, b: 10},
			{a: 1, b: null},
			{a: 1, b: 20},
			{a: 2, b: null},
			{a: 2, b: 30},
		];
		var res = alasql('SELECT a, GROUP_CONCAT(b) AS b FROM ? GROUP BY a ORDER BY a', [data]);
		assert.equal(res[0].b, '10,20');
		assert.equal(res[1].b, '30');
	});

	it('E) GROUP_CONCAT without GROUP BY with nulls', function () {
		var data = [{b: 'a'}, {b: null}, {b: 'b'}, {b: null}, {b: 'c'}];
		var res = alasql('SELECT GROUP_CONCAT(b) AS b FROM ?', [data]);
		assert.equal(res[0].b, 'a,b,c');
	});

	it('F) GROUP_CONCAT with only null values (no GROUP BY)', function () {
		var data = [{b: null}, {b: null}, {b: null}];
		var res = alasql('SELECT GROUP_CONCAT(b) AS b FROM ?', [data]);
		assert.strictEqual(res[0].b, null);
	});
});
