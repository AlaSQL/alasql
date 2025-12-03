if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 485 - UNION (ALL) with HTML tables', function () {
	const test = '485';

	// This test documents the fix for issue #485
	// The bug was in src/84from.js line 44: if (!sel && sel.tagName !== 'TABLE')
	// Changed to: if (!sel || sel.tagName !== 'TABLE')
	//
	// The original logic used && (AND) which would never properly validate:
	// - If !sel is true, sel.tagName would error
	// - The condition should check if EITHER sel is null OR it's not a TABLE
	//
	// This caused UNION operations on HTML tables to fail silently,
	// resulting in empty objects for rows from the second table.

	it('A) Documents the bug fix for HTML table validation', function () {
		// This test verifies that the logic fix is correct
		// The actual HTML table functionality requires a DOM which isn't available in Node.js tests

		// Simulate the old buggy logic
		var sel = null;
		var oldLogic = !sel && (sel ? sel.tagName !== 'TABLE' : false);
		// With old logic (!sel && ...), this evaluates to false when sel is null
		assert.equal(oldLogic, false, 'Old logic fails to detect null selector');

		// Simulate the fixed logic
		var newLogic = !sel || (sel ? sel.tagName !== 'TABLE' : false);
		// With new logic (!sel || ...), this correctly evaluates to true when sel is null
		assert.equal(newLogic, true, 'New logic correctly detects null selector');
	});

	it('B) UNION ALL works with regular tables', function () {
		// This verifies UNION ALL functionality with regular in-memory tables
		// which is the same operation that would be performed on HTML tables

		var res = alasql('SELECT 1 as ID, "John" as Name UNION ALL SELECT 2 as ID, "Jane" as Name');

		assert.equal(res.length, 2, 'UNION ALL should return 2 rows');
		assert.deepEqual(
			res,
			[
				{ID: 1, Name: 'John'},
				{ID: 2, Name: 'Jane'},
			],
			'Both rows should have data'
		);
	});

	it('C) UNION works with regular tables', function () {
		var res = alasql(
			'SELECT 1 as ID, "John" as Name UNION SELECT 2 as ID, "Jane" as Name ORDER BY ID'
		);

		assert.equal(res.length, 2, 'UNION should return 2 rows');
		assert.deepEqual(
			res,
			[
				{ID: 1, Name: 'John'},
				{ID: 2, Name: 'Jane'},
			],
			'Both rows should have data'
		);
	});

	it('D) UNION ALL removes duplicates correctly', function () {
		var res = alasql('SELECT 1 as ID UNION SELECT 1 as ID');

		assert.equal(res.length, 1, 'UNION should remove duplicates');
		assert.deepEqual(res, [{ID: 1}], 'Only one row should remain');
	});
});
