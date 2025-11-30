if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1278 - Output JSON object as nested objects with INTO OBJECT', function () {
	const data = [
		{
			name: 'item1',
			details: {
				stock: 10,
				purchased: 100,
			},
		},
		{
			name: 'item2',
			details: {
				stock: 20,
				purchased: 200,
			},
		},
		{
			name: 'item3',
			details: {
				stock: 30,
				purchased: 300,
			},
		},
	];

	it('1. Current behavior - INTO JSON() returns flattened column names', function () {
		// This demonstrates the current (flattened) behavior
		var res = alasql('SELECT name, details->stock FROM ? WHERE details->stock > 11', [data]);
		// Currently returns: [{"name":"item2","details->stock":20},{"name":"item3","details->stock":30}]
		assert.deepEqual(res, [
			{name: 'item2', 'details->stock': 20},
			{name: 'item3', 'details->stock': 30},
		]);
	});

	it('2. INTO OBJECT() returns nested objects', function () {
		var res = alasql('SELECT name, details->stock INTO OBJECT() FROM ? WHERE details->stock > 11', [
			data,
		]);
		// Expected: [{"name":"item2","details":{"stock":20}},{"name":"item3","details":{"stock":30}}]
		assert.deepEqual(res, [
			{name: 'item2', details: {stock: 20}},
			{name: 'item3', details: {stock: 30}},
		]);
	});

	it('3. INTO OBJECT() with multiple nested levels', function () {
		const nestedData = [
			{
				id: 1,
				config: {
					settings: {
						enabled: true,
						count: 5,
					},
					name: 'test',
				},
			},
			{
				id: 2,
				config: {
					settings: {
						enabled: false,
						count: 10,
					},
					name: 'prod',
				},
			},
		];

		var res = alasql('SELECT id, config->settings->enabled, config->name INTO OBJECT() FROM ?', [
			nestedData,
		]);
		assert.deepEqual(res, [
			{id: 1, config: {settings: {enabled: true}, name: 'test'}},
			{id: 2, config: {settings: {enabled: false}, name: 'prod'}},
		]);
	});

	it('4. INTO OBJECT() with column alias still works', function () {
		var res = alasql(
			'SELECT name, details->stock AS stockLevel INTO OBJECT() FROM ? WHERE details->stock > 11',
			[data]
		);
		// When using AS, it should use the alias as the column name
		assert.deepEqual(res, [
			{name: 'item2', stockLevel: 20},
			{name: 'item3', stockLevel: 30},
		]);
	});

	it('5. INTO OBJECT() with no arrow notation behaves like regular output', function () {
		var res = alasql('SELECT name INTO OBJECT() FROM ? WHERE details->stock > 11', [data]);
		assert.deepEqual(res, [{name: 'item2'}, {name: 'item3'}]);
	});
});
