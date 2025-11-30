// Performance comparison: Implicit vs Explicit JOINs
// This test compares performance between:
// 1. FROM t1, t2, t3 WHERE t1.b = t2.a AND t2.b = t3.a (implicit, problematic)
// 2. FROM t1 JOIN t2 ON t1.b = t2.a JOIN t3 ON t2.b = t3.a (explicit, should be faster)

console.log('=== Performance Test #118 - Implicit vs Explicit JOINs ===\n');

var alasql = require('../../..');

// Create database
alasql('CREATE DATABASE test118compare');
alasql('USE test118compare');

var numTables = 6;
var rowsPerTable = 10;

console.log('Setting up ' + numTables + ' tables with ' + rowsPerTable + ' rows each...\n');

// Create tables
for (var t = 1; t <= numTables; t++) {
	alasql('CREATE TABLE t' + t + ' (a INT, b INT, x STRING)');

	for (var r = 1; r <= rowsPerTable; r++) {
		var a = r;
		var b = ((r * 3) % rowsPerTable) + 1;
		var x = 'row' + r;
		alasql('INSERT INTO t' + t + ' VALUES (?, ?, ?)', [a, b, x]);
	}
}

// Test 1: Implicit JOIN (comma syntax) - the problematic pattern
console.log('Test 1: IMPLICIT JOIN (comma syntax)');
var implicitQuery = `
	SELECT t1.x, t2.x, t3.x, t4.x, t5.x, t6.x
	FROM t1, t2, t3, t4, t5, t6
	WHERE t1.b = t2.a AND t2.b = t3.a AND t3.b = t4.a AND t4.b = t5.a AND t5.b = t6.a
`;
console.log('Query: ' + implicitQuery.replace(/\n\s*/g, ' ').trim());

var startImplicit = Date.now();
var resultImplicit = alasql(implicitQuery);
var timeImplicit = Date.now() - startImplicit;
console.log('Time: ' + timeImplicit + 'ms, Results: ' + resultImplicit.length);
console.log('');

// Test 2: Explicit JOIN syntax - should be the same as implicit in current implementation
console.log('Test 2: EXPLICIT JOIN (ON syntax)');
var explicitQuery = `
	SELECT t1.x, t2.x, t3.x, t4.x, t5.x, t6.x
	FROM t1
	INNER JOIN t2 ON t1.b = t2.a
	INNER JOIN t3 ON t2.b = t3.a
	INNER JOIN t4 ON t3.b = t4.a
	INNER JOIN t5 ON t4.b = t5.a
	INNER JOIN t6 ON t5.b = t6.a
`;
console.log('Query: ' + explicitQuery.replace(/\n\s*/g, ' ').trim());

var startExplicit = Date.now();
var resultExplicit = alasql(explicitQuery);
var timeExplicit = Date.now() - startExplicit;
console.log('Time: ' + timeExplicit + 'ms, Results: ' + resultExplicit.length);
console.log('');

// Test 3: Using USING syntax
console.log('Test 3: EXPLICIT JOIN with USING (requires matching column names)');
// For this test, we need tables with matching column names
// Create new tables with matching column names for join
alasql('CREATE TABLE u1 (id INT, next_id INT, val STRING)');
alasql('CREATE TABLE u2 (id INT, next_id INT, val STRING)');
alasql('CREATE TABLE u3 (id INT, next_id INT, val STRING)');
alasql('CREATE TABLE u4 (id INT, next_id INT, val STRING)');

for (var r = 1; r <= rowsPerTable; r++) {
	var id = r;
	var next_id = ((r * 3) % rowsPerTable) + 1;
	alasql('INSERT INTO u1 VALUES (?, ?, ?)', [id, next_id, 'u1-' + r]);
	alasql('INSERT INTO u2 VALUES (?, ?, ?)', [next_id, id, 'u2-' + r]); // swapped for join
	alasql('INSERT INTO u3 VALUES (?, ?, ?)', [id, next_id, 'u3-' + r]);
	alasql('INSERT INTO u4 VALUES (?, ?, ?)', [next_id, id, 'u4-' + r]);
}

var usingQuery = `
	SELECT u1.val, u2.val, u3.val, u4.val
	FROM u1
	INNER JOIN u2 ON u1.next_id = u2.id
	INNER JOIN u3 ON u2.next_id = u3.id
	INNER JOIN u4 ON u3.next_id = u4.id
`;
console.log('Query: ' + usingQuery.replace(/\n\s*/g, ' ').trim());

var startUsing = Date.now();
var resultUsing = alasql(usingQuery);
var timeUsing = Date.now() - startUsing;
console.log('Time: ' + timeUsing + 'ms, Results: ' + resultUsing.length);
console.log('');

// Summary
console.log('=== Summary ===');
console.log('Query Type       | Time (ms) | Results');
console.log('-----------------|-----------|--------');
console.log(
	'Implicit (comma) |    ' + timeImplicit.toString().padStart(5) + '  |   ' + resultImplicit.length
);
console.log(
	'Explicit (ON)    |    ' + timeExplicit.toString().padStart(5) + '  |   ' + resultExplicit.length
);
console.log(
	'Using ON         |    ' + timeUsing.toString().padStart(5) + '  |   ' + resultUsing.length
);
console.log('');

// Check if results are equivalent
var implicit = JSON.stringify(
	resultImplicit.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
);
var explicit = JSON.stringify(
	resultExplicit.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
);
if (implicit === explicit) {
	console.log('✓ Implicit and Explicit queries return equivalent results');
} else {
	console.log('✗ Results differ between Implicit and Explicit queries');
}

var ratio = timeImplicit / timeExplicit;
if (Math.abs(ratio - 1) < 0.5) {
	console.log('\n⚠ Implicit and Explicit joins have similar performance');
	console.log('  This suggests the optimization is not being applied to explicit joins either,');
	console.log('  or both are using the same code path.');
} else if (ratio > 1) {
	console.log('\n✓ Explicit joins are ' + ratio.toFixed(1) + 'x faster than implicit joins');
} else {
	console.log(
		'\n! Implicit joins are ' + (1 / ratio).toFixed(1) + 'x faster than explicit joins (unexpected)'
	);
}

// Cleanup
alasql('DROP DATABASE test118compare');

console.log('\n=== Test complete ===');
