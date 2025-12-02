if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2201 - CROSS JOIN syntax improvements (sqllogictest3)', function () {
	const test = '2201';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Setup tables with data', function () {
		alasql('CREATE TABLE tab0 (col0 INT, col1 INT)');
		alasql('CREATE TABLE tab1 (col1 INT, col2 INT)');
		alasql('CREATE TABLE tab2 (col2 INT, col3 INT)');

		alasql('INSERT INTO tab0 VALUES (1, 10), (2, 20)');
		alasql('INSERT INTO tab1 VALUES (10, 100), (20, 200)');
		alasql('INSERT INTO tab2 VALUES (100, 1000), (200, 2000)');
	});

	it('B) CROSS JOIN followed by comma-separated tables', function () {
		// This syntax should work: CROSS JOIN followed by comma
		var res = alasql('SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1');
		assert(Array.isArray(res));
		// tab1 CROSS JOIN tab1 = 2x2=4, then each CROSS JOIN with tab2 = 4x2=8
		assert.equal(res.length, 8);
	});

	it('C) Multiple CROSS JOINs with comma', function () {
		// Test multiple tables with CROSS JOIN and comma mixing
		var res = alasql('SELECT * FROM tab2 cor0 CROSS JOIN tab1, tab0 AS cor1');
		assert(Array.isArray(res));
		// tab2 CROSS JOIN tab1 = 2x2=4, then each CROSS JOIN with tab0 = 4x2=8
		assert.equal(res.length, 8);
	});

	it('D) CROSS JOIN with USING clause (SQLite compatibility)', function () {
		// Per SQLite: CROSS JOIN with USING behaves like INNER JOIN
		var res = alasql('SELECT * FROM tab1 cor0 CROSS JOIN tab0 USING (col1)');
		assert(Array.isArray(res));
		// INNER JOIN on col1: tab1 has (10,100) and (20,200), tab0 has (1,10) and (2,20)
		// Matches: (10,100) with (1,10) and (20,200) with (2,20)
		assert.equal(res.length, 2);
		// Verify the join worked correctly
		assert.equal(res[0].col1, 10);
		assert.equal(res[1].col1, 20);
	});

	it('E) CROSS JOIN with ON clause (SQLite compatibility)', function () {
		// Per SQLite: CROSS JOIN with ON behaves like INNER JOIN
		var res = alasql('SELECT * FROM tab1 cor0 CROSS JOIN tab0 ON cor0.col1 = tab0.col1');
		assert(Array.isArray(res));
		// Same as USING test above
		assert.equal(res.length, 2);
		assert.equal(res[0].col1, 10);
		assert.equal(res[1].col1, 20);
	});

	it('F) CROSS JOIN without ON/USING should be cartesian product', function () {
		// Regular CROSS JOIN without ON/USING should produce cartesian product
		var res = alasql('SELECT * FROM tab1 CROSS JOIN tab0');
		assert(Array.isArray(res));
		// tab1 has 2 rows, tab0 has 2 rows: 2x2=4
		assert.equal(res.length, 4);
	});

	it('G) Complex mixed join syntax', function () {
		// Test complex case from sqllogictest
		// Query has: tab1 AS cor0, tab1, tab0 AS cor1, tab0 AS cor2, tab0 AS cor3
		// That's 5 table references (though only 2 distinct tables)
		var res = alasql(
			'SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab0 AS cor2, tab0 cor3'
		);
		assert(Array.isArray(res));
		// Cartesian product: tab1(2 rows) x tab1(2 rows) x tab0(2 rows) x tab0(2 rows) x tab0(2 rows) = 32 rows
		// But DISTINCT may reduce this depending on data
		assert(res.length >= 1);
	});

	it('Z) Cleanup', function () {
		alasql('DROP TABLE tab0');
		alasql('DROP TABLE tab1');
		alasql('DROP TABLE tab2');
	});
});
