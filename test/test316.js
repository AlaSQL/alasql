if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 316 UNION ALL', function () {
	it.skip('1. SEARCH DISTINCT', function (done) {
		var data = [{a: 10}, {a: 100}, {a: 10}, {a: 100}, {a: 10}];

		var res = alasql('SEARCH DISTINCT(/ a) FROM ?', [data]);
		assert.deepEqual(res, [10, 100]);

		done();
	});

	it.skip('2. Simple UNION ALL', function (done) {
		var data = [{a: 10}, {b: 100}, {a: 5}];

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY() FROM ?', [data]);
		assert.deepEqual(res, [5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY() FROM ?', [data]);
		//    console.log(res);
		assert.deepEqual(res, [5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY(ASC) FROM ?', [data]);
		assert.deepEqual(res, [5, 10, 100]);

		var res = alasql('SEARCH UNION ALL(/a,/b) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [100, 10, 5]);

		done();
	});
});
