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

	it('F) Comprehensive quote and backslash escaping tests', function () {
		// Building from fundamentals to complex combinations
		// Testing single quotes, double quotes, and backslashes

		// Basic single quote in double quotes
		assert.equal(alasql("VALUE OF SELECT \"'\""), "'");
		
		// SQL quote doubling - '' becomes '
		assert.equal(alasql("VALUE OF SELECT ''''"), "'");
		
		// Double quote inside single quotes
		assert.equal(alasql("VALUE OF SELECT '\"\"'"), '""');
		
		// Backslash escaping - \\ becomes \
		assert.equal(alasql("VALUE OF SELECT '\\\\'"), "\\");
		
		// Two backslashes - \\\\ becomes \\
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\'"), "\\\\");
		
		// Three backslashes - \\\\\\ becomes \\\
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\'"), "\\\\\\");
		
		// Four backslashes - \\\\\\\\ becomes \\\\
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\\\\\'"), "\\\\\\\\");
		
		// Five backslashes - \\\\\\\\\\ becomes \\\\\
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\\\\\\\\\'"), "\\\\\\\\\\");
		
		// Backslash followed by doubled quote - \\'' becomes \'
		assert.equal(alasql("VALUE OF SELECT '\\\\'''"), "\\'");
		
		// Two backslashes followed by doubled quote - \\\\'' becomes \\'
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\'''"), "\\\\'");
		
		// Three backslashes followed by doubled quote - \\\\\\'' becomes \\\'
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\'''"), "\\\\\\'");
		
		// Four backslashes followed by doubled quote - \\\\\\\\'' becomes \\\\'
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\\\\\'''"), "\\\\\\\\'");
		
		// Five backslashes followed by doubled quote - \\\\\\\\\\'' becomes \\\\\'
		assert.equal(alasql("VALUE OF SELECT '\\\\\\\\\\\\\\\\\\\\'''"), "\\\\\\\\\\'");
		
		// Doubled quote with text - ''a'' becomes 'a'
		assert.equal(alasql("VALUE OF SELECT '''a'''"), "'a'");
		
		// Text with doubled quote in middle - a''b becomes a'b
		assert.equal(alasql("VALUE OF SELECT 'a''b'"), "a'b");
		
		// Backslash before doubled quote in text - a\\'' becomes a\'
		assert.equal(alasql("VALUE OF SELECT 'a\\\\'''"), "a\\'");
		
		// Multiple doubled quotes - '''' becomes '
		assert.equal(alasql("VALUE OF SELECT ''''"), "'");
		
		// Two sets of doubled quotes - '''''' becomes ''
		assert.equal(alasql("VALUE OF SELECT ''''''"), "''");
		
		// Three sets of doubled quotes - '''''''' becomes '''
		assert.equal(alasql("VALUE OF SELECT ''''''''"), "'''");
		
		// Double quotes with backslash inside
		assert.equal(alasql("VALUE OF SELECT \"\\\\\""), "\\");
		
		// Complex: backslash, quote, backslash, quote in one string - \\''\\'
		assert.equal(alasql("VALUE OF SELECT '\\\\''\\\\'''"), "\\'\\'");
		
		// Very complex: multiple backslashes and quotes
		var result = alasql("VALUE OF SELECT '\\\\\\\\''\\\\'''");
		assert.equal(result, "\\\\'\\'");
	});
});
