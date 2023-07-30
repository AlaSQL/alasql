if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 196 - COUNT(a) vs COUNT(*)', function () {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	it('1. COUNT(*) vs COUNT(a)', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}, {a: undefined}];
		var res = alasql('SELECT a, COUNT(*) as b, COUNT(a) as c FROM ? GROUP BY a', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 3, c: 3},
			{a: 2, b: 2, c: 2},
			{a: 3, b: 1, c: 1},
			{a: undefined, b: 1, c: 0},
		]);
		//        console.log(res);
		done();
	});

	it('2. COUNT(DISTINCT a)', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT COUNT(DISTINCT a) FROM ?', [data]);
		//        console.log(res);
		done();
	});
});
