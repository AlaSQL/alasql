if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	describe('Test 266 Custom MEDIAN Aggregator', function() {
		it('1. MEDIAN', function(done) {
			var data = [
				{a: 1, b: 1},
				{a: 1, b: 3},
				{a: 1, b: 1},
				{a: 1, b: 5},
				{a: 1, b: 1},
				{a: 1, b: 2},
				{a: 2, b: 1},
				{a: 2, b: 1},
				{a: 2, b: 5},
				{a: 2, b: 5},
				{a: 2, b: 8},
				{a: 3, b: 1},
				{a: 3, b: 1},
				{a: 3, b: 5},
			];

			alasql.aggr.MYMEDIAN = function(v, s, stage) {
				if (stage == 1) {
					return [v];
				} else if (stage == 2) {
					s.push(v);
					return s;
				} else {
					var p = s.sort();
					return p[(p.length / 2) | 0];
				}
			};

			alasql.aggr.MYCOUNT = function(v, s, stage) {
				if (stage == 1) return 1;
				if (stage == 2) return s + 1;
				return s;
			};

			alasql.aggr.MYSUM = function(v, s, stage) {
				if (stage == 1) return v;
				if (stage == 2) return s + v;
				return s;
			};

			alasql.aggr.MYFIRST = function(v, s, stage) {
				if (stage == 1) return v;
				return s;
			};

			alasql.aggr.MYLAST = function(v, s, stage) {
				if (stage == 1) return v;
				else if (stage == 2) return v;
				else return s;
			};

			alasql.aggr.MYMIN = function(v, s, stage) {
				if (stage == 1) return v;
				if (stage == 2) return Math.min(s, v);
				return s;
			};

			alasql.aggr.MYMAX = function(v, s, stage) {
				if (stage == 1) return v;
				if (stage == 2) return Math.max(s, v);
				return s;
			};

			var res = alasql(
				'SELECT a,MYMEDIAN(b),MYCOUNT(b),MYSUM(b),\
     MYMIN(b),MYMAX(b),MYFIRST(b),MYLAST(b) FROM ? GROUP BY a',
				[data]
			);

			assert.deepEqual(res, [
				{
					a: 1,
					'MYMEDIAN(b)': 2,
					'MYCOUNT(b)': 6,
					'MYSUM(b)': 13,
					'MYMIN(b)': 1,
					'MYMAX(b)': 5,
					'MYFIRST(b)': 1,
					'MYLAST(b)': 2,
				},
				{
					a: 2,
					'MYMEDIAN(b)': 5,
					'MYCOUNT(b)': 5,
					'MYSUM(b)': 20,
					'MYMIN(b)': 1,
					'MYMAX(b)': 8,
					'MYFIRST(b)': 1,
					'MYLAST(b)': 8,
				},
				{
					a: 3,
					'MYMEDIAN(b)': 1,
					'MYCOUNT(b)': 3,
					'MYSUM(b)': 7,
					'MYMIN(b)': 1,
					'MYMAX(b)': 5,
					'MYFIRST(b)': 1,
					'MYLAST(b)': 5,
				},
			]);

			done();
		});
	});
}
