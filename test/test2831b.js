if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2831 - PostgreSQL number functions', function () {
	function v(sql) {
		return alasql('SELECT VALUE ' + sql);
	}

	it('TRUNC and SIGN', function () {
		assert.equal(v('TRUNC(42.8)'), 42);
		assert.equal(v('TRUNC(-42.8)'), -42);
		assert.equal(v('TRUNC(42.4382, 2)'), 42.43);
		assert.equal(v('SIGN(-8.4)'), -1);
		assert.equal(v('SIGN(0)'), 0);
	});

	it('logarithms, CBRT and PI', function () {
		assert.equal(v('LN(1)'), 0);
		assert.equal(v('LOG(100)'), 2);
		assert.equal(v('LOG(2, 8)'), 3);
		assert.equal(v('LOG10(1000)'), 3);
		assert.equal(v('LOG2(8)'), 3);
		assert.equal(v('LN(0)'), undefined);
		assert.equal(v('CBRT(27)'), 3);
		assert.equal(v('PI()'), Math.PI);
	});

	it('MOD, DIV, GCD and LCM', function () {
		assert.equal(v('MOD(9, 4)'), 1);
		assert.equal(v('MOD(-9, 4)'), -1);
		assert.equal(v('MOD(9, 0)'), undefined);
		assert.equal(v('DIV(9, 4)'), 2);
		assert.equal(v('DIV(-9, 4)'), -2);
		assert.equal(v('GCD(1071, 462)'), 21);
		assert.equal(v('LCM(1071, 462)'), 23562);
		assert.equal(v('LCM(0, 5)'), 0);
	});

	it('WIDTH_BUCKET', function () {
		assert.equal(v('WIDTH_BUCKET(5.35, 0.024, 10.06, 5)'), 3);
		assert.equal(v('WIDTH_BUCKET(-1, 0, 10, 5)'), 0);
		assert.equal(v('WIDTH_BUCKET(10, 0, 10, 5)'), 6);
		assert.equal(v('WIDTH_BUCKET(8, 10, 0, 5)'), 2);
	});

	it('NULL gives NULL', function () {
		assert.equal(v('TRUNC(NULL)'), undefined);
		assert.equal(v('MOD(NULL, 2)'), undefined);
		assert.equal(v('GCD(4, NULL)'), undefined);
	});
});
