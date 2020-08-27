if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 190 - SELECT TOP 10 PERCENT FROM ?', function () {
	it('1. From ?', function (done) {
		var data = [];
		for (var i = 0; i < 200; i++) {
			data.push({a: i});
		}
		var res = alasql('SELECT TOP 5 PERCENT * FROM ? ORDER BY a DESC ', [data]);
		assert.deepEqual(res, [
			{a: 199},
			{a: 198},
			{a: 197},
			{a: 196},
			{a: 195},
			{a: 194},
			{a: 193},
			{a: 192},
			{a: 191},
			{a: 190},
		]);
		done();
	});

	it('2. From ?', function (done) {
		var data = [];
		for (var i = 0; i < 200; i++) {
			data.push(i);
		}
		var res = alasql('SELECT COLUMN TOP 5 PERCENT _ FROM ? ORDER BY _ DESC ', [data]);
		assert.deepEqual(res, [199, 198, 197, 196, 195, 194, 193, 192, 191, 190]);
		done();
	});
});
