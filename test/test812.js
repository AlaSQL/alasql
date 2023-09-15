if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 243 AVG bug', function () {
	it('1. Does not count null when using GROUP BY', function (done) {
		var data = [
			{a: 1, b: 2, c: null},
			{a: 1, b: null, c: null},
			{a: null, b: null, c: null},
			{a: 1, b: undefined, c: null},
			{a: null, b: 2, c: null},
		];
		var res = alasql(
			'SELECT COUNT(*) as all_rows, COUNT(a) as a, COUNT(b) as b, COUNT(c) as c FROM ?',
			[data]
		);
		assert.deepEqual(res, [
			{
				all_rows: 5,
				a: 3,
				b: 2,
				c: 0,
			},
		]);
		done();
	});

	it('2. Does not count null when using GROUP BY', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}, {a: undefined}, {a: null}];
		var res = alasql('SELECT a, COUNT(*) as b, COUNT(a) as c FROM ? GROUP BY a', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 3, c: 3},
			{a: 2, b: 2, c: 2},
			{a: 3, b: 1, c: 1},
			{a: undefined, b: 1, c: 0},
			{a: null, b: 1, c: 0},
		]);
		done();
	});

	it('3. Does not count null in AVG', function (done) {
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
			{
				person: 3,
				sold: null,
			},
		];

		var res = alasql('SELECT VALUE AVG(sold) FROM ?', [arr]);
		assert.equal(res, 18.75);
		done();
	});

	it('4. Does not count null when using AVG and GROUP BY', function (done) {
		var arr = [
			{
				person: 1,
				sold: 5,
			},
			{
				person: 1,
				sold: null,
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
				person: 1,
				sold: null,
			},
			{
				person: 3,
				sold: 40,
			},
			{
				person: 3,
				sold: null,
			},
		];

		var res = alasql('SELECT person, avg(sold) FROM ? GROUP BY person', [arr]);

		assert.deepEqual(res, [
			{person: 1, 'AVG(sold)': 12.5},
			{person: 2, 'AVG(sold)': 10},
			{person: 3, 'AVG(sold)': 40},
		]);
		done();
	});
});
