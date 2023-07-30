if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 243 AVG bug', function () {
	it('1. AVG bug: 3 groups with one and multiple item', function (done) {
		var arr = [
			{
				person: 1,
				sold: 5,
			},
			{
				person: 2,
				sold: 10,
			},
			{
				person: 1,
				sold: 20,
			},
			{
				person: 3,
				sold: 40,
			},
		];

		var res = alasql('SELECT person, avg(sold) FROM ? WHERE 1 GROUP BY person', [arr]);

		//    console.log(res);
		assert(res, [
			{person: 1, 'AVG(sold)': 12.5},
			{person: 2, 'AVG(sold)': 10},
			{person: 3, 'AVG(sold)': 40},
		]);
		done();
	});

	it('2. AVG 2 by 2 groups', function (done) {
		var arr = [
			{
				person: 1,
				sold: 5,
			},
			{
				person: 2,
				sold: 10,
			},
			{
				person: 1,
				sold: 20,
			},
			{
				person: 2,
				sold: 40,
			},
		];

		var res = alasql('SELECT person, avg(sold) FROM ? WHERE 1 GROUP BY person', [arr]);

		//    console.log(res);
		assert(res, [
			{person: 1, 'AVG(sold)': 12.5},
			{person: 2, 'AVG(sold)': 25},
		]);
		done();
	});
});
