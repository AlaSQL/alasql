if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}
describe('Test 432 Test FIRST(*)', function() {
	it('1. FIRST(*)', function(done) {
		var data = [
			{a: 1, b: 10, c: 1},
			{a: 1, b: 20, c: 2},
			{a: 2, b: 20, c: 3},
			{a: 2, b: 30, c: 4},
			{a: 2, b: 30, c: 5},
		];
		var res = alasql('SELECT *, COUNT(b) FROM ? GROUP BY a,b', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 10, 'COUNT(b)': 1, c: 1},
			{a: 1, b: 20, 'COUNT(b)': 1, c: 2},
			{a: 2, b: 20, 'COUNT(b)': 1, c: 3},
			{a: 2, b: 30, 'COUNT(b)': 2, c: 4},
		]);

		var res = alasql('SELECT *, COUNT(b) FROM ? GROUP BY a', [data]);
		//    console.log(res);
		assert.deepEqual(res, [
			{a: 1, 'COUNT(b)': 2, b: 10, c: 1},
			{a: 2, 'COUNT(b)': 3, b: 20, c: 3},
		]);
		done();
	});
});
