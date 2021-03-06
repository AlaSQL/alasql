if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '610'; // insert test file number

describe('Test ' + test + ' - SQL added user defined function', function () {
	it('A) Sync', function () {
		var res = alasql(
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``;select VALUE abc(2); CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``;select value abc(2);'
		);
		assert.deepEqual(res, [1, 4, 1, 8]);
	});

	it('B) Async', function (done) {
		//
		alasql([
			'CREATE FUNCTION abc AS ``function(x) { return x*x; }``',
			'SELECT VALUE abc(2)',
			'CREATE FUNCTION abc AS ``function(x) { return x*x*x; }``',
			'SELECT VALUE abc(2)',
		]).then(function (res) {
			assert.deepEqual(res, [1, 4, 1, 8]);
			done();
		});
	});
});
