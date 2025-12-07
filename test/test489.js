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
});
