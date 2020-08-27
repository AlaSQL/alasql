if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 226 CROSS APPLY and OUTER APPLY', function () {
	it('1. CROSS APPLY', function (done) {
		var one = [{a: 1}, {a: 2}, {a: 3}];
		var two = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 3, b: 30},
		];
		var res = alasql(
			'SELECT one.a,three.b FROM ? one \
    		CROSS APPLY \
    		(SELECT b FROM ? two WHERE one.a = two.a) three',
			[one, two]
		);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 3, b: 30},
		]);
		done();
	});

	it('2. CROSS APPLY', function (done) {
		var one = [{a: 1}, {a: 2}, {a: 3}];
		var two = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 4, b: 40},
		];
		var res = alasql(
			'SELECT one.a,three.b FROM ? one \
    		CROSS APPLY \
    		(SELECT b FROM ? two WHERE one.a = two.a) three',
			[one, two]
		);
		//    	console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
		]);
		done();
	});

	it('3. CROSS APPLY', function (done) {
		var one = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
		var two = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 4, b: 40},
		];
		var res = alasql(
			'SELECT one.a,three.b FROM ? one \
    		CROSS APPLY \
    		(SELECT b FROM ? two WHERE one.a = two.a) three',
			[one, two]
		);
		//    	console.log(res);

		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 4, b: 40},
		]);
		done();
	});

	it('4. OUTER APPLY', function (done) {
		var one = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
		var two = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 4, b: 40},
		];
		var res = alasql(
			'SELECT one.a,three.b FROM ? one \
    		OUTER APPLY \
    		(SELECT b FROM ? two WHERE one.a = two.a) three',
			[one, two]
		);
		//    	console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 2, b: 30},
			{a: 3, b: undefined},
			{a: 4, b: 40},
		]);
		done();
	});

	it('5. CROSS APPLY', function (done) {
		var res = alasql(
			'SELECT one._ AS a,two._ AS b FROM RANGE(1,5) AS one \
    		OUTER APPLY (SELECT COLUMN ARRAY(_) FROM RANGE(1,one._) half GROUP BY half._ % 2) two'
		);
		//    	console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: [1]},
			{a: 2, b: [1]},
			{a: 2, b: [2]},
			{a: 3, b: [1, 3]},
			{a: 3, b: [2]},
			{a: 4, b: [1, 3]},
			{a: 4, b: [2, 4]},
			{a: 5, b: [1, 3, 5]},
			{a: 5, b: [2, 4]},
		]);
		done();
	});
});
