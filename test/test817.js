if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

describe('Test 817 IFNULL bug', function () {
	it('1. Does return 0', function (done) {
		var data = [
			{
				a: 0,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: 0,
			},
		]);
		done();
	});

	it('1. Does return false', function (done) {
		var data = [
			{
				a: false,
			},
		];
		var res = alasql('SELECT IFNULL(a, true) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: false,
			},
		]);
		done();
	});

	it('1. Does return 100', function (done) {
		var data = [
			{
				a: null,
			},
		];
		var res = alasql('SELECT IFNULL(a, 100) as result FROM ?', [data]);
		assert.deepEqual(res, [
			{
				result: 100,
			},
		]);
		done();
	});
});
