if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1264';

describe(`Test ${testId} - UNION with nested SELECT`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	var t1 = [
		{id: '1', a: 'one'},
		{id: '2', a: 'two'},
		{id: '3', a: 'three'},
		{id: '4', a: 'four'},
	];
	var t2 = [
		{id: '1', b: 'A'},
		{id: '2', b: 'B'},
		{id: '5', b: 'E'},
		{id: '6', b: 'F'},
	];

	var expected = [
		{id: '1', b: 'A'},
		{id: '2', b: 'B'},
		{id: '5', b: 'E'},
		{id: '6', b: 'F'},
		{id: '1', a: 'one', c: 4},
		{id: '2', a: 'two', c: 4},
		{id: '3', a: 'three', c: 4},
		{id: '4', a: 'four', c: 4},
	];

	it('A) UNION CORRESPONDING with a scalar subquery column', function () {
		var res = alasql(
			'SELECT *, (SELECT COUNT(*) FROM ?) AS c FROM ? T1 UNION CORRESPONDING SELECT * FROM ?',
			[t1, t1, t2]
		);
		assert.deepEqual(res, expected);
	});

	it('B) UNION CORRESPONDING with a scalar subquery column, nested in FROM', function () {
		var res = alasql(
			'SELECT * FROM (SELECT *, (SELECT COUNT(*) FROM ?) AS c FROM ? T1 UNION CORRESPONDING SELECT * FROM ?)',
			[t1, t1, t2]
		);
		assert.deepEqual(res, expected);
	});

	it('C) UNION ALL CORRESPONDING with a scalar subquery column, nested in FROM', function () {
		var res = alasql(
			'SELECT * FROM (SELECT *, (SELECT COUNT(*) FROM ?) AS c FROM ? T1 UNION ALL CORRESPONDING SELECT * FROM ?)',
			[t1, t1, t2]
		);
		assert.deepEqual(res, [
			{id: '1', a: 'one', c: 4},
			{id: '2', a: 'two', c: 4},
			{id: '3', a: 'three', c: 4},
			{id: '4', a: 'four', c: 4},
			{id: '1', b: 'A'},
			{id: '2', b: 'B'},
			{id: '5', b: 'E'},
			{id: '6', b: 'F'},
		]);
	});

	it('D) scalar subquery column on the right side of the UNION', function () {
		var res = alasql(
			'SELECT * FROM (SELECT * FROM ? UNION CORRESPONDING SELECT *, (SELECT COUNT(*) FROM ?) AS c FROM ?)',
			[t2, t1, t1]
		);
		assert.deepEqual(res, [
			{id: '1', a: 'one', c: 4},
			{id: '2', a: 'two', c: 4},
			{id: '3', a: 'three', c: 4},
			{id: '4', a: 'four', c: 4},
			{id: '1', b: 'A'},
			{id: '2', b: 'B'},
			{id: '5', b: 'E'},
			{id: '6', b: 'F'},
		]);
	});

	it('E) scalar subquery column in a FROM subselect without UNION', function () {
		var res = alasql('SELECT * FROM (SELECT *, (SELECT COUNT(*) FROM ?) AS c FROM ?)', [t1, t1]);
		assert.deepEqual(res, [
			{id: '1', a: 'one', c: 4},
			{id: '2', a: 'two', c: 4},
			{id: '3', a: 'three', c: 4},
			{id: '4', a: 'four', c: 4},
		]);
	});

	it('F) scalar subquery nested inside another scalar subquery', function () {
		var data = [
			{TYPE: 'CAUSE', PARENT: 'FL1', FAILURECODE: '999', FAILURELIST: 'FLX'},
			{TYPE: 'PROBLEM', PARENT: 'FL0', FAILURECODE: '123', FAILURELIST: 'FL1'},
			{TYPE: '', PARENT: '', FAILURECODE: '234', FAILURELIST: 'FL0'},
		];
		var res = alasql(
			"SELECT * FROM ? WHERE TYPE = 'CAUSE' AND PARENT = " +
				"(SELECT FAILURELIST FROM ? WHERE FAILURECODE = '123' AND TYPE = 'PROBLEM' AND PARENT = " +
				"(SELECT FAILURELIST FROM ? WHERE FAILURECODE = '234' AND TYPE = '' AND PARENT = ''))",
			[data, data, data]
		);
		assert.deepEqual(res, [{TYPE: 'CAUSE', PARENT: 'FL1', FAILURECODE: '999', FAILURELIST: 'FLX'}]);
	});
});
