if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 735: BETWEEN in CASE statement', function () {
	it('1. CASE WHEN with > and < operators should work', function (done) {
		var cities = [
			{City: 'Moscow', Population: 1},
			{City: 'London', Population: 10},
			{City: 'Paris', Population: 100},
		];

		var res = alasql(
			'SELECT City, CASE WHEN Population > 1 AND Population < 100 THEN "yes" ELSE "no" END AS isBetween1and100 FROM ?',
			[cities]
		);

		assert.deepEqual(res, [
			{City: 'Moscow', isBetween1and100: 'no'},
			{City: 'London', isBetween1and100: 'yes'},
			{City: 'Paris', isBetween1and100: 'no'},
		]);
		done();
	});

	it('2. CASE WHEN with BETWEEN operator should work', function (done) {
		var cities = [
			{City: 'Moscow', Population: 1},
			{City: 'London', Population: 10},
			{City: 'Paris', Population: 100},
		];

		var res = alasql(
			'SELECT City, CASE WHEN Population BETWEEN 1 AND 100 THEN "yes" ELSE "no" END AS isBetween1and100 FROM ?',
			[cities]
		);

		assert.deepEqual(res, [
			{City: 'Moscow', isBetween1and100: 'yes'},
			{City: 'London', isBetween1and100: 'yes'},
			{City: 'Paris', isBetween1and100: 'yes'},
		]);
		done();
	});

	it('3. CASE WHEN with BETWEEN operator (exclusive) should work', function (done) {
		var cities = [
			{City: 'Moscow', Population: 1},
			{City: 'London', Population: 10},
			{City: 'Paris', Population: 100},
		];

		var res = alasql(
			'SELECT City, CASE WHEN Population BETWEEN 2 AND 99 THEN "yes" ELSE "no" END AS isBetween2and99 FROM ?',
			[cities]
		);

		assert.deepEqual(res, [
			{City: 'Moscow', isBetween2and99: 'no'},
			{City: 'London', isBetween2and99: 'yes'},
			{City: 'Paris', isBetween2and99: 'no'},
		]);
		done();
	});
});
