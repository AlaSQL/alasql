if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2600 - Multi-column user-defined aggregate functions', function () {
	const test = '2600';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) User-defined CORR function with two columns', function () {
		// Define a user-defined correlation function
		alasql.aggr.CORR = function (valueX, valueY, accumulator, stage) {
			if (stage === 1) {
				// Initialize the accumulator object
				if (
					valueX == null ||
					valueY == null ||
					isNaN(valueX) ||
					isNaN(valueY) ||
					typeof valueX !== 'number' ||
					typeof valueY !== 'number'
				) {
					return {
						sumX: 0,
						sumY: 0,
						sumXY: 0,
						sumX2: 0,
						sumY2: 0,
						count: 0,
					};
				}
				return {
					sumX: valueX,
					sumY: valueY,
					sumXY: valueX * valueY,
					sumX2: valueX * valueX,
					sumY2: valueY * valueY,
					count: 1,
				};
			} else if (stage === 2) {
				// Update accumulator with new values
				if (
					valueX != null &&
					valueY != null &&
					!isNaN(valueX) &&
					!isNaN(valueY) &&
					typeof valueX === 'number' &&
					typeof valueY === 'number'
				) {
					accumulator.sumX += valueX;
					accumulator.sumY += valueY;
					accumulator.sumXY += valueX * valueY;
					accumulator.sumX2 += valueX * valueX;
					accumulator.sumY2 += valueY * valueY;
					accumulator.count++;
				}
				return accumulator;
			} else if (stage === 3) {
				// Calculate the Pearson correlation coefficient
				const count = accumulator.count;

				if (count < 2) {
					return null;
				}

				const sumX = accumulator.sumX;
				const sumY = accumulator.sumY;
				const sumXY = accumulator.sumXY;
				const sumX2 = accumulator.sumX2;
				const sumY2 = accumulator.sumY2;

				const numerator = count * sumXY - sumX * sumY;
				const denominatorX = Math.sqrt(count * sumX2 - sumX * sumX);
				const denominatorY = Math.sqrt(count * sumY2 - sumY * sumY);
				const denominator = denominatorX * denominatorY;

				if (denominator === 0) {
					return null;
				}

				return numerator / denominator;
			}
			return accumulator;
		};

		// Create test data with perfect positive correlation (y = 2x + 1)
		alasql('CREATE TABLE correlation_data (x NUMBER, y NUMBER)');
		alasql('INSERT INTO correlation_data VALUES (1, 3), (2, 5), (3, 7), (4, 9), (5, 11)');

		// Test CORR with two columns - exact expected value
		var res = alasql('SELECT CORR(x, y) as corr FROM correlation_data');
		assert.deepEqual(res, [{corr: 0.9999999999999999}]);

		// Clean up
		delete alasql.aggr.CORR;
	});

	it('B) User-defined aggregate with three columns', function () {
		// Define a weighted average function that takes val, weight, and multiplier
		alasql.aggr.WEIGHTED_AVG = function (val, weight, multiplier, accumulator, stage) {
			if (stage === 1) {
				if (
					val == null ||
					weight == null ||
					multiplier == null ||
					typeof val !== 'number' ||
					typeof weight !== 'number' ||
					typeof multiplier !== 'number'
				) {
					return {sumWeighted: 0, sumWeights: 0};
				}
				return {
					sumWeighted: val * weight * multiplier,
					sumWeights: weight,
				};
			} else if (stage === 2) {
				if (
					val != null &&
					weight != null &&
					multiplier != null &&
					typeof val === 'number' &&
					typeof weight === 'number' &&
					typeof multiplier === 'number'
				) {
					accumulator.sumWeighted += val * weight * multiplier;
					accumulator.sumWeights += weight;
				}
				return accumulator;
			} else if (stage === 3) {
				if (accumulator.sumWeights === 0) {
					return null;
				}
				return accumulator.sumWeighted / accumulator.sumWeights;
			}
			return accumulator;
		};

		alasql('CREATE TABLE weighted_data (val NUMBER, weight NUMBER, mult NUMBER)');
		alasql('INSERT INTO weighted_data VALUES (10, 1, 2), (20, 2, 2), (30, 3, 2)');

		var res = alasql('SELECT WEIGHTED_AVG(val, weight, mult) as wavg FROM weighted_data');
		// Expected: (10*1*2 + 20*2*2 + 30*3*2) / (1+2+3) = (20+80+180)/6 = 280/6 = 46.666...
		assert.deepEqual(res, [{wavg: 46.666666666666664}]);

		// Clean up
		delete alasql.aggr.WEIGHTED_AVG;
	});

	it('C) Backward compatibility - single column aggregate still works', function () {
		// Define a simple single-column aggregate
		alasql.aggr.CUSTOM_SUM = function (value, accumulator, stage) {
			if (stage === 1) {
				return value || 0;
			} else if (stage === 2) {
				return accumulator + (value || 0);
			} else if (stage === 3) {
				return accumulator;
			}
			return accumulator;
		};

		alasql('CREATE TABLE simple_data (x NUMBER)');
		alasql('INSERT INTO simple_data VALUES (1), (2), (3), (4), (5)');

		var res = alasql('SELECT CUSTOM_SUM(x) as sum_result FROM simple_data');
		assert.deepEqual(res.length, 1);
		assert.deepEqual(res[0].sum_result, 15);

		// Clean up
		delete alasql.aggr.CUSTOM_SUM;
	});

	it('D) Multi-column aggregate with NULL handling', function () {
		// Redefine CORR for this test
		alasql.aggr.CORR = function (valueX, valueY, accumulator, stage) {
			if (stage === 1) {
				if (
					valueX == null ||
					valueY == null ||
					isNaN(valueX) ||
					isNaN(valueY) ||
					typeof valueX !== 'number' ||
					typeof valueY !== 'number'
				) {
					return {
						sumX: 0,
						sumY: 0,
						sumXY: 0,
						sumX2: 0,
						sumY2: 0,
						count: 0,
					};
				}
				return {
					sumX: valueX,
					sumY: valueY,
					sumXY: valueX * valueY,
					sumX2: valueX * valueX,
					sumY2: valueY * valueY,
					count: 1,
				};
			} else if (stage === 2) {
				if (
					valueX != null &&
					valueY != null &&
					!isNaN(valueX) &&
					!isNaN(valueY) &&
					typeof valueX === 'number' &&
					typeof valueY === 'number'
				) {
					accumulator.sumX += valueX;
					accumulator.sumY += valueY;
					accumulator.sumXY += valueX * valueY;
					accumulator.sumX2 += valueX * valueX;
					accumulator.sumY2 += valueY * valueY;
					accumulator.count++;
				}
				return accumulator;
			} else if (stage === 3) {
				const count = accumulator.count;
				if (count < 2) {
					return null;
				}
				const sumX = accumulator.sumX;
				const sumY = accumulator.sumY;
				const sumXY = accumulator.sumXY;
				const sumX2 = accumulator.sumX2;
				const sumY2 = accumulator.sumY2;
				const numerator = count * sumXY - sumX * sumY;
				const denominatorX = Math.sqrt(count * sumX2 - sumX * sumX);
				const denominatorY = Math.sqrt(count * sumY2 - sumY * sumY);
				const denominator = denominatorX * denominatorY;
				if (denominator === 0) {
					return null;
				}
				return numerator / denominator;
			}
			return accumulator;
		};

		alasql('CREATE TABLE null_data (x NUMBER, y NUMBER)');
		alasql('INSERT INTO null_data VALUES (1, 2), (NULL, 3), (3, NULL), (4, 5), (5, 6)');

		var res = alasql('SELECT CORR(x, y) as corr FROM null_data');
		// Should calculate correlation only for non-null pairs: (1,2), (4,5), (5,6)
		// Correlation = 1 for perfect positive correlation (with floating point precision)
		assert.deepEqual(res, [{corr: 1.0000000000000002}]);

		// Clean up
		delete alasql.aggr.CORR;
	});

	it('E) Multi-column aggregate with parameterized data', function () {
		// Define CORR for testing with parameters
		alasql.aggr.CORR = function (valueX, valueY, accumulator, stage) {
			if (stage === 1) {
				if (
					valueX == null ||
					valueY == null ||
					isNaN(valueX) ||
					isNaN(valueY) ||
					typeof valueX !== 'number' ||
					typeof valueY !== 'number'
				) {
					return {
						sumX: 0,
						sumY: 0,
						sumXY: 0,
						sumX2: 0,
						sumY2: 0,
						count: 0,
					};
				}
				return {
					sumX: valueX,
					sumY: valueY,
					sumXY: valueX * valueY,
					sumX2: valueX * valueX,
					sumY2: valueY * valueY,
					count: 1,
				};
			} else if (stage === 2) {
				if (
					valueX != null &&
					valueY != null &&
					!isNaN(valueX) &&
					!isNaN(valueY) &&
					typeof valueX === 'number' &&
					typeof valueY === 'number'
				) {
					accumulator.sumX += valueX;
					accumulator.sumY += valueY;
					accumulator.sumXY += valueX * valueY;
					accumulator.sumX2 += valueX * valueX;
					accumulator.sumY2 += valueY * valueY;
					accumulator.count++;
				}
				return accumulator;
			} else if (stage === 3) {
				const count = accumulator.count;
				if (count < 2) {
					return null;
				}
				const sumX = accumulator.sumX;
				const sumY = accumulator.sumY;
				const sumXY = accumulator.sumXY;
				const sumX2 = accumulator.sumX2;
				const sumY2 = accumulator.sumY2;
				const numerator = count * sumXY - sumX * sumY;
				const denominatorX = Math.sqrt(count * sumX2 - sumX * sumX);
				const denominatorY = Math.sqrt(count * sumY2 - sumY * sumY);
				const denominator = denominatorX * denominatorY;
				if (denominator === 0) {
					return null;
				}
				return numerator / denominator;
			}
			return accumulator;
		};

		alasql('CREATE TABLE param_data (x NUMBER, y NUMBER)');

		// Test with parameterized INSERT
		alasql('INSERT INTO param_data VALUES (?, ?)', [1, 3]);
		alasql('INSERT INTO param_data VALUES (?, ?)', [2, 5]);
		alasql('INSERT INTO param_data VALUES (?, ?)', [3, 7]);
		alasql('INSERT INTO param_data VALUES (?, ?)', [4, 9]);
		alasql('INSERT INTO param_data VALUES (?, ?)', [5, 11]);

		// Test CORR with parameterized columns - results should be exact
		var res = alasql('SELECT CORR(x, y) as corr FROM param_data');
		assert.deepEqual(res, [{corr: 0.9999999999999999}]);

		// Clean up
		delete alasql.aggr.CORR;
	});

	it('F) User-defined aggregate with four columns', function () {
		// Define a function that takes 4 parameters
		alasql.aggr.MULTI_CALC = function (a, b, c, d, accumulator, stage) {
			if (stage === 1) {
				if (
					a == null ||
					b == null ||
					c == null ||
					d == null ||
					typeof a !== 'number' ||
					typeof b !== 'number' ||
					typeof c !== 'number' ||
					typeof d !== 'number'
				) {
					return {total: 0, count: 0};
				}
				// Calculate (a*b + c*d)
				return {
					total: a * b + c * d,
					count: 1,
				};
			} else if (stage === 2) {
				if (
					a != null &&
					b != null &&
					c != null &&
					d != null &&
					typeof a === 'number' &&
					typeof b === 'number' &&
					typeof c === 'number' &&
					typeof d === 'number'
				) {
					accumulator.total += a * b + c * d;
					accumulator.count++;
				}
				return accumulator;
			} else if (stage === 3) {
				if (accumulator.count === 0) {
					return null;
				}
				return accumulator.total / accumulator.count;
			}
			return accumulator;
		};

		alasql('CREATE TABLE four_col_data (a NUMBER, b NUMBER, c NUMBER, d NUMBER)');
		alasql('INSERT INTO four_col_data VALUES (1, 2, 3, 4), (2, 3, 4, 5), (3, 4, 5, 6)');

		var res = alasql('SELECT MULTI_CALC(a, b, c, d) as result FROM four_col_data');
		// Expected: ((1*2+3*4) + (2*3+4*5) + (3*4+5*6)) / 3 = (14 + 26 + 42) / 3 = 82/3 = 27.333...
		assert.deepEqual(res, [{result: 27.333333333333332}]);

		// Clean up
		delete alasql.aggr.MULTI_CALC;
	});
});
