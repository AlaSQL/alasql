if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2600 - CORR() aggregate function with two columns', function () {
	const test = '2600';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Test CORR with perfect positive correlation', function () {
		// Create test data with perfect positive correlation (y = 2x + 1)
		alasql('CREATE TABLE correlation_data (x NUMBER, y NUMBER)');
		alasql('INSERT INTO correlation_data VALUES (1, 3), (2, 5), (3, 7), (4, 9), (5, 11)');

		// CORR should return 1 for perfect positive correlation
		var res = alasql('SELECT CORR(x, y) as corr FROM correlation_data');
		assert.deepEqual(res.length, 1);
		assert(Math.abs(res[0].corr - 1) < 0.0001, 'Expected correlation close to 1');
	});

	it('B) Test CORR with perfect negative correlation', function () {
		alasql('CREATE TABLE neg_correlation (x NUMBER, y NUMBER)');
		alasql('INSERT INTO neg_correlation VALUES (1, 10), (2, 8), (3, 6), (4, 4), (5, 2)');

		// CORR should return -1 for perfect negative correlation
		var res = alasql('SELECT CORR(x, y) as corr FROM neg_correlation');
		assert.deepEqual(res.length, 1);
		assert(Math.abs(res[0].corr - (-1)) < 0.0001, 'Expected correlation close to -1');
	});

	it('C) Test CORR with no correlation', function () {
		alasql('CREATE TABLE no_correlation (x NUMBER, y NUMBER)');
		// Data points that should have no correlation
		alasql(
			'INSERT INTO no_correlation VALUES (1, 5), (2, 3), (3, 8), (4, 2), (5, 7), (6, 4)'
		);

		var res = alasql('SELECT CORR(x, y) as corr FROM no_correlation');
		assert.deepEqual(res.length, 1);
		// This specific dataset should have low correlation
		assert(typeof res[0].corr === 'number', 'Expected numeric correlation');
		assert(res[0].corr >= -1 && res[0].corr <= 1, 'Correlation should be between -1 and 1');
	});

	it('D) Test CORR with  NULL values', function () {
		alasql('CREATE TABLE null_data (x NUMBER, y NUMBER)');
		alasql('INSERT INTO null_data VALUES (1, 2), (NULL, 3), (3, NULL), (4, 5), (5, 6)');

		var res = alasql('SELECT CORR(x, y) as corr FROM null_data');
		assert.deepEqual(res.length, 1);
		// Should calculate correlation only for non-null pairs
		assert(typeof res[0].corr === 'number', 'Expected numeric correlation');
		assert(res[0].corr >= -1 && res[0].corr <= 1, 'Correlation should be between -1 and 1');
	});

	it('E) Test CORR with all NULL values', function () {
		alasql('CREATE TABLE all_null (x NUMBER, y NUMBER)');
		alasql('INSERT INTO all_null VALUES (NULL, NULL), (NULL, NULL)');

		var res = alasql('SELECT CORR(x, y) as corr FROM all_null');
		assert.deepEqual(res.length, 1);
		// Should return null when no valid data points
		assert.strictEqual(res[0].corr, null, 'Expected null for all NULL input');
	});

	it('F) Test CORR with single data point', function () {
		alasql('CREATE TABLE single_point (x NUMBER, y NUMBER)');
		alasql('INSERT INTO single_point VALUES (5, 10)');

		var res = alasql('SELECT CORR(x, y) as corr FROM single_point');
		assert.deepEqual(res.length, 1);
		// Single point should return null (undefined correlation)
		assert.strictEqual(res[0].corr, null, 'Expected null for single data point');
	});

	it('G) Test CORR with constant values (no variance)', function () {
		alasql('CREATE TABLE constant_data (x NUMBER, y NUMBER)');
		alasql('INSERT INTO constant_data VALUES (5, 10), (5, 20), (5, 30)');

		var res = alasql('SELECT CORR(x, y) as corr FROM constant_data');
		assert.deepEqual(res.length, 1);
		// No variance in X means undefined correlation
		assert.strictEqual(res[0].corr, null, 'Expected null when X has no variance');
	});
});
