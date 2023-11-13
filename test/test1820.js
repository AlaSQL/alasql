if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1820 - SELECT query (a AS b, b AS c)', function () {

	it('1. Where IN with refs', function (done) {
		let item1 = { a: 1, b: "hello" };
		let item2 = { a: 2, b: "" };

		var res = alasql('SELECT a as b, b as c FROM ? GROUP BY a,b', [[item1, item2]]);

		assert.deepEqual(res, [{
			b: 1,
			c: "hello"
		}, {
			b: 2,
			c: ""
		}]);

		done();
	});
});
