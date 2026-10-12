// Performance test for issue #118 - Lot of joined sources in SELECT
// This test replicates the performance issue with many table joins
//
// Based on the issue comments, queries like this from sqllogictest have
// exponential performance degradation:
// SELECT x15,x53,x55,x62,x43,x20,x8
// FROM t43,t62,t20,t8,t55,t15,t53
// WHERE b20=a8 AND a53=b62 AND b43=a20 AND a53=2 AND a62=b8 AND a55=b15 AND b55=a43
//
// With 10 rows per table:
// - 7 tables * 7 constraints: ~6 seconds
// - 8 tables * 8 constraints: ~65 seconds (1 minute)
// - 10 tables * 10 constraints: ~8705 seconds (2.4 hours)

console.log('=== Performance Test #118 - Multiple Joined Sources ===\n');

var alasql = require('../../..');

// Create database
alasql('CREATE DATABASE test118perf');
alasql('USE test118perf');

// Create tables similar to sqllogictest format
// Each table has columns a, b, x (representing a1, b1, x1 for table t1)
var numTables = 7; // Start with 7 tables to show ~6 second baseline
var rowsPerTable = 10;

console.log('Setting up ' + numTables + ' tables with ' + rowsPerTable + ' rows each...');
var startSetup = Date.now();

// Create tables t1, t2, t3, ..., tN
for (var t = 1; t <= numTables; t++) {
	alasql('CREATE TABLE t' + t + ' (a INT, b INT, x STRING)');

	// Insert rows: (row_number, some_other_value, 'table tN row M')
	for (var r = 1; r <= rowsPerTable; r++) {
		// Using pattern similar to sqllogictest:
		// a = row number (1-10)
		// b = some computed value (creates join conditions)
		var a = r;
		var b = ((r * 3) % rowsPerTable) + 1; // Creates a pattern for joins
		var x = 'table t' + t + ' row ' + r;
		alasql('INSERT INTO t' + t + ' VALUES (?, ?, ?)', [a, b, x]);
	}
}

var setupTime = Date.now() - startSetup;
console.log('Setup completed in ' + setupTime + 'ms\n');

// Display table sizes
console.log('Table sizes:');
for (var t = 1; t <= numTables; t++) {
	var count = alasql('SELECT COUNT(*) as cnt FROM t' + t)[0].cnt;
	console.log('  t' + t + ': ' + count + ' rows');
}
console.log('');

// Test 1: Simple 2-table join (baseline)
console.log('Test 1: 2-table join (baseline)');
var query2 = 'SELECT t1.x, t2.x FROM t1, t2 WHERE t1.b = t2.a';
var start = Date.now();
var result2 = alasql(query2);
var time2 = Date.now() - start;
console.log('  Time: ' + time2 + 'ms, Results: ' + result2.length + '\n');

// Test 2: 3-table join
console.log('Test 2: 3-table join');
var query3 = 'SELECT t1.x, t2.x, t3.x FROM t1, t2, t3 WHERE t1.b = t2.a AND t2.b = t3.a';
start = Date.now();
var result3 = alasql(query3);
var time3 = Date.now() - start;
console.log('  Time: ' + time3 + 'ms, Results: ' + result3.length + '\n');

// Test 3: 4-table join
console.log('Test 3: 4-table join');
var query4 =
	'SELECT t1.x, t2.x, t3.x, t4.x FROM t1, t2, t3, t4 WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a';
start = Date.now();
var result4 = alasql(query4);
var time4 = Date.now() - start;
console.log('  Time: ' + time4 + 'ms, Results: ' + result4.length + '\n');

// Test 4: 5-table join
console.log('Test 4: 5-table join');
var query5 =
	'SELECT t1.x, t2.x, t3.x, t4.x, t5.x FROM t1, t2, t3, t4, t5 WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a AND t4.b = t5.a';
start = Date.now();
var result5 = alasql(query5);
var time5 = Date.now() - start;
console.log('  Time: ' + time5 + 'ms, Results: ' + result5.length + '\n');

// Test 5: 6-table join (approaching problematic territory)
console.log('Test 5: 6-table join');
var query6 =
	'SELECT t1.x, t2.x, t3.x, t4.x, t5.x, t6.x FROM t1, t2, t3, t4, t5, t6 WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a AND t4.b = t5.a AND t5.b = t6.a';
start = Date.now();
var result6 = alasql(query6);
var time6 = Date.now() - start;
console.log('  Time: ' + time6 + 'ms, Results: ' + result6.length + '\n');

// Test 6: 7-table join (this is where 6 seconds was observed)
console.log('Test 6: 7-table join (from issue: ~6 seconds expected)');
var query7 =
	'SELECT t1.x, t2.x, t3.x, t4.x, t5.x, t6.x, t7.x FROM t1, t2, t3, t4, t5, t6, t7 WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a AND t4.b = t5.a AND t5.b = t6.a AND t6.b = t7.a';
start = Date.now();
var result7 = alasql(query7);
var time7 = Date.now() - start;
console.log('  Time: ' + time7 + 'ms, Results: ' + result7.length + '\n');

// Summary
console.log('=== Summary ===');
console.log('Number of tables | Time (ms) | Growth factor');
console.log('----------------|-----------|---------------');
console.log('       2        |    ' + time2.toString().padStart(5) + '    | baseline');
console.log(
	'       3        |    ' +
		time3.toString().padStart(5) +
		'    | ' +
		(time3 / time2).toFixed(1) +
		'x'
);
console.log(
	'       4        |    ' +
		time4.toString().padStart(5) +
		'    | ' +
		(time4 / time3).toFixed(1) +
		'x'
);
console.log(
	'       5        |    ' +
		time5.toString().padStart(5) +
		'    | ' +
		(time5 / time4).toFixed(1) +
		'x'
);
console.log(
	'       6        |    ' +
		time6.toString().padStart(5) +
		'    | ' +
		(time6 / time5).toFixed(1) +
		'x'
);
console.log(
	'       7        |    ' +
		time7.toString().padStart(5) +
		'    | ' +
		(time7 / time6).toFixed(1) +
		'x'
);
console.log('');

// Analyze performance characteristics
var growthRate = Math.pow(time7 / time2, 1 / 5); // Geometric mean of growth
console.log('Average growth factor per additional table: ' + growthRate.toFixed(2) + 'x');

if (growthRate > 5) {
	console.log('\n⚠ WARNING: Exponential growth detected!');
	console.log('  This is the core issue #118 - performance degrades exponentially');
	console.log('  with the number of joined tables.');
} else if (growthRate > 2) {
	console.log('\n⚠ Note: Significant performance degradation observed');
} else {
	console.log('\n✓ Performance looks acceptable');
}

// Cleanup
alasql('DROP DATABASE test118perf');

console.log('\n=== Test complete ===');
