if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1277 - HAVING clause accepting SELECT aliases', function () {
	var data = [
		{Country: 'US', Name: 'NYC', Population: 8},
		{Country: 'US', Name: 'LA', Population: 4},
		{Country: 'US', Name: 'SFO', Population: 3},
		{Country: 'CA', Name: 'MTL', Population: 4},
		{Country: 'CA', Name: 'QC', Population: 2},
	];

	it('1. HAVING with COUNT(*) alias', function (done) {
		var res = alasql(
			'SELECT Country, COUNT(*) AS cnt FROM ? GROUP BY Country HAVING cnt > 2 ORDER BY Country',
			[data]
		);
		assert.deepStrictEqual(res, [{Country: 'US', cnt: 3}]);
		done();
	});

	it('2. HAVING with alias in SELECT * query', function (done) {
		var res = alasql(
			'SELECT *, COUNT(*) AS cnt FROM ? GROUP BY Country HAVING cnt > 2 ORDER BY Country',
			[data]
		);
		assert.deepStrictEqual(res, [{Country: 'US', Name: 'NYC', Population: 8, cnt: 3}]);
		done();
	});

	it('3. HAVING with SUM() alias', function (done) {
		var res = alasql(
			'SELECT Country, SUM(Population) AS popsum FROM ? GROUP BY Country HAVING popsum > 10 ORDER BY Country',
			[data]
		);
		assert.deepStrictEqual(res, [{Country: 'US', popsum: 15}]);
		done();
	});

	it('4. Plain aggregator in HAVING, no alias, still works', function (done) {
		var res = alasql(
			'SELECT Country FROM ? GROUP BY Country HAVING COUNT(*) > 2 ORDER BY Country',
			[data]
		);
		assert.deepStrictEqual(res, [{Country: 'US'}]);
		done();
	});
});
