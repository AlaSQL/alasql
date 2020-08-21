if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 801 - OUTER JOIN of 4 tables', function () {
	it('1. ARRAY()', function (done) {
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
		var t3 = [
			{id: '1', c: 'I'},
			{id: '4', c: 'IV'},
			{id: '5', c: 'V'},
			{id: '7', c: 'VII'},
			{id: '8', c: 'VIII'},
		];
		var t4 = [
			{id: '1', d: 'a'},
			{id: '8', d: 'h'},
			{id: '9', d: 'i'},
		];

		var res = alasql(
			'SELECT * FROM ? T1 ' +
				'OUTER JOIN ? T2 ON T1.id = T2.id ' +
				'OUTER JOIN ? T3 ON T1.id = T3.id OR T2.id = T3.id ' +
				'OUTER JOIN ? T4 ON T1.id = T4.id OR T2.id = T4.id OR T3.id = T4.id',
			[t1, t2, t3, t4]
		);

		var expected = [
			{id: '1', a: 'one', b: 'A', c: 'I', d: 'a'},
			{id: '2', a: 'two', b: 'B'},
			{id: '3', a: 'three'},
			{id: '4', a: 'four', c: 'IV'},
			{id: '5', b: 'E', c: 'V'},
			{id: '6', b: 'F'},
			{id: '7', c: 'VII'},
			{id: '8', c: 'VIII', d: 'h'},
			{id: '9', d: 'i'},
		];

		assert.deepEqual(res, expected);
		done();
	});
});
