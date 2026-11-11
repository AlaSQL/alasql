if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2831 - GENERATE_SERIES', function () {
	it('start and stop', function () {
		assert.deepEqual(alasql('SELECT * FROM GENERATE_SERIES(1, 3)'), [
			{generate_series: 1},
			{generate_series: 2},
			{generate_series: 3},
		]);
	});

	it('with a step, up and down', function () {
		assert.deepEqual(
			alasql('SELECT COLUMN generate_series FROM GENERATE_SERIES(2, 8, 3)'),
			[2, 5, 8]
		);
		assert.deepEqual(
			alasql('SELECT COLUMN generate_series FROM GENERATE_SERIES(5, 1, -2)'),
			[5, 3, 1]
		);
		assert.deepEqual(alasql('SELECT * FROM GENERATE_SERIES(4, 3)'), []);
		assert.throws(() => alasql('SELECT * FROM GENERATE_SERIES(1, 3, 0)'), /zero/);
	});

	it('in a JOIN and in an expression', function () {
		alasql('CREATE TABLE test2831c (a INT)');
		alasql('INSERT INTO test2831c VALUES (1), (2)');
		var res = alasql(
			'SELECT a, s.generate_series AS n FROM test2831c JOIN GENERATE_SERIES(1, 4, 2) AS s ON 1 = 1'
		);
		assert.equal(res.length, 4);
		assert.equal(alasql('SELECT VALUE SUM(generate_series) FROM GENERATE_SERIES(1, 10)'), 55);
		alasql('DROP TABLE test2831c');
	});

	it('RANGE still works', function () {
		assert.equal(alasql('SELECT * FROM RANGE(1, 3)').length, 3);
	});
});
