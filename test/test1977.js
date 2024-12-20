if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1977 - BigInt support', function () {
	it('A) Should sum, find max, min, average of BigInt values, and calculate TOTAL', function () {
		var data = [{a: 9045645645644442n}, {a: 9147483647334432n}, {a: 20n}, {a: 45875651254783254n}];

		var res = alasql(
			`SELECT SUM(a) AS sum_a,
					MAX(a) AS max_a,
					MIN(a) AS min_a,
					AVG(a) AS avg_a,
					TOTAL(a) AS total_a
			 FROM ?`,
			[data]
		);

		assert.deepEqual(res, [
			{
				sum_a: 64068780547762148n,
				max_a: 45875651254783254n,
				min_a: 20n,
				avg_a: 16017195136940537n,
				total_a: 64068780547762148n,
			},
		]);
	});

	it('B) Aggregate functions with mixed Number and BigInt types', function () {
		var data = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 9147483647334432n}];

		var res = alasql(
			`SELECT SUM(a) AS sum_a,
					MAX(a) AS max_a,
					MIN(a) AS min_a,
					AVG(a) AS avg_a,
					TOTAL(a) AS total_a
			 FROM ?`,
			[data]
		);

		assert.deepEqual(res, [
			{
				sum_a: 9147483647334442n,
				max_a: 9147483647334432n,
				min_a: 1n,
				avg_a: 1829496729466888n,
				total_a: 9147483647334442n,
			},
		]);
	});

	it('C) Aggregate functions with negative BigInt values', function () {
		var data = [{a: -9045645645644442n}, {a: -9147483647334432n}];

		var res = alasql(
			`SELECT SUM(a) AS sum_a,
					MAX(a) AS max_a,
					MIN(a) AS min_a,
					AVG(a) AS avg_a,
					TOTAL(a) AS total_a
			 FROM ?`,
			[data]
		);

		assert.deepEqual(res, [
			{
				sum_a: -18193129292978874n,
				max_a: -9045645645644442n,
				min_a: -9147483647334432n,
				avg_a: -9096564646489437n,
				total_a: -18193129292978874n,
			},
		]);
	});

	it('D) Aggregate functions with large BigInt values', function () {
		var data = [
			{a: BigInt('123456789012345678901234567890')},
			{a: BigInt('987654321098765432109876543210')},
		];

		var res = alasql(
			`SELECT SUM(a) AS sum_a,
					MAX(a) AS max_a,
					MIN(a) AS min_a,
					AVG(a) AS avg_a,
					TOTAL(a) AS total_a
			 FROM ?`,
			[data]
		);

		assert.deepEqual(res, [
			{
				sum_a: BigInt('1111111110111111111011111111100'),
				max_a: BigInt('987654321098765432109876543210'),
				min_a: BigInt('123456789012345678901234567890'),
				avg_a: BigInt('555555555055555555505555555550'),
				total_a: BigInt('1111111110111111111011111111100'),
			},
		]);
	});

	it('E) Aggregate functions with zero sum (positive and negative BigInt)', function () {
		var data = [{a: 12345678901234567890n}, {a: -12345678901234567890n}];

		var res = alasql(
			`SELECT SUM(a) AS sum_a,
					MAX(a) AS max_a,
					MIN(a) AS min_a,
					AVG(a) AS avg_a,
					TOTAL(a) AS total_a
			 FROM ?`,
			[data]
		);

		assert.deepEqual(res, [
			{
				sum_a: 0n,
				max_a: 12345678901234567890n,
				min_a: -12345678901234567890n,
				avg_a: 0n,
				total_a: 0n,
			},
		]);
	});
});
