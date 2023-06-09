if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

describe('Test 819 GROUP BY with CASE', function () {
	it('1. Use GROUP BY with CASE with IS NULL', function (done) {
		var data = [
			{id: 'id1', alternativeId: undefined},
			{id: 'id2', alternativeId: undefined},
			{id: 'id2', alternativeId: undefined},
			{id: undefined, alternativeId: 'id2'},
			{id: undefined, alternativeId: 'id3'},
		];

		var res = alasql(
			'SELECT COUNT(*) FROM ? GROUP BY CASE WHEN id IS NULL THEN alternativeId ELSE id END',
			[data]
		);
		assert.deepEqual(res, [{'COUNT(*)': 1}, {'COUNT(*)': 3}, {'COUNT(*)': 1}]);
		done();
	});
});
