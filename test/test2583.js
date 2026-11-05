if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2583';

describe(`Test ${testId} - GREATEST/LEAST with NULL`, function () {
	// Helper: run a one-value query and return that value
	function val(sql, params) {
		return alasql(sql, params)[0].r;
	}

	// Helper: AlaSQL uses undefined for SQL NULL, users may pass null
	function isNull(v) {
		return v === null || v === undefined;
	}

	it('A) Argument order does not change the result (SQL NULL)', function () {
		assert.deepStrictEqual(
			val('SELECT GREATEST(1, NULL) AS r'),
			val('SELECT GREATEST(NULL, 1) AS r')
		);
		assert.deepStrictEqual(val('SELECT LEAST(1, NULL) AS r'), val('SELECT LEAST(NULL, 1) AS r'));
	});

	it('B) JS null is treated as NULL, not as the number 0', function () {
		// Under either NULL rule, whether the result is NULL must not
		// depend on the sign of the other number.
		assert.deepStrictEqual(
			isNull(val('SELECT GREATEST(?, ?) AS r', [1, null])),
			isNull(val('SELECT GREATEST(?, ?) AS r', [-1, null]))
		);
		assert.deepStrictEqual(
			isNull(val('SELECT LEAST(?, ?) AS r', [1, null])),
			isNull(val('SELECT LEAST(?, ?) AS r', [-1, null]))
		);
	});

	it('C) Normal values still work', function () {
		assert.deepStrictEqual(val('SELECT GREATEST(1, 5, 3) AS r'), 5);
		assert.deepStrictEqual(val('SELECT LEAST(1, 5, 3) AS r'), 1);
		assert.deepStrictEqual(val("SELECT GREATEST('a', 'b') AS r"), 'b');
		assert.deepStrictEqual(val("SELECT LEAST('a', 'b') AS r"), 'a');
	});

	it('D) Any NULL argument gives NULL (SQL standard rule)', function () {
		assert.deepStrictEqual(isNull(val('SELECT GREATEST(1, NULL) AS r')), true);
		assert.deepStrictEqual(isNull(val('SELECT GREATEST(NULL, 1) AS r')), true);
		assert.deepStrictEqual(isNull(val('SELECT LEAST(1, NULL, 3) AS r')), true);
		assert.deepStrictEqual(isNull(val('SELECT GREATEST(?, ?) AS r', [1, null])), true);
		assert.deepStrictEqual(isNull(val('SELECT MAX(5, NULL) AS r')), true);
		assert.deepStrictEqual(isNull(val('SELECT MIN(NULL, 5) AS r')), true);
	});
});
