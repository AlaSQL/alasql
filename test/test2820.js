if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2820 - hexadecimal, octal and binary integer literals', function () {
	it('A) hexadecimal', function () {
		assert.deepEqual(alasql('SELECT 0x1F AS x, -0x1F AS y, 0X1f + 1 AS z'), [
			{x: 31, y: -31, z: 32},
		]);
	});

	it('B) octal and binary', function () {
		assert.deepEqual(alasql('SELECT 0o17 AS x, 0b101 AS y'), [{x: 15, y: 5}]);
	});

	it('C) digits with underscores', function () {
		assert.deepEqual(alasql('SELECT 1_000_000 AS x, 1_000.5 AS y'), [{x: 1000000, y: 1000.5}]);
	});

	it('D) names that look alike still work', function () {
		var data = [{'0x1F': 2, '0x1G': 3, '50k': 4}];
		assert.deepEqual(alasql('SELECT [0x1F] AS a, 0x1G AS b, 50k AS c FROM ?', [data]), [
			{a: 2, b: 3, c: 4},
		]);
	});
});
