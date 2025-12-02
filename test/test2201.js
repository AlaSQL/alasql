if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2201 - RECORDSET OF with wildcard and additional columns', function () {
	it('1. RECORDSET OF SELECT t.*, additional_column returns all columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
			{a: 1, b: 30},
		];
		var res = alasql('RECORDSET OF SELECT t.*, 1 as rn FROM ? t', [data]);

		// Check that all columns are present in the columns array
		assert.equal(res.columns.length, 3, 'Should have 3 columns');

		var columnIds = res.columns.map(function (col) {
			return col.columnid;
		});
		assert(columnIds.includes('a'), 'Should include column a');
		assert(columnIds.includes('b'), 'Should include column b');
		assert(columnIds.includes('rn'), 'Should include column rn');

		// Check data integrity
		assert.equal(res.data.length, 3, 'Should have 3 rows');
		assert.deepEqual(res.data[0], {rn: 1, a: 1, b: 10});
		assert.deepEqual(res.data[1], {rn: 1, a: 2, b: 20});
		assert.deepEqual(res.data[2], {rn: 1, a: 1, b: 30});

		done();
	});

	it('2. RECORDSET OF SELECT *, additional_column returns all columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT *, 1 as rn FROM ? t', [data]);

		// Check that all columns are present
		assert.equal(res.columns.length, 3, 'Should have 3 columns');

		var columnIds = res.columns.map(function (col) {
			return col.columnid;
		});
		assert(columnIds.includes('a'), 'Should include column a');
		assert(columnIds.includes('b'), 'Should include column b');
		assert(columnIds.includes('rn'), 'Should include column rn');

		done();
	});

	it('3. RECORDSET OF SELECT t.* still works correctly', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT t.* FROM ? t', [data]);

		// Check that all columns are present
		assert.equal(res.columns.length, 2, 'Should have 2 columns');

		var columnIds = res.columns.map(function (col) {
			return col.columnid;
		});
		assert(columnIds.includes('a'), 'Should include column a');
		assert(columnIds.includes('b'), 'Should include column b');

		done();
	});

	it('4. RECORDSET OF SELECT explicit columns works correctly', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT a, b, 1 as rn FROM ? t', [data]);

		// Check that all columns are present
		assert.equal(res.columns.length, 3, 'Should have 3 columns');

		var columnIds = res.columns.map(function (col) {
			return col.columnid;
		});
		assert.deepEqual(columnIds, ['a', 'b', 'rn'], 'Should have columns in order');

		done();
	});

	it('5. RECORDSET OF SELECT with multiple additional columns', function (done) {
		var data = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		var res = alasql('RECORDSET OF SELECT t.*, 1 as rn, 2 as seq FROM ? t', [data]);

		// Check that all columns are present
		assert.equal(res.columns.length, 4, 'Should have 4 columns');

		var columnIds = res.columns.map(function (col) {
			return col.columnid;
		});
		assert(columnIds.includes('a'), 'Should include column a');
		assert(columnIds.includes('b'), 'Should include column b');
		assert(columnIds.includes('rn'), 'Should include column rn');
		assert(columnIds.includes('seq'), 'Should include column seq');

		// Check data
		assert.deepEqual(res.data[0], {rn: 1, seq: 2, a: 1, b: 10});

		done();
	});
});
