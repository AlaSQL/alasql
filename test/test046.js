if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 046', function () {
	describe('FROM as parameter', function () {
		var years = [
			{yearid: 2010},
			{yearid: 2011},
			{yearid: 2012},
			{yearid: 2013},
			{yearid: 2014},
			{yearid: 2015},
			{yearid: 2016},
			{yearid: 2017},
		];

		it('FROM array of objects', function (done) {
			var res = alasql('SELECT COLUMN * FROM ? AS t WHERE t.yearid>?', [years, 2014]);
			assert.deepEqual([2015, 2016, 2017], res);
			done();
		});

		var data = [
			[2014, 1, 1],
			[2015, 2, 1],
			[2016, 3, 1],
			[2017, 4, 2],
			[2018, 5, 3],
			[2019, 6, 3],
		];
		it('FROM array of arrays', function (done) {
			var res = alasql('SELECT VALUE SUM([1]) FROM ? d WHERE [0]>2016', [data]);
			assert.equal(15, res);
			done();
		});

		it('queryArrayOfArrays()', function (done) {
			var res = alasql('SELECT MATRIX [1] AS 0,[1]+[2] AS [1] FROM ? d WHERE [0]>2016', [data]);
			assert.deepEqual(
				[
					[4, 6],
					[5, 8],
					[6, 9],
				],
				res
			);
			done();
		});

		it('queryArrayOfArrays and filter()', function (done) {
			var res1 = alasql('SELECT * FROM ? d WHERE [0]>2016', [data]);
			var res2 = data
				.filter(function (a) {
					return a[0] > 2016;
				})
				.map(function (d) {
					var res = {};
					for (var i = 0; i < d.length; i++) {
						res[i] = d[i];
					}
					return res;
				});
			assert.deepEqual(res1, res2);
			done();
		});

		it('FROM array of arrays', function (done) {
			var res = alasql(
				'SELECT MATRIX [2] AS 0, SUM([1]) AS 1 \
				FROM ? d \
				WHERE [0]>2016 \
				GROUP BY [2] ',
				[data]
			);
			assert.deepEqual(res, [
				[2, 4],
				[3, 11],
			]);
			done();
		});
	});
});
