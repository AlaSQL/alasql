if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('SUBSTRING with non-positive start position', function () {
	it('follows MySQL semantics for start = 0', function () {
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', 0, 3)"), '');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', 0)"), '');
	});

	it('follows MySQL semantics for a negative start (counts from the end)', function () {
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -1, 3)"), 'f');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -2, 3)"), 'ef');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -2)"), 'ef');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -6)"), 'abcdef');
	});

	it('returns empty when a negative start reaches past the string start', function () {
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -7, 3)"), '');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -10, 3)"), '');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', -7)"), '');
	});

	it('leaves positive start positions unchanged', function () {
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', 1, 3)"), 'abc');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', 2, 3)"), 'bcd');
		assert.strictEqual(alasql("SELECT VALUE SUBSTRING('abcdef', 4)"), 'def');
	});

	it('applies the same rules to the SUBSTR and MID aliases', function () {
		assert.strictEqual(alasql("SELECT VALUE SUBSTR('abcdef', 0, 3)"), '');
		assert.strictEqual(alasql("SELECT VALUE MID('abcdef', -2, 3)"), 'ef');
	});
});
