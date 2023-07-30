if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 368 OFFSET ... LIMIT', function () {
	var data = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];

	it('LIMIT', function (done) {
		var res = alasql('SELECT * FROM ? LIMIT 3', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 3}]);
		done();
	});

	it('OFFSET LIMIT', function (done) {
		var res = alasql('SELECT * FROM ? LIMIT 2 OFFSET 3', [data]);
		assert.deepEqual(res, [{a: 4}, {a: 5}]);
		done();
	});

	it('OFFSET FETCH', function (done) {
		var res = alasql('SELECT * FROM ? OFFSET 3 FETCH 2', [data]);
		assert.deepEqual(res, [{a: 4}, {a: 5}]);

		var res = alasql('SELECT * FROM ? OFFSET 3 ROWS FETCH NEXT 2 ROWS ONLY', [data]);
		assert.deepEqual(res, [{a: 4}, {a: 5}]);
		done();
	});
});
