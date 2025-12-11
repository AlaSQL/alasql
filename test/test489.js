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

	it('G) Double quote escaping tests', function () {
		// Note: In SQL, double quotes are typically for identifiers, not string literals
		// AlaSQL allows both single and double quotes for strings, but only single quote
		// doubling works as an escape sequence. Double quotes inside double-quoted strings
		// are treated as literal characters, not escape sequences.
		
		// Double-quoted string with literal double quotes (no escaping)
		assert.equal(alasql('VALUE OF SELECT """"'), '""');
		
		// Double-quoted string (alternative syntax, no escaping needed)
		assert.equal(alasql("VALUE OF SELECT \"\"\"\""), '""');
		
		// Double quote inside single quotes (no escaping, just literal characters)
		assert.equal(alasql("VALUE OF SELECT '\"\"'"), '""');
		
		// Single double quote in double-quoted string
		assert.equal(alasql('VALUE OF SELECT "x"'), 'x');
		
		// Multiple double quotes are literal in double-quoted strings
		assert.equal(alasql('VALUE OF SELECT "a""b"'), 'a""b');
	});

	it('H) Parameterized queries with escaped data', function () {
		// Test how the parser handles escaped characters when data is passed in
		
		// Single quote in parameter
		var res1 = alasql("VALUE OF SELECT ?", ["'"]);
		assert.equal(res1, "'");
		
		// Double single quotes in parameter
		var res2 = alasql("VALUE OF SELECT ?", ["''"]);
		assert.equal(res2, "''");
		
		// Backslash in parameter
		var res3 = alasql("VALUE OF SELECT ?", ["\\"]);
		assert.equal(res3, "\\");
		
		// Multiple backslashes in parameter
		var res4 = alasql("VALUE OF SELECT ?", ["\\\\"]);
		assert.equal(res4, "\\\\");
		
		// Backslash followed by quote in parameter
		var res5 = alasql("VALUE OF SELECT ?", ["\\'"]);
		assert.equal(res5, "\\'");
		
		// Double quote in parameter
		var res6 = alasql("VALUE OF SELECT ?", ['"']);
		assert.equal(res6, '"');
		
		// Double quotes in parameter
		var res7 = alasql("VALUE OF SELECT ?", ['""']);
		assert.equal(res7, '""');
		
		// Complex: backslash, quote, backslash in parameter
		var res8 = alasql("VALUE OF SELECT ?", ["\\'\\"]);
		assert.equal(res8, "\\'\\");
		
		// Test round-trip: insert and select with escaped characters
		alasql("CREATE TABLE test_escape (val STRING)");
		
		// Insert single quote
		alasql("INSERT INTO test_escape VALUES (?)", ["'"]);
		var result1 = alasql("SELECT val FROM test_escape");
		assert.equal(result1[0].val, "'");
		
		// Clear and insert backslash
		alasql("DELETE FROM test_escape");
		alasql("INSERT INTO test_escape VALUES (?)", ["\\"]);
		var result2 = alasql("SELECT val FROM test_escape");
		assert.equal(result2[0].val, "\\");
		
		// Clear and insert backslash + quote
		alasql("DELETE FROM test_escape");
		alasql("INSERT INTO test_escape VALUES (?)", ["\\'"]);
		var result3 = alasql("SELECT val FROM test_escape");
		assert.equal(result3[0].val, "\\'");
		
		// Clean up
		alasql("DROP TABLE test_escape");
	});
});
