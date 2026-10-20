if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2275B'; // ORDER BY ... COLLATE NOCASE on values that are not text

describe(`Test ${testId} - COLLATE NOCASE with numbers and mixed values`, function () {
	it('A) Numbers', function () {
		var res = alasql('SELECT v FROM ? ORDER BY v COLLATE NOCASE', [[{v: 10}, {v: 2}, {v: 1}]]);
		assert.deepStrictEqual(res, [{v: 1}, {v: 2}, {v: 10}]);
	});

	it('B) Text ignores case, as before', function () {
		var res = alasql('SELECT v FROM ? ORDER BY v COLLATE NOCASE DESC', [
			[{v: 'b'}, {v: 'A'}, {v: 'C'}],
		]);
		assert.deepStrictEqual(res, [{v: 'C'}, {v: 'b'}, {v: 'A'}]);
	});
});
