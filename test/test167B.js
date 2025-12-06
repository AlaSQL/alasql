if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 167B - SEARCH DISTINCT and SELECT DISTINCT functions', function () {
	it('1. Basic DISTINCT comparison', () => {
		var data = [{a: 1}, {a: 2}, {a: 1}];

		var res1 = alasql('SELECT * FROM ?', [data]);
		var res2 = alasql('SELECT DISTINCT * FROM ?', [data]);
		var res3 = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// res1 should have all 3 items
		assert.equal(res1.length, 3);

		// res2, res3, res4 should all have 2 distinct items
		assert.equal(res2.length, 2, 'SELECT DISTINCT * should return 2 items');
		assert.equal(res3.length, 2, 'SELECT COLUMN DISTINCT _ should return 2 items');
		assert.equal(res4.length, 2, 'SEARCH DISTINCT(/) should return 2 items');
	});

	it('2. DISTINCT with different middle value (issue b)', () => {
		var data = [{a: 1}, {b: 2}, {a: 1}];

		var res3 = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// Should return 2 distinct objects: {a:1} and {b:2}
		assert.equal(res3.length, 2, 'SELECT COLUMN DISTINCT _ should return 2 items');
		assert.equal(res4.length, 2, 'SEARCH DISTINCT(/) should return 2 items');

		// Check that we have both distinct objects
		var hasA1 = res3.some(function (item) {
			return item.a === 1 && !item.b;
		});
		var hasB2 = res3.some(function (item) {
			return item.b === 2 && !item.a;
		});

		assert(hasA1, 'Result should contain {a:1}');
		assert(hasB2, 'Result should contain {b:2}');
	});

	it('3. SEARCH DISTINCT vs SELECT DISTINCT consistency', () => {
		var data = [{a: 1}, {b: 2}, {a: 1}];

		var res2 = alasql('SELECT DISTINCT * FROM ?', [data]);
		var res4 = alasql('SEARCH DISTINCT(/) FROM ?', [data]);

		// Results should be the same
		assert.deepEqual(
			res2,
			res4,
			'SELECT DISTINCT * and SEARCH DISTINCT(/) should produce same results'
		);
	});

	it('4. SELECT COLUMN DISTINCT _ with arrays', () => {
		var data = [1, 2, 1, 3, 2];

		var res = alasql('SELECT COLUMN DISTINCT _ FROM ?', [data]);

		// Should return distinct values: [1, 2, 3]
		assert.equal(res.length, 3, 'Should return 3 distinct values');
		assert(res.includes(1), 'Should include 1');
		assert(res.includes(2), 'Should include 2');
		assert(res.includes(3), 'Should include 3');
	});
});
