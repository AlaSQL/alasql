if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 209 SELECT FROM @localvar', function () {
	it('1. FROM @localvar', function (done) {
		alasql('SET @one = @[{a:1},{a:2},{a:3}]');
		alasql('SELECT * FROM @one ORDER BY a DESC', [], function (res) {
			assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 1}]);
			done();
		});
	});

	it('2. FROM @localvar', function (done) {
		alasql('SELECT * INTO @two FROM @one ORDER BY a DESC');
		alasql('SELECT * FROM @two', [], function (res) {
			assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 1}]);
			done();
		});
	});
});
