if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 55 - Error in WHERE and preIndex with ParamValue', function () {
	it('SELECT - gives "Cannot find indices of undefined"', function (done) {
		var q = [];
		for (var i = 0; i < 100000; i++) {
			q.push({a: i, b: (Math.random() * 1000) | 0});
		}

		w2 = alasql('SELECT * FROM ? WHERE b=500', [q]);
		//		console.log(w2[0]);
		done();
	});
});
