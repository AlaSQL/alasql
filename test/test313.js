if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 313 SEARCH ORDER BY', function () {
	it('1. ORDER BY', function (done) {
		var data = [{a: 1}, {a: 10}, {a: 2}];
		var res = alasql('SEARCH ORDER BY (a) FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 10}]);
		done();
	});
	it('2. ORDER BY', function (done) {
		var data = [1, 10, 2];
		var res = alasql('SEARCH ORDER BY (_) FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 10]);
		done();
	});
	it('3. ORDER BY', function (done) {
		var data = [{a: 1}, {a: 10}, {a: 2}];
		var res = alasql('SEARCH ORDER BY (a DESC) a  FROM ?', [data]);
		assert.deepEqual(res, [10, 2, 1]);
		done();
	});
	it('4. ORDER BY', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 10, b: 0},
			{a: 2, b: 7},
		];
		var res = alasql('SEARCH ORDER BY (a+b) FROM ?', [data]);
		assert.deepEqual(res, [
			{a: 2, b: 7},
			{a: 10, b: 0},
			{a: 1, b: 10},
		]);

		done();
	});
});
