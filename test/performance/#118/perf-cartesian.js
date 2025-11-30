// Performance test for issue #118 - Detailed cartesian product analysis
// This test replicates the exact scenario from sqllogictest comments
//
// The issue shows that:
// - 7 tables × 7 constraints: 6 seconds
// - 8 tables × 8 constraints: 65 seconds (1 minute)
// - 10 tables × 10 constraints: 8705 seconds (2.4 hours)
//
// This is because without proper join optimization, AlaSQL creates
// a cartesian product of all tables (10^7 = 10 million rows for 7 tables)
// before filtering with WHERE clause

console.log('=== Performance Test #118 - Cartesian Product Analysis ===\n');

var alasql = require('../../..');

// Create database
alasql('CREATE DATABASE test118cartesian');
alasql('USE test118cartesian');

// Configuration
var rowsPerTable = 10;

// Create tables that match the sqllogictest format
// Tables have a, b columns for join conditions
// x column holds identifying info

function setupTables(numTables) {
	for (var t = 1; t <= numTables; t++) {
		alasql('CREATE TABLE IF NOT EXISTS t' + t + ' (a INT, b INT, x STRING)');
		alasql('DELETE FROM t' + t); // Clear if exists

		for (var r = 1; r <= rowsPerTable; r++) {
			var a = r;
			var b = ((r * 3) % rowsPerTable) + 1;
			var x = 'row' + r;
			alasql('INSERT INTO t' + t + ' VALUES (?, ?, ?)', [a, b, x]);
		}
	}
}

// Generate a query with N tables and chain joins
function generateQuery(numTables) {
	var tables = [];
	var columns = [];
	var conditions = [];

	for (var t = 1; t <= numTables; t++) {
		tables.push('t' + t);
		columns.push('t' + t + '.x as x' + t);
		if (t > 1) {
			// Chain join: t1.b = t2.a, t2.b = t3.a, etc.
			conditions.push('t' + (t - 1) + '.b = t' + t + '.a');
		}
	}

	var query = 'SELECT ' + columns.join(', ') + ' FROM ' + tables.join(', ');
	if (conditions.length > 0) {
		query += ' WHERE ' + conditions.join(' AND ');
	}

	return query;
}

// Calculate theoretical cartesian product size
function cartesianSize(numTables, rowsPerTable) {
	return Math.pow(rowsPerTable, numTables);
}

console.log('Configuration: ' + rowsPerTable + ' rows per table\n');
console.log('Running tests from 2 to 7 tables...\n');

var results = [];

for (var n = 2; n <= 7; n++) {
	console.log('Testing ' + n + '-table join...');

	setupTables(n);
	var query = generateQuery(n);

	// Show the query for reference
	if (n <= 4) {
		console.log('  Query: ' + query);
	}

	var start = Date.now();
	var result = alasql(query);
	var time = Date.now() - start;

	var cartesian = cartesianSize(n, rowsPerTable);

	console.log('  Cartesian space: ' + cartesian.toLocaleString() + ' combinations');
	console.log('  Results: ' + result.length + ' rows');
	console.log('  Time: ' + time + 'ms');
	console.log('');

	results.push({
		tables: n,
		cartesian: cartesian,
		results: result.length,
		time: time,
	});
}

// Summary analysis
console.log('=== Analysis ===\n');
console.log('Tables | Cartesian Space | Results | Time (ms) | ms per 1000 combinations');
console.log('-------|-----------------|---------|-----------|-------------------------');

for (var i = 0; i < results.length; i++) {
	var r = results[i];
	var msPerThousand = ((r.time / r.cartesian) * 1000).toFixed(4);
	console.log(
		'   ' +
			r.tables +
			'   |   ' +
			r.cartesian.toLocaleString().padStart(12) +
			'  |   ' +
			r.results.toString().padStart(5) +
			' |   ' +
			r.time.toString().padStart(6) +
			'  |   ' +
			msPerThousand
	);
}

console.log('\n');
console.log('The key insight is that without optimization, AlaSQL must iterate');
console.log('through the entire cartesian product before applying WHERE filters.');
console.log('\n');

// Calculate exponential growth
if (results.length >= 2) {
	var first = results[0];
	var last = results[results.length - 1];
	var steps = last.tables - first.tables;
	var timeGrowth = Math.pow(last.time / first.time, 1 / steps);
	var cartesianGrowth = Math.pow(last.cartesian / first.cartesian, 1 / steps);

	console.log('Exponential growth analysis:');
	console.log('  Time growth per table: ' + timeGrowth.toFixed(2) + 'x');
	console.log(
		'  Cartesian growth per table: ' +
			cartesianGrowth.toFixed(2) +
			'x (theoretical: ' +
			rowsPerTable +
			'x)'
	);
	console.log('');

	// Extrapolate to larger numbers
	console.log('Extrapolated times (based on observed growth):');
	var baseTime = results[results.length - 1].time;
	var baseTables = results[results.length - 1].tables;

	for (var extraTables = 8; extraTables <= 10; extraTables++) {
		var extraTime = baseTime * Math.pow(timeGrowth, extraTables - baseTables);
		var extraTimeFormatted;
		if (extraTime > 3600000) {
			extraTimeFormatted = (extraTime / 3600000).toFixed(1) + ' hours';
		} else if (extraTime > 60000) {
			extraTimeFormatted = (extraTime / 60000).toFixed(1) + ' minutes';
		} else if (extraTime > 1000) {
			extraTimeFormatted = (extraTime / 1000).toFixed(1) + ' seconds';
		} else {
			extraTimeFormatted = extraTime.toFixed(0) + ' ms';
		}
		console.log('  ' + extraTables + ' tables: ~' + extraTimeFormatted);
	}
}

// Cleanup
alasql('DROP DATABASE test118cartesian');

console.log('\n=== Test complete ===');
