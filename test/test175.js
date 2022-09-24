if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 175 - JOIN USING TEST', function () {
	it('1. JOIN ON', function (done) {
		var data = {
			COLORS: [
				[1, 'red'],
				[2, 'yellow'],
				[3, 'orange'],
			],
			FRUITS: [
				[1, 'apple'],
				[2, 'banana'],
				[3, 'orange'],
			],
		};

		data.NEW_FRUITS = alasql(
			'SELECT MATRIX COLORS.[0], COLORS.[1], FRUITS.[1] AS [2] \
			FROM ? AS COLORS JOIN ? AS FRUITS ON COLORS.[0] = FRUITS.[0]',
			[data.COLORS, data.FRUITS]
		);
		assert.deepEqual(data.NEW_FRUITS, [
			[1, 'red', 'apple'],
			[2, 'yellow', 'banana'],
			[3, 'orange', 'orange'],
		]);
		done();
	});

	it('2. JOIN USING', function (done) {
		var data = {
			COLORS: [
				[1, 'red'],
				[2, 'yellow'],
				[3, 'orange'],
			],
			FRUITS: [
				[1, 'apple'],
				[2, 'banana'],
				[3, 'orange'],
			],
		};

		data.NEW_FRUITS = alasql(
			'SELECT MATRIX COLORS.[0], COLORS.[1], FRUITS.[1] AS [2] \
			FROM ? AS COLORS JOIN ? AS FRUITS USING [0]',
			[data.COLORS, data.FRUITS]
		);
		//		console.log(data.NEW_FRUITS);
		assert.deepEqual(data.NEW_FRUITS, [
			[1, 'red', 'apple'],
			[2, 'yellow', 'banana'],
			[3, 'orange', 'orange'],
		]);
		done();
	});
});

//};
