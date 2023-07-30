if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 927 group by empty results bug', function () {
	it('1. Does not return any results if input is empty when using GROUP BY', function (done) {
		var data = [
			{a: 1, b: 2, c: undefined},
			{a: 2, b: 3, c: undefined},
			{a: undefined, b: 3, c: undefined},
		];

		var res = alasql('SELECT COUNT(*) FROM ? WHERE a = b', [data]);
		assert.deepEqual(res, [{'COUNT(*)': 0}]);

		var res = alasql('SELECT a, COUNT(*) FROM ? GROUP BY a', [data]);
		assert.deepEqual(res, [
			{a: 1, 'COUNT(*)': 1},
			{a: 2, 'COUNT(*)': 1},
			{a: undefined, 'COUNT(*)': 1},
		]);

		var res = alasql('SELECT c, COUNT(*) FROM ? WHERE a IS NULL GROUP BY c', [data]);
		assert.deepEqual(res, [{c: undefined, 'COUNT(*)': 1}]);

		var res = alasql('SELECT a, COUNT(*) FROM ? WHERE a = b GROUP BY a', [data]);
		assert.deepEqual(res, []);

		done();
	});
});
