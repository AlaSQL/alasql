if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('./dist/alasql.fs.js');
}

// Reproduce the issue
console.log('Testing UNION ALL with ORDER BY and LIMIT...\n');

alasql('CREATE DATABASE testrepro');
alasql('USE testrepro');

// Create test data similar to the issue
alasql('CREATE TABLE temptable (subcategoryname STRING, totalamount FLOAT)');
alasql(`INSERT INTO temptable VALUES 
	('Bikes', 1000.5),
	('Components', 2000.75),
	('Clothing', 1500.25),
	('Accessories', 800.10),
	('Socks', 9556.37),
	('Helmets', 3000.00),
	('Gloves', 1200.50)`
);

console.log('Table contents:');
var data = alasql('SELECT * FROM temptable');
console.log(data);

console.log('\n--- Testing individual queries ---');

// Test first query (top 3)
var query1 = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales DESC
LIMIT 3
`;
console.log('\nQuery 1 (Top 3):');
console.log(query1);
var result1 = alasql(query1);
console.log('Result:', result1);

// Test second query (bottom 3)
var query2 = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3
`;
console.log('\nQuery 2 (Bottom 3):');
console.log(query2);
var result2 = alasql(query2);
console.log('Result:', result2);

// Test UNION ALL with parentheses
var queryUnionParen = `
(SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales DESC
LIMIT 3)

UNION ALL

(SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3)
`;
console.log('\n--- Testing UNION ALL with parentheses ---');
console.log(queryUnionParen);
var resultUnionParen = alasql(queryUnionParen);
console.log('Result:', resultUnionParen);
console.log('Result length:', resultUnionParen.length);

// Test UNION ALL
var queryUnion = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales DESC
LIMIT 3

UNION ALL

SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3
`;
console.log('\n--- Testing UNION ALL without parentheses ---');
console.log(queryUnion);
try {
	var resultUnion = alasql(queryUnion);
	console.log('Result:', resultUnion);
	console.log('Result length:', resultUnion.length);
} catch (e) {
	console.log('ERROR:', e.message);
}

// Expected: 6 rows total (3 from each query)
// What we get according to the issue: only 3 rows with nulls

console.log('\n--- Expected vs Actual ---');
console.log('Expected: 6 rows (3 top + 3 bottom)');
console.log('Actual:', resultUnion.length, 'rows');

alasql('DROP DATABASE testrepro');
