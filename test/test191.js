if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 191 - SELECT and GROUP BY execution order', function () {
	it('1. NO GROUP BY', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a, a+1 AS b FROM ?', [data]);
		//        console.log(res);
		done();
	});

	it('1. From ?', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a', [data]);
		//        console.log(res);
		done();
	});
});
