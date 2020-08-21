if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 253 Internal (SELECT) with GROUP BY', function () {
	it('1. Test', function (done) {
		var data = [
			{a: 3.5, b: {c: 'label1'}},
			{a: 0.5, b: {c: 'label1'}},
			{a: 6, b: {c: 'label2'}},
		];

		var res = alasql(
			'SELECT FIRST(b->c) as [b->c], sum(a)/(select sum(a) from ?) \
	   from ? group by b->c',
			[data, data]
		);

		assert.deepEqual(res, [
			{
				'b->c': 'label1',
				'SUM(a) / SELECT SUM(a) FROM $0 AS default': 0.4,
			},
			{
				'b->c': 'label2',
				'SUM(a) / SELECT SUM(a) FROM $0 AS default': 0.6,
			},
		]);

		done();
	});
});
