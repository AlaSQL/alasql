if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 288 ROWNUM()', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test288;USE test288');
		done();
	});

	it('2. SET', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT a, ROWNUM() AS b FROM ?', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 1},
			{a: 2, b: 2},
			{a: 3, b: 3},
		]);
		done();
	});

	it('3. Subquery', function (done) {
		alasql('CREATE TABLE one (a INT PRIMARY KEY)');
		for (var i = 1; i < 1000; i++) {
			alasql('INSERT INTO one VALUES (?)', [i]);
		}
		var res = alasql(
			'SELECT * FROM (SELECT a, ROWNUM() AS r FROM one)\
      WHERE r BETWEEN 55 AND 60'
		);
		assert.deepEqual(res, [
			{a: 55, r: 55},
			{a: 56, r: 56},
			{a: 57, r: 57},
			{a: 58, r: 58},
			{a: 59, r: 59},
			{a: 60, r: 60},
		]);
		done();
	});

	it('4. Operations', function (done) {
		const data = [{a: 1}, {a: 2}, {a: 3}];
		const res = alasql('SELECT a, ROW_NUMBER() + 1 AS b, ROW_NUMBER() % 2 AS c FROM ?', [data]);
		assert.deepEqual(res, [
			{a: 1, b: 2, c: 1},
			{a: 2, b: 3, c: 0},
			{a: 3, b: 4, c: 1},
		]);
		done();
	});

	it('5. Where', function (done) {
		const data = [{a: 1}, {a: 2}, {a: 3}];

		let res = alasql('SELECT a FROM ? WHERE ROWNUM() > 1', [data]);
		assert.deepEqual(res, [{a: 2}, {a: 3}]);

		res = alasql('SELECT a FROM ? WHERE ROWNUM() % 2 = 1', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 3}]);
		done();
	});

	it('6. UNION', function (done) {
		const data = [{a: 1}, {a: 2}, {a: 3}];
		const data2 = [{a: 4}, {a: 5}, {a: 6}];

		let res = alasql(
			'SELECT ROWNUM() as n, * FROM ? UNION ALL CORRESPONDING SELECT ROWNUM() as n, * FROM ?',
			[data, data2]
		);
		assert.deepEqual(res, [
			{a: 1, n: 1},
			{a: 2, n: 2},
			{a: 3, n: 3},
			{a: 4, n: 4},
			{a: 5, n: 5},
			{a: 6, n: 6},
		]);

		done();
	});

	// TODO: Add other operators

	it('6. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test288');
		done();
	});
});
