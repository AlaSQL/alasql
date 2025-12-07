if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 489 - ASCII with backslash character', function () {
	it('A) SELECT ASCII with backslash should return 92', function () {
		var res = alasql("VALUE OF SELECT ASCII('\\\\')");
		assert.equal(res, 92);
	});

	it('B) SELECT ASCII with backslash in column should return 92', function () {
		var res = alasql("SELECT ASCII('\\\\')");
		assert.equal(res[0]["ASCII('\\')"], 92);
	});

	it('C) Verify backslash character works in string literals', function () {
		var res = alasql("VALUE OF SELECT '\\\\'");
		assert.equal(res, '\\');
	});

	it('D) Escaped backslash followed by escaped quote (edge case)', function () {
		// In SQL: '\\''  means backslash followed by quote
		// \\ = one backslash, '' = one quote (SQL quote doubling)
		var res = alasql("VALUE OF SELECT '\\\\'''");
		assert.equal(res.length, 2);
		assert.equal(res.charCodeAt(0), 92); // backslash
		assert.equal(res.charCodeAt(1), 39); // quote
		assert.equal(res, "\\'");
	});

	it('E) Multiple backslashes followed by quote', function () {
		// In SQL: '\\\\''  means two backslashes followed by quote
		// \\\\ = two backslashes, '' = one quote
		var res = alasql("VALUE OF SELECT '\\\\\\\\'''");
		assert.equal(res.length, 3);
		assert.equal(res.charCodeAt(0), 92); // backslash
		assert.equal(res.charCodeAt(1), 92); // backslash
		assert.equal(res.charCodeAt(2), 39); // quote
		assert.equal(res, "\\\\'");
	});
});
