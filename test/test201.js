if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 201 SUM(DISTINCT), VAR(), STDDEV()', function () {
	it('1. different SUM()s', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		//        var res = alasql('SELECT ROW SUM(a), SUM(a) FROM ?',[data]);
		var res = alasql('SELECT ROW SUM(a), SUM(a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [7, 7]);
		done();
	});

	it('1a. different COUNT()s', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT ROW COUNT(a), COUNT(DISTINCT a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [4, 3]);
		done();
	});

	it('2. SUM() vs SUM(DISTINCT a)', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT ROW SUM(a), SUM(DISTINCT a) FROM ?', [data]);
		//        console.log(res);
		assert.deepEqual(res, [7, 6]);
		done();
	});

	if (false) {
		it('3. VAR() and STDDEV(a)', function (done) {
			var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}];
			var res = alasql('SELECT ROW VAR(a), STDEV(a) FROM ?', [data]);
			/// console.log(res);
			assert.deepEqual(res, [1, 2]);
			done();
		});
	}
});
