if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 192 - ORDER BY formula', function () {
	it('1. ORDER BY column', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a FROM ? ORDER BY 1-a', [data]);
		assert.deepEqual(res, [{a: 3}, {a: 2}, {a: 2}, {a: 1}, {a: 1}, {a: 1}]);
		done();
	});
	it('2. ORDER BY column', function (done) {
		var data = [{a: 'One'}, {a: 'Two'}, {a: 'Three'}, {a: 'Four'}];
		var res = alasql('SELECT a FROM ? ORDER BY MID(a,2,1)', [data]);
		assert.deepEqual(res, [{a: 'Three'}, {a: 'One'}, {a: 'Four'}, {a: 'Two'}]);
		done();
	});
});
