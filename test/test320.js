if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 320 DISTINCT', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test320; USE test320');
		done();
	});

	it('2. SEARCH DISTINCT', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 2}, {a: 1}];

		var res = alasql('SEARCH FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 1}]);
		var res = alasql('SEARCH / a FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 2, 1]);
		var res = alasql('SEARCH DISTINCT(/) FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}]);
		var res = alasql('SEARCH DISTINCT(/a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH / PROP(a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2, 2, 1]);

		//   console.log(res);

		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test320');
		done();
	});
});
