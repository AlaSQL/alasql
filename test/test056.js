if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 56 - Error in WHERE and preIndex with ParamValue', function () {
	var q = [];
	var n = 10000;
	for (var i = 0; i < n; i++) {
		q.push({a: i, b: (Math.random() * 1000) | 0});
	}

	it('SELECT - order by "', function (done) {
		var w = alasql('SELECT q.* FROM ? q ORDER BY b', [q]);
		assert(w.length == n);
		done();
	});
});
