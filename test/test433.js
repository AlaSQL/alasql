if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '433'; // insert test file number

describe('Test ' + test + ' - read csv from variable', function () {
	it('works from csv variable', function () {
		var res = alasql('SELECT * FROM CSV(?, {"headers": true, "fromString": true})', [
			'A,B,C\n10,20,30\n20,30,40',
		]);

		assert.deepEqual(res, [
			{A: 10, B: 20, C: 30},
			{A: 20, B: 30, C: 40},
		]);
	});

	it('works from csv variable - async', function (done) {
		var sql = 'SELECT * FROM CSV(?, {"headers": false, "fromString": true})';
		alasql(sql, ['a,b,c\nd,e,f\none,two,three\n'], function (res) {
			assert.deepEqual(res, [
				{'0': 'a', '1': 'b', '2': 'c'},
				{'0': 'd', '1': 'e', '2': 'f'},
				{'0': 'one', '1': 'two', '2': 'three'},
			]);
			done();
		});
	});
});
