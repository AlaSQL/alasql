// Quick test to verify LIKE behavior in AlaSQL
const alasql = require('./dist/alasql.js');

console.log("Testing LIKE pattern case sensitivity in AlaSQL:\n");

// Test 1: Case sensitivity with lowercase pattern
const data1 = [
    { name: 'Apple' },
    { name: 'apple' },
    { name: 'APPLE' },
    { name: 'Banana' }
];

console.log("Test 1: LIKE 'app%' pattern");
const result1 = alasql('SELECT * FROM ? WHERE name LIKE ?', [data1, 'app%']);
console.log("Matches:", result1);
console.log("Expected in case-sensitive SQL: only { name: 'apple' }");
console.log("Current behavior: Matches all case variations");
console.log("");

// Test 2: Case sensitivity with uppercase pattern
console.log("Test 2: LIKE 'APP%' pattern");
const result2 = alasql('SELECT * FROM ? WHERE name LIKE ?', [data1, 'APP%']);
console.log("Matches:", result2);
console.log("Expected in case-sensitive SQL: only { name: 'APPLE' }");
console.log("Current behavior: Matches all case variations");
console.log("");

// Test 3: Comparison with standard SQL databases
console.log("Standard SQL behavior (MySQL, PostgreSQL, SQL Server, Oracle):");
console.log("- LIKE is case-SENSITIVE by default in most implementations");
console.log("- MySQL: case-insensitive if using case-insensitive collation");
console.log("- PostgreSQL: LIKE is case-sensitive, ILIKE is case-insensitive");
console.log("- SQL Server: depends on collation, typically case-insensitive");
console.log("- Oracle: LIKE is case-sensitive");
console.log("- SQLite: LIKE is case-INsensitive for ASCII, case-sensitive for non-ASCII");
console.log("");

console.log("AlaSQL current behavior:");
console.log("- LIKE is case-INsensitive (always uses /i flag)");
console.log("");

// Test if there are operators that should be case-sensitive
console.log("Test 3: Testing ILIKE (if available)");
try {
    const result3 = alasql('SELECT * FROM ? WHERE name ILIKE ?', [data1, 'app%']);
    console.log("ILIKE result:", result3);
} catch (e) {
    console.log("ILIKE:", e.message);
}
