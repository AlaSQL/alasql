if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 138 NoSQL', function () {
	it('1. deepCopy', function (done) {
		alasql('CREATE DATABASE test138; use test138');

		//		var res = alasql('SELECT COLUMN deepCopy(a) FROM @[{a:[1,2]}, {a:[3,4]}]');
		//		assert.deepEqual(res, [[1,2],[3,4]]);

		var ar = [{a: [1, 2]}, {a: [3.4]}];
		var res = alasql('SELECT COLUMN a FROM ?', [ar]);
		assert.deepEqual(res, [[1, 2], [3.4]]);

		var ar = [{a: [1, 2]}, {a: [3.4]}];
		var res = alasql('SELECT a FROM ?', [ar]);
		ar[0].a = [5, 6];
		//assert.deepEqual(res, [{a:[5,6]},{a:[3.4]}]);
		assert.deepEqual(ar, [{a: [5, 6]}, {a: [3.4]}]);

		var ar = [{a: [1, 2]}, {a: [3, 4]}];
		var res = alasql('SELECT COLUMN cloneDeep(a) FROM ?', [ar]);
		assert.deepEqual(res, [
			[1, 2],
			[3, 4],
		]);
		ar[0].a = [5, 6];
		assert.deepEqual(res, [
			[1, 2],
			[3, 4],
		]);

		var ar = [{a: [[1, 2], 2]}, {a: [3, 4]}];
		var res = alasql('SELECT a->0 AS q FROM ? WHERE a->1 = 2', [ar]);
		assert.deepEqual(res, [{q: [1, 2]}]);
		ar[0].a = 7;
		assert.deepEqual(res[0].q, [1, 2]);

		var ar = [{a: [[1, 2], 2]}, {a: [3, 4]}];
		var res = alasql('SELECT VALUE cloneDeep(a->0) FROM ? WHERE a->1 = 2', [ar]);
		assert.deepEqual(res, [1, 2]);
		ar[0].a[0] = 7;
		assert.deepEqual(res, [1, 2]);

		done();
	});

	it('2. Get JSON property operator', function (done) {
		alasql('CREATE TABLE one');

		alasql('INSERT INTO one VALUES @{a:2}, @(?)', [{a: 4}]);

		var res = alasql('SELECT COLUMN a FROM one');
		assert.deepEqual(res, [2, 4]);

		done();
	});

	if (false) {
		it('3. GROUP functions', function (done) {
			alasql('CREATE TABLE two (a INT, b INT)');
			alasql('INSERT INTO two VALUES (1,1), (1,2), (1,3), (2,1), (2,2)');
			alasql('SELECT a, SUM(b) AS b1, COUNT(*) AS c1, GROUP(b1/c1) AS avg FROM two GROUP BY a');
			assert.deepEqual(res, [
				{a: 1, b1: 6, c1: 3, avg: 2},
				{a: 2, b1: 3, c1: 2, avg: 1.5},
			]);

			var res = alasql('SELECT SUM(b) AS bb FROM two GROUP BY TOTAL');
			assert.deepEqual(res, [{bb: 9}]);

			var res = alasql('SELECT SUM(b) AS bb FROM two GROUP BY TOTAL()');
			assert.deepEqual(res, [{bb: 9}]);

			var res = alasql('SELECT a,SUM(b) AS bb,b FROM two GROUP BY TOTAL(a,DETAIL) ORDER BY a,bb,b');
			assert.deepEqual(res, [
				{a: undefined, bb: 9},
				{a: 1, bb: 6, b: undefined},
				{a: 1, bb: undefined, b: 1},
				{a: 1, bb: undefined, b: 2},
				{a: 1, bb: undefined, b: 3},
				{a: 2, bb: 3, b: undefined},
				{a: 2, bb: undefined, b: 1},
				{a: 2, bb: undefined, b: 2},
			]);

			var res = alasql(
				'SELECT a,SUM(b) AS b, LEVEL() as level FROM two GROUP BY TOTAL(a,DETAIL) ORDER BY a,bb,b'
			);
			assert.deepEqual(res, [
				{a: undefined, b: 9, level: 0},
				{a: 1, bb: 6, b: undefined},
				{a: 1, bb: undefined, b: 1},
				{a: 1, bb: undefined, b: 2},
				{a: 1, bb: undefined, b: 3},
				{a: 2, bb: 3, b: undefined},
				{a: 2, bb: undefined, b: 1},
				{a: 2, bb: undefined, b: 2},
			]);

			done();
		});

		it('4. Dimension', function (done) {
			alasql('CREATE TABLE expense (deptid string, amt MONEY)');
			alasql('CREATE TABLE dept (deptid string, parentid string, level int)');
			alasql('PREPARE DIM dept');
			alasql(
				'SELECT deptid, deptname, SUM(amt) AS amt FROM expense JOIN dept USING deptid ' +
					'GROUP BY DIM(deptid, dept)'
			);
			done();
		});
	}

	it('4. CREATE TABLE for JSON objects', function (done) {
		alasql('CREATE TABLE three (a JSON); INSERT INTO three VALUES (@{v:10})');
		var res = alasql('SELECT VALUE a FROM three');
		assert.deepEqual(res, {v: 10});

		alasql('CREATE TABLE four; INSERT INTO four VALUES @{a:{v:10}}');
		var res = alasql('SELECT VALUE a FROM four');
		assert.deepEqual(res, {v: 10});

		done();
	});

	it('5. Get JSON param values in sub-arrays', function (done) {
		alasql('DROP DATABASE test138');
		done();
	});
});
