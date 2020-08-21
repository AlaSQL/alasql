if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 244 Case-insensitive LIKE', function () {
	it('1. LIKE', function (done) {
		var data = [
			{a: 'one', b: 'first'},
			{a: 'two', b: 'second'},
			{a: 'THREE', b: 'THIRD'},
		];

		var res = alasql('SELECT b FROM ? WHERE a LIKE "T%"', [data]);

		//console.log(res);
		assert(res, [{b: 'second'}, {b: 'THIRD'}]);
		done();
	});

	it('2. LIKE', function (done) {
		var data = [
			{a: 'Warsaw'},
			{a: 'Berlin'},
			{a: 'Paris'},
			{a: 'London'},
			{a: 'MOSCOW'},
			{a: 'KYIV'},
			{a: 'MINSK'},
		];

		var res = alasql('SELECT * FROM ? WHERE a LIKE "m%"', [data]);
		//console.log(res);
		assert(res, [{a: 'MOSCOW'}, {a: 'MINSK'}]);
		done();
	});
});
