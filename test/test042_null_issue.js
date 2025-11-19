if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 042 - NULL values in INTO SQL()', function () {
	it('1. Should output NULL for null values', function (done) {
		var data = [
			{a: 1, b: 'test', c: null, d: 3},
			{a: 2, b: null, c: 4, d: null},
			{a: null, b: 'value', c: null, d: null},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		console.log('Generated SQL:');
		console.log(res);

		// Check that NULL appears in the output instead of empty values
		assert(res.indexOf('NULL') > -1, 'Output should contain NULL keyword');

		// Check that we don't have consecutive commas (,,) which indicate missing values
		assert(res.indexOf(',,') === -1, 'Output should not contain consecutive commas (,,)');

		// Verify specific patterns for NULL values
		// First row: c should be NULL
		assert(res.indexOf("(1,'test',NULL,3)") > -1, 'First row should have NULL for c');

		// Second row: b and d should be NULL
		assert(res.indexOf('(2,NULL,4,NULL)') > -1, 'Second row should have NULL for b and d');

		// Third row: a, c, and d should be NULL
		assert(
			res.indexOf("(NULL,'value',NULL,NULL)") > -1,
			'Third row should have NULL for a, c, and d'
		);

		done();
	});

	it('2. Should handle undefined values as NULL', function (done) {
		var data = [
			{a: 1, b: 'test'},
			{a: 2, b: undefined, c: 4},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		console.log('Generated SQL with undefined:');
		console.log(res);

		// Check that NULL appears in the output
		assert(res.indexOf('NULL') > -1, 'Output should contain NULL keyword for undefined values');

		// Check that we don't have consecutive commas
		assert(res.indexOf(',,') === -1, 'Output should not contain consecutive commas (,,)');

		done();
	});

	it('3. Should handle mixed NULL, undefined, and empty strings', function (done) {
		var data = [{a: 1, b: '', c: null, d: undefined}];
		var res = alasql('SELECT * INTO SQL({tableid:"test_table"}) FROM ?', [data]);

		console.log('Generated SQL with mixed values:');
		console.log(res);

		// Empty string should remain as empty string
		assert(res.indexOf("''") > -1, "Empty string should be preserved as ''");

		// null and undefined should become NULL
		assert(res.indexOf('NULL') > -1, 'null and undefined should become NULL');

		done();
	});
});
