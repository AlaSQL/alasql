if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1263 - Nested SELECT', function () {
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

	it('1. JOIN', function (done) {
		var expected = [
			{id: '1', a: 'one', b: 'A'},
			{id: '2', a: 'two', b: 'B'},
			{id: '3', a: 'three'},
			{id: '4', a: 'four'},
			{id: '5', b: 'E'},
			{id: '6', b: 'F'},
		];

		var res = alasql('SELECT * FROM ? T1 OUTER JOIN ? T2 ON T1.id = T2.id', [t1, t2]);
		assert.deepEqual(res, expected);

		var res = alasql('SELECT * FROM ? T1 OUTER JOIN (SELECT * FROM ?) T2 ON T1.id = T2.id', [
			t1,
			t2,
		]);
		assert.deepEqual(res, expected);
		done();
	});
});
