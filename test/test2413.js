if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2413 - GROUP_CONCAT with DISTINCT, ORDER BY and SEPARATOR', function () {
	let data;
	let res;

	it('A) Basic GROUP_CONCAT (existing functionality)', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'Mexico'}];
		res = alasql('SELECT GROUP_CONCAT(country) as countries FROM ?', [data]);
		assert.deepEqual(res, [{countries: 'USA,Canada,Mexico'}]);
	});

	it('B) GROUP_CONCAT with DISTINCT', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'USA'}, {country: 'Mexico'}];
		res = alasql('SELECT GROUP_CONCAT(DISTINCT country) as countries FROM ?', [data]);
		// DISTINCT removes duplicates, order not guaranteed without ORDER BY
		// So we just check the values are present and count is correct
		const countries = res[0].countries.split(',');
		assert.equal(countries.length, 3);
		assert.ok(countries.includes('USA'));
		assert.ok(countries.includes('Canada'));
		assert.ok(countries.includes('Mexico'));
	});

	it('C) GROUP_CONCAT with ORDER BY', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'Mexico'}];
		res = alasql('SELECT GROUP_CONCAT(country ORDER BY country ASC) as countries FROM ?', [data]);
		assert.deepEqual(res, [{countries: 'Canada,Mexico,USA'}]);
	});

	it('D) GROUP_CONCAT with SEPARATOR', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'Mexico'}];
		res = alasql("SELECT GROUP_CONCAT(country SEPARATOR ';') as countries FROM ?", [data]);
		assert.deepEqual(res, [{countries: 'USA;Canada;Mexico'}]);
	});

	it('E) GROUP_CONCAT with DISTINCT and ORDER BY', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'USA'}, {country: 'Mexico'}];
		res = alasql('SELECT GROUP_CONCAT(DISTINCT country ORDER BY country ASC) as countries FROM ?', [
			data,
		]);
		assert.deepEqual(res, [{countries: 'Canada,Mexico,USA'}]);
	});

	it('F) GROUP_CONCAT with DISTINCT, ORDER BY and SEPARATOR (full MySQL syntax)', function () {
		data = [
			{country: 'USA'},
			{country: 'Canada'},
			{country: 'USA'},
			{country: 'Mexico'},
			{country: 'Canada'},
		];
		res = alasql(
			"SELECT GROUP_CONCAT(DISTINCT country ORDER BY country ASC SEPARATOR ';') as countries FROM ?",
			[data]
		);
		assert.deepEqual(res, [{countries: 'Canada;Mexico;USA'}]);
	});

	it('G) GROUP_CONCAT with ORDER BY DESC', function () {
		data = [{country: 'USA'}, {country: 'Canada'}, {country: 'Mexico'}];
		res = alasql('SELECT GROUP_CONCAT(country ORDER BY country DESC) as countries FROM ?', [data]);
		assert.deepEqual(res, [{countries: 'USA,Mexico,Canada'}]);
	});

	it('H) GROUP_CONCAT with GROUP BY clause', function () {
		data = [
			{region: 'NA', country: 'USA'},
			{region: 'NA', country: 'Canada'},
			{region: 'NA', country: 'Mexico'},
			{region: 'EU', country: 'France'},
			{region: 'EU', country: 'Germany'},
		];
		res = alasql(
			"SELECT region, GROUP_CONCAT(country ORDER BY country ASC SEPARATOR '\\n') as countries FROM ? GROUP BY region ORDER BY region",
			[data]
		);
		assert.deepEqual(res, [
			{region: 'EU', countries: 'France\nGermany'},
			{region: 'NA', countries: 'Canada\nMexico\nUSA'},
		]);
	});
});
